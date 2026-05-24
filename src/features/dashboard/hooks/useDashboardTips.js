import { BookOpen, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useCareerRecommendations } from '../../career-recommendation/hooks/useCareerRecommendations';

export const useDashboardTips = (matchedJob) => {
  const { completedCourses } = useCareerRecommendations();

  const dynamicTips = matchedJob?.courses.slice(0, 3).map((course, index) => {
    const isCompleted = completedCourses.includes(course.id);
    const iconsMap = [BookOpen, TrendingUp, CheckCircle2];
    return {
      id: course.id,
      icon: iconsMap[index % 3],
      text: `Ikuti kelas "${course.judul}" di ${course.platform} untuk menguasai ${course.skill}.`,
      action: isCompleted ? 'Pelajari Lagi' : 'Mulai Belajar',
      category: 'skill',
      completed: isCompleted,
    };
  }) || [];

  return dynamicTips;
};
