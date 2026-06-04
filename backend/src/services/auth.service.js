const { getSupabaseClient, getAdminSupabaseClient } = require('../config/database');
const { AppError } = require('../middlewares/error.middleware');
const { ERROR_CODES } = require('../constants/error');
const ProfileRepository = require('../repositories/profile.repository');

const bcrypt = require('bcryptjs');

const persistRegistrationProfile = async (userId, email, profile) => {
	const adminSupabase = getAdminSupabaseClient();
	const profilePayload = {
		full_name: profile?.full_name || profile?.name || null,
		email,
		profile_data: {
			...(profile || {}),
			email,
			registered_via: 'auth.register',
		},
	};

	if (adminSupabase) {
		const { error } = await adminSupabase.from('profiles').upsert({
			user_id: userId,
			...profilePayload,
		}, { onConflict: 'user_id' });
		if (error) {
			throw new AppError(ERROR_CODES.DATABASE_ERROR, error.message, 500, error);
		}
		return;
	}

	await ProfileRepository.upsertByUserId(userId, profilePayload);
};

const register = async ({ email, password, profile }) => {
	const supabase = getSupabaseClient();
	
	// Hash password before saving
	const salt = await bcrypt.genSalt(10);
	const password_hash = await bcrypt.hash(password, salt);
	
	// Pass the password_hash in the user metadata so the trigger can insert it
	const metadata = profile ? { ...profile, password_hash } : { password_hash };
	const adminSupabase = getAdminSupabaseClient();
	if (adminSupabase?.auth?.admin?.createUser) {
		const { data: createdUser, error: createError } = await adminSupabase.auth.admin.createUser({
			email,
			password,
			email_confirm: true,
			user_metadata: metadata,
		});

		if (!createError && createdUser?.user) {
			const loginResult = await supabase.auth.signInWithPassword({ email, password });
			if (!loginResult.error) {
				return {
					user: loginResult.data.user,
					session: loginResult.data.session,
				};
			}
		}

		if (createError) {
			const message = createError.message || '';
			if (message.toLowerCase().includes('already registered') || createError.code === 'email_exists') {
				throw new AppError(ERROR_CODES.DUPLICATE_ENTRY, 'User already registered', 409);
			}
			// Fall back to the standard sign-up flow when admin access is unavailable.
		}
	}

	let { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: { data: metadata },
	});

	if (error) {
		const message = error.message || '';
		if (message.toLowerCase().includes('already registered') || error.code === 'email_exists') {
			const loginResult = await supabase.auth.signInWithPassword({ email, password });
			if (loginResult.error) {
				throw new AppError(ERROR_CODES.DUPLICATE_ENTRY, 'User already registered', 409);
			}

			await persistRegistrationProfile(loginResult.data.user.id, email, profile);

			return {
				user: loginResult.data.user,
				session: loginResult.data.session,
			};
		}
		throw new AppError(ERROR_CODES.INVALID_INPUT, message, 400);
	}

	let session = data.session;
	let user = data.user;

	if ((!session || !session.access_token) && user) {
		const loginResult = await supabase.auth.signInWithPassword({ email, password });
		if (!loginResult.error) {
			session = loginResult.data.session;
			user = loginResult.data.user;
		}
	}

	if (user) {
		// Registration only needs to create the auth user here.
		// Profile persistence happens later in onboarding when a valid session exists.
	}

	return {
		user,
		session,
	};
};

const login = async ({ email, password }) => {
	const supabase = getSupabaseClient();
	const { data, error } = await supabase.auth.signInWithPassword({ email, password });

	if (error) {
		throw new AppError(ERROR_CODES.AUTH_UNAUTHORIZED, error.message, 401);
	}

	return {
		user: data.user,
		session: data.session,
	};
};

const changePassword = async (userId, email, currentPassword, newPassword, _accessToken) => {
	const { createClient } = require('@supabase/supabase-js');
	const env = require('../config/env');
	
	// Create a fresh client instance so we don't pollute the global singleton
	const tempClient = createClient(env.SUPABASE_URL, env.SUPABASE_KEY, {
		auth: {
			persistSession: false,
			autoRefreshToken: false,
		}
	});

	// Verify current password first, this also populates tempClient with an active session
	const { error: signInError } = await tempClient.auth.signInWithPassword({
		email,
		password: currentPassword
	});

	if (signInError) {
		throw new AppError(ERROR_CODES.INVALID_INPUT, 'Password saat ini salah', 400);
	}

	// Update password using the user's own authenticated client session
	const { error: updateError } = await tempClient.auth.updateUser({
		password: newPassword
	});

	if (updateError) {
		throw new AppError(ERROR_CODES.INVALID_INPUT, updateError.message, 400);
	}

	return {
		success: true,
	};
};

