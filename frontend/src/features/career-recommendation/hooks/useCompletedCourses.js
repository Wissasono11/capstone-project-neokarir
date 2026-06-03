import { useAuth } from '../../../contexts/AuthContext';
import { useToast } from '../../../contexts/ToastContext';

export const useCompletedCourses = (userEmail) => {
  const { user, updateProfile } = useAuth();
  const { success: toastSuccess, error: toastError } = useToast();

  const completedCourses = user?.profile_data?.completed_courses || [];

  // Save completed courses via profile service when changed
  const toggleCourse = async (courseId) => {
    if (!user) return;
    
    const wasCompleted = completedCourses.includes(courseId);
    let updated;
    if (wasCompleted) {
      updated = completedCourses.filter((id) => id !== courseId);
    } else {
      updated = [...completedCourses, courseId];
    }
    
    try {
      const { profileService } = await import('../../profile-settings/api/profileService');
      await profileService.updateProfile({
        profile_data: {
          completed_courses: updated
        }
      });
      
      // Update global context state
      updateProfile({
        profile_data: {
          ...(user.profile_data || {}),
          completed_courses: updated
        }
      });
      
      if (!wasCompleted) {
        toastSuccess('Selamat! Anda telah menandai modul ini sebagai selesai.');
      } else {
        toastSuccess('Modul ditandai kembali sebagai belum selesai.');
      }
    } catch (e) {
      toastError('Gagal memperbarui status penyelesaian modul.');
    }
  };

  return {
    completedCourses,
    toggleCourse
  };
};
