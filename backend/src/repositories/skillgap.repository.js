const { getSupabaseClient } = require('../config/database');
const { AppError } = require('../middlewares/error.middleware');
const { ERROR_CODES } = require('../constants/error');

const TABLE = 'skill_gap';

const getByUserId = async (userId, accessToken, jobId = null) => {
	const supabase = getSupabaseClient(accessToken);
	let query = supabase.from(TABLE).select('*').eq('user_id', userId);
	
	if (jobId) {
		query = query.eq('job_id', jobId);
	}

	const { data, error } = await query.order('updated_at', { ascending: false }).limit(1).maybeSingle();

	if (error) {
		throw new AppError(ERROR_CODES.DATABASE_ERROR, error.message, 500, error);
	}
	return data;
};

const upsertByUserId = async (userId, payload, accessToken, jobId = null) => {
	const supabase = getSupabaseClient(accessToken);
	
	const record = {
		user_id: userId,
		job_id: jobId,
		target_role: payload.target_role,
		target_domain: payload.target_domain,
		owned_skills: payload.owned_skills || [],
		matched_skills: payload.matched_skills || [],
		missing_skills: payload.missing_skills || [],
		match_score: payload.match_score || 0,
		analysis_result: payload.analysis_result || {},
		updated_at: new Date().toISOString()
	};

	// Check if existing record exists to update it, to avoid unique constraint issues
	const existing = await getByUserId(userId, accessToken, jobId);

	let result;
	if (existing) {
		const { data, error } = await supabase
			.from(TABLE)
			.update(record)
			.eq('id', existing.id)
			.select('*')
			.maybeSingle();

		if (error) {
			throw new AppError(ERROR_CODES.DATABASE_ERROR, error.message, 500, error);
		}
		result = data;
	} else {
		const { data, error } = await supabase
			.from(TABLE)
			.insert({ ...record, created_at: new Date().toISOString() })
			.select('*')
			.maybeSingle();

		if (error) {
			throw new AppError(ERROR_CODES.DATABASE_ERROR, error.message, 500, error);
		}
		result = data;
	}

	return result;
};

module.exports = {
	TABLE,
	getByUserId,
	upsertByUserId,
};
