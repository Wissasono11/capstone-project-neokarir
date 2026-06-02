const ProfileRepository = require('../repositories/profile.repository');
const JobRepository = require('../repositories/job.repository');
const JobmatchRepository = require('../repositories/jobmatch.repository');
const { callAI1 } = require('../utils/aiClient');

const run = async (userId, payload, accessToken) => {
	const jobId = payload.jobId || payload.job_id;
	if (!jobId) {
		const err = new Error('jobId is required');
		err.statusCode = 400;
		throw err;
	}

	const profile = await ProfileRepository.getByUserId(userId, accessToken);
	if (!profile) {
		const err = new Error('User profile not found. Please onboarding first.');
		err.statusCode = 404;
		throw err;
	}

	const job = await JobRepository.getById(jobId, accessToken);
	if (!job) {
		const err = new Error('Job not found.');
		err.statusCode = 404;
		throw err;
	}

	const owned_skills = profile.profile_data?.owned_skills || 
		(profile.skills_summary ? profile.skills_summary.split(',').map(s => s.trim()).filter(Boolean) : []);
	const user_experience = profile.profile_data?.user_experience || 'Belum ada pengalaman';
	const user_education = profile.profile_data?.user_education || 'Tidak Disebutkan';

	const required_skills = job.job_skills ? job.job_skills.map(js => js.skill?.name).filter(Boolean) : [];
	const min_education = job.education_level || 'Tidak Disebutkan';
	const min_experience = job.experience_level || 'Belum ada pengalaman';

	const aiPayload = {
		user_id: userId,
		job_id: jobId,
		user_profile: {
			owned_skills,
			user_education,
			user_experience,
		},
		job_detail: {
			job_title: job.title,
			required_skills,
			min_education,
			min_experience,
		}
	};

	const aiResult = await callAI1('/api/v1/job-market/evaluate', aiPayload);
	
	const evaluation = aiResult.evaluation;
	if (!evaluation) {
		throw new Error('Failed to evaluate job match from AI service');
	}

	const matchRecord = {
		match_score: evaluation.match_percentage || 0,
		matched_skills: evaluation.skill_match_details?.matched || [],
		missing_skills: evaluation.skill_match_details?.missing || [],
		explanation: `Mencapai kecocokan ${evaluation.match_percentage || 0}% dengan role ${job.title} di ${job.company_name || 'Perusahaan Terkait'}.`,
		analysis: evaluation,
	};

	const saved = await JobmatchRepository.upsert(userId, jobId, matchRecord, accessToken);
	return saved;
};

module.exports = {
	run,
};
