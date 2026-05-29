const AI_MODELS = {
  SKILL_GAP_ANALYZER: 'skill_gap_analyzer',
  JOB_MATCHER: 'job_matcher',
  CAREER_RECOMMENDER: 'career_recommender',
  CHAT_BOT: 'chat_bot',
  CV_ANALYZER: 'cv_analyzer',
  PROFILE_SCORE: 'profile_score',
};

const AI_MODEL_ENDPOINTS = {
  [AI_MODELS.SKILL_GAP_ANALYZER]: '/api/profile/skill-gap',
  [AI_MODELS.JOB_MATCHER]: '/api/v1/job-market/evaluate',
  [AI_MODELS.CAREER_RECOMMENDER]: '/api/recommendation/dynamic',
  [AI_MODELS.CHAT_BOT]: '/api/v1/chat/',
  [AI_MODELS.CV_ANALYZER]: '/api/v1/onboarding/auto-profiling',
  [AI_MODELS.PROFILE_SCORE]: '/api/profile/score',
};

module.exports = {
  AI_MODELS,
  AI_MODEL_ENDPOINTS,
};