const forgotPassword = async (email) => {
	const supabase = getSupabaseClient();
	const adminSupabase = getAdminSupabaseClient();
	const env = require('../config/env');
	const redirectBase = (env.FRONTEND_URL || env.CORS_ORIGIN || 'http://localhost:3001').replace(/\/$/, '');
	const redirectTo = `${redirectBase}/reset-password`;

	let resetLink = '';
	if (adminSupabase) {
		try {
			const { data, error: linkError } = await adminSupabase.auth.admin.generateLink({
				type: 'recovery',
				email,
				options: { redirectTo }
			});
			if (linkError) {
				console.error('Supabase generateLink error:', linkError);
			} else if (data?.properties?.action_link) {
				resetLink = data.properties.action_link;
			}
		} catch (err) {
			console.error('Failed to generate reset link via Admin API:', err);
		}
	}

	// If SMTP is configured and we successfully generated a reset link
	if (resetLink && env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS) {
		const nodemailer = require('nodemailer');
		const transporter = nodemailer.createTransport({
			host: env.SMTP_HOST,
			port: parseInt(env.SMTP_PORT) || 587,
			secure: parseInt(env.SMTP_PORT) === 465,
			auth: {
				user: env.SMTP_USER,
				pass: env.SMTP_PASS,
			},
			family: 4, // Force IPv4 to prevent ENETUNREACH on IPv6-disabled networks (like Railway)
			connectionTimeout: 5000, // 5 seconds
			greetingTimeout: 5000,    // 5 seconds
			socketTimeout: 5000,      // 5 seconds
		});

		// Verify connection
		try {
			await transporter.verify();
			
			const mailOptions = {
				from: `"NeoKarir Security" <${env.SMTP_USER}>`,
				to: email,
				subject: 'Atur Ulang Kata Sandi Akun NeoKarir Anda',
				html: `
					<div style="font-family: 'Plus Jakarta Sans', sans-serif, Arial; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #334155;">
						<div style="text-align: center; margin-bottom: 24px;">
							<h1 style="color: #4f46e5; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.025em;">NeoKarir</h1>
							<p style="color: #64748b; font-size: 14px; margin: 4px 0 0 0;">AI-Powered Career Assistant</p>
						</div>
						
						<h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 12px;">Permintaan Atur Ulang Kata Sandi</h2>
						
						<p style="font-size: 15px; line-height: 1.6; color: #475569; margin-bottom: 20px;">
							Halo, Kami menerima permintaan untuk mengatur ulang kata sandi akun NeoKarir Anda. Klik tombol di bawah ini untuk melanjutkan pembuatan kata sandi baru Anda:
						</p>
						
						<div style="text-align: center; margin: 32px 0;">
							<a href="${resetLink}" style="display: inline-block; padding: 12px 30px; font-size: 15px; font-weight: 700; color: #ffffff; background-color: #4f46e5; text-decoration: none; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.1), 0 2px 4px -1px rgba(79, 70, 229, 0.06); transition: background-color 0.2s;">
								Atur Ulang Kata Sandi
							</a>
						</div>
						
						<p style="font-size: 14px; line-height: 1.6; color: #64748b; margin-bottom: 24px;">
							Tautan ini hanya berlaku selama 1 jam. Jika Anda tidak merasa melakukan permintaan ini, silakan abaikan email ini dengan aman dan kata sandi Anda tidak akan berubah.
						</p>
						
						<hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 24px 0;" />
						
						<p style="font-size: 12px; line-height: 1.5; color: #94a3b8; margin-bottom: 0;">
							Jika tombol di atas tidak berfungsi, silakan salin dan tempel URL berikut ke browser Anda:<br />
							<a href="${resetLink}" style="color: #4f46e5; word-break: break-all; text-decoration: underline;">${resetLink}</a>
						</p>
						
						<p style="font-size: 13px; font-weight: 600; color: #475569; margin-top: 24px; margin-bottom: 0;">
							Salam hangat,<br />
							<span style="color: #4f46e5;">Tim Keamanan NeoKarir</span>
						</p>
					</div>
				`,
			};

			await transporter.sendMail(mailOptions);
			return {
				success: true,
			};
		} catch (smtpErr) {
			console.error('SMTP Custom Email failed, falling back to default Supabase template:', smtpErr);
		}
	}

	// Fallback to default Supabase Email template
	console.log('Sending reset password link using standard Supabase email template fallback.');
	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo,
	});

	if (error) {
		throw new AppError(ERROR_CODES.INVALID_INPUT, error.message, 400);
	}

	return {
		success: true,
	};
};

const deleteAccount = async (userId, email, password) => {
	const { createClient } = require('@supabase/supabase-js');
	const env = require('../config/env');
	const { getPrismaClient } = require('../config/prisma');
	
	const tempClient = createClient(env.SUPABASE_URL, env.SUPABASE_KEY, {
		auth: {
			persistSession: false,
			autoRefreshToken: false,
		}
	});

	// Verify password first
	const { error: signInError } = await tempClient.auth.signInWithPassword({
		email,
		password
	});

	if (signInError) {
		throw new AppError(ERROR_CODES.INVALID_INPUT, 'Kata sandi salah', 400);
	}

	const adminSupabase = getAdminSupabaseClient();
	if (!adminSupabase) {
		throw new AppError(ERROR_CODES.SERVER_ERROR || 'SERVER_ERROR', 'Tidak dapat menghapus akun: Admin client tidak dikonfigurasi.', 500);
	}
	
	const prisma = getPrismaClient();

	// Delete from Prisma first to satisfy foreign key constraints (cascades to profiles, etc.)
	try {
		await prisma.user.delete({ where: { id: userId } });
	} catch (dbErr) {
		// If user doesn't exist in Prisma or another error occurs, log it and proceed to delete from Supabase
		console.warn(`Prisma user deletion failed for ${userId}:`, dbErr.message);
	}

	// Delete from Supabase Auth
	const { error } = await adminSupabase.auth.admin.deleteUser(userId);
	if (error) {
		throw new AppError(ERROR_CODES.DATABASE_ERROR, error.message, 500);
	}

	return { success: true };
};

module.exports = {
	register,
	login,
	forgotPassword,
	changePassword,
	deleteAccount,
};
