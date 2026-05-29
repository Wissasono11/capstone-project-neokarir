const ProfileRepository = require('../repositories/profile.repository');
const AiService = require('./ai.service');

const getByUserId = async (userId, accessToken) => {
	return ProfileRepository.getByUserId(userId, accessToken);
};

const { getSupabaseClient, getAdminSupabaseClient } = require('../config/database');

const upsertByUserId = async (userId, payload, accessToken) => {
	const supabaseAdmin = getAdminSupabaseClient();
	
	const authUpdatePayload = {};
	if (payload.full_name) {
		authUpdatePayload.user_metadata = { full_name: payload.full_name, name: payload.full_name };
	}
	// Note: Updating email in Supabase typically triggers a confirmation email
	if (payload.email) {
		authUpdatePayload.email = payload.email;
	}
	
	if (Object.keys(authUpdatePayload).length > 0 && supabaseAdmin) {
		const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(userId, authUpdatePayload);
		if (authError) {
			console.warn('Failed to update Supabase Auth user:', authError.message);
		}
	}

	const savedProfile = await ProfileRepository.upsertByUserId(userId, payload, accessToken);

	// Auto-trigger skill gap analysis in background (non-blocking)
	if (savedProfile && savedProfile.target_role) {
		const SkillgapService = require('./skillgap.service');
		Promise.resolve()
			.then(() => SkillgapService.analyze(userId, null, accessToken))
			.catch((err) => console.error('Background auto-trigger skill gap analysis failed:', err));
	}

	return savedProfile;
};

const getProfileScore = async (userId, accessToken) => {
	const profile = await ProfileRepository.getByUserId(userId, accessToken);
	if (!profile) {
		const err = new Error('User profile not found. Please onboarding first.');
		err.statusCode = 404;
		throw err;
	}

	const owned_skills = profile.profile_data?.owned_skills || 
		(profile.skills_summary ? profile.skills_summary.split(',').map(s => s.trim()).filter(Boolean) : []);

	const payload = {
		target_domain: profile.target_domain || '',
		target_role: profile.target_role || '',
		owned_skills,
	};

	return AiService.getProfileScore(payload);
};

module.exports = {
	getByUserId,
	upsertByUserId,
	getProfileScore,
};
