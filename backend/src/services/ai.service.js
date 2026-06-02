const { healthCheckAll, callAI2 } = require('../utils/aiClient');

const checkHealth = async () => {
  return healthCheckAll();
};

const getProfileScore = async (profilePayload) => {
  const aiResult = await callAI2('/api/profile/score', profilePayload);
  return aiResult;
};

module.exports = {
  checkHealth,
  getProfileScore,
};
