import { MASTER_JOBS } from '../data/recommendationData';

export const useCareerMatchCalculator = (user, completedCourses) => {
  const userOwnedSkills = user?.skills || ['React', 'JavaScript', 'HTML', 'CSS'];

  const normalizeSkill = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const normalizedUserSkills = userOwnedSkills.map(normalizeSkill);

  const calculateMatches = () => {
    return MASTER_JOBS.map(job => {
      const matchedSkills = [];
      const missingSkills = [];

      const completedSkillsForJob = job.courses
        .filter(course => completedCourses.includes(course.id))
        .map(course => normalizeSkill(course.skill));

      job.required_skills.forEach(skill => {
        const normSkill = normalizeSkill(skill);
        const isOwned = normalizedUserSkills.includes(normSkill) || completedSkillsForJob.includes(normSkill);
        
        if (isOwned) {
          matchedSkills.push(skill);
        } else {
          missingSkills.push(skill);
        }
      });

      const skillMatchRatio = job.required_skills.length > 0 
        ? matchedSkills.length / job.required_skills.length 
        : 1;
      let skillScore = skillMatchRatio * 80;

      let expScore = 10;
      const userExp = (user?.experience || 'Fresh Graduate').toLowerCase();
      const jobExp = job.min_experience.toLowerCase();
      if (jobExp.includes('3 tahun') && (userExp.includes('fresh') || userExp.includes('< 1'))) {
        expScore = 4; 
      } else if (jobExp.includes('1 - 3') && userExp.includes('fresh')) {
        expScore = 7; 
      }

      let eduScore = 10;
      const userEdu = (user?.education || 'S1').toLowerCase();
      const jobEdu = job.min_education.toLowerCase();
      if (jobEdu.includes('s1') && (userEdu.includes('sma') || userEdu.includes('smk') || userEdu.includes('d3'))) {
        eduScore = 5; 
      } else if (jobEdu.includes('d3') && (userEdu.includes('sma') || userEdu.includes('smk'))) {
        eduScore = 6;
      }

      const totalMatchScore = Math.min(100, Math.round(skillScore + expScore + eduScore));

      return {
        ...job,
        matchScore: totalMatchScore,
        matchedSkills,
        missingSkills,
        matchBreakdown: {
          skills: Math.round(skillMatchRatio * 100),
          experience: expScore * 10,
          education: eduScore * 10
        }
      };
    });
  };

  return {
    recommendations: calculateMatches()
  };
};
