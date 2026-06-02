const formatUserProfile = (user) => {
  return {
    id: user.id,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    role: user.role,
    bio: user.bio,
    avatar: user.avatar_url,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  };
};

const formatJobMatch = (job) => {
  return {
    id: job.id,
    title: job.title,
    company: job.company,
    matchScore: job.match_score,
    skills: job.required_skills,
    salaryRange: job.salary_range,
    location: job.location,
    jobUrl: job.job_url,
  };
};

const formatRecommendation = (rec) => {
  return {
    id: rec.id,
    type: rec.type,
    title: rec.title,
    description: rec.description,
    priority: rec.priority,
    createdAt: rec.created_at,
  };
};

module.exports = {
  formatUserProfile,
  formatJobMatch,
  formatRecommendation,
};
