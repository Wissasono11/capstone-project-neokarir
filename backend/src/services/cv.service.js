const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const CvRepository = require('../repositories/cv.repository');
const ProfileRepository = require('../repositories/profile.repository');
const env = require('../config/env');
const { getSupabaseClient, getAdminSupabaseClient } = require('../config/database');
const { AppError } = require('../middlewares/error.middleware');
const { ERROR_CODES } = require('../constants/error');
const { callAI1Multipart } = require('../utils/aiClient');

const CV_STORAGE_BUCKET = env.CV_STORAGE_BUCKET || 'cv-files';

const buildStorageObjectPath = (userId, originalName) => {
	const safeName = path.basename(originalName || 'cv-file').replace(/[^a-zA-Z0-9._-]/g, '_');
	return `${userId}/${Date.now()}_${crypto.randomUUID()}_${safeName}`;
};

const readFileBuffer = (file) => {
	if (!file) {
		throw new AppError(ERROR_CODES.VALIDATION_ERROR, 'File is required', 400);
	}

	if (file.buffer) {
		return file.buffer;
	}

	if (!file.path) {
		throw new AppError(ERROR_CODES.VALIDATION_ERROR, 'Uploaded file is missing', 400);
	}

	return fs.readFileSync(file.path);
};

const cleanupUploadedFile = (file) => {
	if (!file?.path) {
		return;
	}

	try {
		fs.unlinkSync(file.path);
	} catch {
		// Ignore cleanup errors for temp upload files.
	}
};

const uploadCvToStorage = async (userId, file, accessToken) => {
	const supabase = getAdminSupabaseClient() || getSupabaseClient(accessToken);
	const fileBuffer = readFileBuffer(file);
	const storageObjectPath = buildStorageObjectPath(userId, file.originalname);

	const { error } = await supabase
		.storage
		.from(CV_STORAGE_BUCKET)
		.upload(storageObjectPath, fileBuffer, {
			contentType: file.mimetype,
			upsert: false,
		});

	if (error) {
		throw new AppError(ERROR_CODES.DATABASE_ERROR, `Failed to upload CV to cloud storage: ${error.message}`, 500, error);
	}

	return {
		file_name: file.originalname,
		file_path: storageObjectPath,
		mime_type: file.mimetype,
		size: file.size,
		storage_bucket: CV_STORAGE_BUCKET,
		storage_object_path: storageObjectPath,
		file_url: null,
	};
};

const buildCvAnalysisPayload = (storageRecord, aiResult) => ({
	...storageRecord,
	parsed_text: aiResult.text || aiResult.parsed_text || '',
	summary: aiResult.career_goal || aiResult.summary || aiResult.ats_optimization || '',
	cv_data: aiResult,
});

const normalizeExperienceYears = (experienceLabel) => {
	if (experienceLabel === '< 1 tahun') return 0.5;
	if (experienceLabel === '1-3 tahun') return 2.0;
	if (experienceLabel === '3-5 tahun') return 4.0;
	if (experienceLabel === '> 5 tahun') return 6.0;
	if (experienceLabel === 'Belum ada pengalaman') return 0.0;
	return null;
};

const getByUserId = async (userId, accessToken) => {
	const cv = await CvRepository.getByUserId(userId, accessToken);
	if (!cv) return null;

	try {
		const latestAnalysis = await CvRepository.getLatestAnalysis(userId, accessToken);
		if (latestAnalysis) {
			cv.cv_data = {
				...(cv.cv_data || {}),
				...(latestAnalysis.analysis || {}),
				atsScore: Number(latestAnalysis.score || cv.cv_data?.atsScore || 0),
				strengths: latestAnalysis.strengths || cv.cv_data?.strengths || [],
				weaknesses: latestAnalysis.weaknesses || cv.cv_data?.weaknesses || [],
				improvementTips: (latestAnalysis.analysis?.improvementTips) || (cv.cv_data?.improvementTips) || []
			};
		}
	} catch (err) {
		console.error('Failed to fetch latest cv_analysis:', err);
	}
	return cv;
};

