import { BookOpen, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useCareerRecommendations } from '../../career-recommendation/hooks/useCareerRecommendations';

export const useDashboardTips = (matchedJob, learningPath) => {
  const { completedCourses } = useCareerRecommendations();

  const normalizeCourseId = (value) => (value || '').toString().trim().toLowerCase();
  const isCompletedCourse = (courseId, completedCourseIds = []) => {
    const normalizedCourseId = normalizeCourseId(courseId);
    if (!normalizedCourseId || !Array.isArray(completedCourseIds)) return false;

    return completedCourseIds.some((completedCourseId) => {
      const normalizedCompletedCourseId = normalizeCourseId(completedCourseId);
      return normalizedCompletedCourseId === normalizedCourseId
        || normalizedCourseId.endsWith(`-${normalizedCompletedCourseId}`)
        || normalizedCompletedCourseId.endsWith(`-${normalizedCourseId}`);
    });
  };

  const courses = (learningPath && learningPath.length > 0)
    ? learningPath
    : (matchedJob?.courses || matchedJob?.learning_roadmap || []);

  const dynamicTips = courses.slice(0, 3).map((course, index) => {
    const isCompleted = isCompletedCourse(course.id, completedCourses);
    const iconsMap = [BookOpen, TrendingUp, CheckCircle2];
    const courseTitle = course.judul || course.title || course.skill || 'Course';
    const coursePlatform = course.platform || 'Online';
    const courseSkill = course.skill || course.name || '';
    return {
      id: course.id || index,
      icon: iconsMap[index % 3],
      text: `Ikuti kelas "${courseTitle}" di ${coursePlatform} untuk menguasai ${courseSkill}.`,
      action: isCompleted ? 'Pelajari Lagi' : 'Mulai Belajar',
      category: 'skill',
      completed: isCompleted,
    };
  }) || [];

  return dynamicTips;
};
