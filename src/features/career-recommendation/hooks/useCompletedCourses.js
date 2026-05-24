import { useState, useEffect } from 'react';

export const useCompletedCourses = (userEmail) => {
  const [completedCourses, setCompletedCourses] = useState([]);

  // Load completed courses from localStorage on mount/email change
  useEffect(() => {
    if (userEmail) {
      const saved = localStorage.getItem(`neokarir_completed_courses_${userEmail}`);
      if (saved) {
        try {
          setCompletedCourses(JSON.parse(saved));
        } catch (e) {
          console.error("Error parsing completed courses", e);
        }
      } else {
        setCompletedCourses([]);
      }
    }
  }, [userEmail]);

  // Save completed courses to localStorage when changed
  const toggleCourse = (courseId) => {
    if (!userEmail) return;
    
    setCompletedCourses(prev => {
      const updated = prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId];
      
      localStorage.setItem(`neokarir_completed_courses_${userEmail}`, JSON.stringify(updated));
      return updated;
    });
  };

  return {
    completedCourses,
    toggleCourse
  };
};