const upsertByUserId = async (userId, payload, accessToken) => {
	return CvRepository.upsertByUserId(userId, payload, accessToken);
};

const attachFile = async (userId, file, accessToken) => {
	try {
		const storageRecord = await uploadCvToStorage(userId, file, accessToken);
		return CvRepository.attachFile(userId, storageRecord, accessToken);
	} finally {
		cleanupUploadedFile(file);
	}
};

const analyzeCv = async (userId, file, accessToken) => {
	try {
		const storageRecord = await uploadCvToStorage(userId, file, accessToken);
		await CvRepository.attachFile(userId, storageRecord, accessToken);

		const fileBuffer = readFileBuffer(file);
		const formData = new FormData();
		const fileBlob = new Blob([fileBuffer], { type: file.mimetype });
		formData.append('cv_file', fileBlob, file.originalname);
		formData.append('user_id', userId);

		const aiResult = await callAI1Multipart('/api/v1/onboarding/auto-profiling', formData);
		const yearsExperience = normalizeExperienceYears(aiResult.user_experience);

		const profilePayload = {
			full_name: aiResult.user_name || null,
			target_role: aiResult.target_role || null,
			skills_summary: Array.isArray(aiResult.owned_skills) ? aiResult.owned_skills.join(', ') : (aiResult.owned_skills || null),
			bio: aiResult.career_goal || null,
			education_level: aiResult.user_education || null,
			years_experience: yearsExperience,
			profile_data: aiResult,
		};
		await ProfileRepository.upsertByUserId(userId, profilePayload, accessToken);

		const cvPayload = buildCvAnalysisPayload(storageRecord, aiResult);
		const cvRecord = await CvRepository.upsertByUserId(userId, cvPayload, accessToken);

		return {
			cv: cvRecord,
			profile: aiResult,
		};
	} finally {
		cleanupUploadedFile(file);
	}
};

const smartAnalyze = async (userId, file, accessToken) => {
	try {
		const storageRecord = await uploadCvToStorage(userId, file, accessToken);
		await CvRepository.attachFile(userId, storageRecord, accessToken);

		const fileBuffer = readFileBuffer(file);
		const formData = new FormData();
		const fileBlob = new Blob([fileBuffer], { type: file.mimetype });
		formData.append('file', fileBlob, file.originalname);

		const aiResult = await callAI1Multipart('/api/v1/cv-analyzer/analyze', formData);
		
		if (!aiResult || aiResult.status !== 'success' || !aiResult.data) {
			throw new AppError(ERROR_CODES.AI_SERVICE_ERROR, 'Failed to analyze CV with AI engine', 502);
		}

		const overview = aiResult.data.overview || {};
		const entities = aiResult.data.entities || {};

		const improvementTips = (overview.recommendations || []).map((rec) => ({
			priority: rec.priority || 'medium',
			text: rec.advice || rec.text || '',
		}));

		const score = overview.ats_score || 0;
		let overallRating = 'weak';
		if (score >= 85) overallRating = 'excellent';
		else if (score >= 70) overallRating = 'good';
		else if (score >= 50) overallRating = 'fair';

		const results = {
			atsScore: score,
			overallRating,
			summary: overview.match_analysis_text || '',
			strengths: overview.strengths || [],
			weaknesses: overview.weaknesses || [],
			improvementTips,
			entities,
		};

		const cvPayload = {
			...storageRecord,
			parsed_text: overview.match_analysis_text || '',
			summary: overview.match_analysis_text || '',
			cv_data: results,
		};
		await CvRepository.upsertByUserId(userId, cvPayload, accessToken);

		const cvAnalysisPayload = {
			score: score,
			strengths: overview.strengths || [],
			weaknesses: overview.weaknesses || [],
			suggestions: improvementTips.map(t => t.text),
			analysis: results,
		};
		await CvRepository.saveAnalysis(userId, cvAnalysisPayload, accessToken);

		return { results };
	} finally {
		cleanupUploadedFile(file);
	}
};

module.exports = {
	getByUserId,
	upsertByUserId,
	attachFile,
	analyzeCv,
	smartAnalyze,
};
