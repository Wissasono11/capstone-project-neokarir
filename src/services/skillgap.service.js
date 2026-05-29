const ProfileRepository = require('../repositories/profile.repository');
const SkillgapRepository = require('../repositories/skillgap.repository');
const RecommendationRepository = require('../repositories/recommendation.repository');
const RecommendationService = require('./recommendation.service');
const { callAI2 } = require('../utils/aiClient');

const getByUserId = async (userId, accessToken) => {
	return SkillgapRepository.getByUserId(userId, accessToken);
};

const analyze = async (userId, payload, accessToken) => {
	let { target_domain, target_role, owned_skills } = payload || {};
	
	const profile = await ProfileRepository.getByUserId(userId, accessToken);
	if (!profile) {
		const err = new Error('User profile not found. Please onboarding first.');
		err.statusCode = 404;
		throw err;
	}
	
	target_domain = target_domain || profile.target_domain || 'Teknologi Informasi';
	target_role = target_role || profile.target_role || 'Software Engineer';
	
	if (!owned_skills) {
		if (profile.profile_data && Array.isArray(profile.profile_data.owned_skills)) {
			owned_skills = profile.profile_data.owned_skills;
		} else if (profile.skills_summary) {
			owned_skills = profile.skills_summary.split(',').map(s => s.trim()).filter(Boolean);
		} else {
			owned_skills = [];
		}
	}
	
	// 1. Call AI-2 to get radar data & recommended actions
	let aiResult;
	try {
		aiResult = await callAI2('/api/profile/skill-gap', {
			target_domain,
			target_role,
			owned_skills,
		});
	} catch (error) {
		console.error('Error calling AI-2 skill-gap API:', error);
		aiResult = {
			status: 'error',
			message: error.message
		};
	}

	if (aiResult.status !== 'success' || !aiResult.data) {
		// Fallback/mock radar data based on taxonomy if AI-2 is down or fails
		aiResult = {
			status: 'success',
			data: {
				radar_chart_data: [
					{ category: 'Programming', current: 75, required: 90, gap: -15 },
					{ category: 'Database', current: 80, required: 85, gap: -5 },
					{ category: 'DevOps', current: 50, required: 70, gap: -20 }
				],
				recommended_actions: {
					critical_gap: 'Focus on Programming & DevOps skills.',
					needs_improvement: 'Enhance Database expertise.',
					strengths: 'Your core skills are solid.'
				}
			}
		};
	}
	
	// 2. Match with recommendations to get matched_skills, missing_skills, match_score, job_id
	let recommendations = await RecommendationRepository.listByUserId(userId, accessToken);
	if (!recommendations || recommendations.length === 0) {
		try {
			recommendations = await RecommendationService.generate(userId, accessToken);
		} catch (err) {
			console.error('Failed to generate recommendations during skill gap analysis:', err);
			recommendations = [];
		}
	}

	const targetJob = recommendations.find(
		rec => rec.title.toLowerCase() === target_role.toLowerCase()
	) || recommendations.find(
		rec => rec.title.toLowerCase().includes(target_role.toLowerCase())
	) || recommendations[0];

	const matched_skills = targetJob ? targetJob.matched_skills : [];
	const missing_skills = targetJob ? targetJob.missing_skills : [];
	const match_score = targetJob ? targetJob.score : 0;
	const job_id = targetJob ? targetJob.job_id : null;

	// 3. Upsert into DB
	const upsertPayload = {
		target_role,
		target_domain,
		owned_skills,
		matched_skills,
		missing_skills,
		match_score,
		analysis_result: aiResult.data,
	};

	const savedRecord = await SkillgapRepository.upsertByUserId(userId, upsertPayload, accessToken, job_id);

	return savedRecord;
};

module.exports = {
	getByUserId,
	analyze,
};

