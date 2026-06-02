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

const changePassword = async (userId, newPassword, accessToken) => {
	// Call Supabase with the user's access token to update their password
	const supabase = getSupabaseClient();
	
	const { data, error } = await supabase.auth.updateUser({
		password: newPassword
	});

	if (error) {
		throw new AppError(ERROR_CODES.INVALID_INPUT, error.message, 400);
	}

	return {
		success: true,
	};
};

module.exports = {
	register,
	login,
	changePassword,
};
