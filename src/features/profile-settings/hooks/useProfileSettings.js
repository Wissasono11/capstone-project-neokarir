import { useState, useCallback } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

/**
 * Custom hook untuk mengelola state dan logic halaman Profile & Settings.
 * Menggunakan data dari AuthContext sebagai sumber awal,
 * lalu mengelola form state secara lokal untuk tiap tab.
 */
export const useProfileSettings = () => {
  const { user } = useAuth();

  // === Active Tab ===
  const [activeTab, setActiveTab] = useState('personal');

  // === Personal Info State ===
  const [personalInfo, setPersonalInfo] = useState({
    fullName: user?.name || 'Franz Hermann',
    email: user?.email || 'hello@example.com',
    phone: '+62 812-3456-7890',
    location: user?.location || 'Yogyakarta, Indonesia',
    bio: 'Passionate developer focused on building impactful web applications with modern technologies.',
    dateOfBirth: '1999-06-15',
    gender: 'male',
  });

  // === Career & Skills State ===
  const [careerInfo, setCareerInfo] = useState({
    currentRole: user?.role || 'Full Stack Developer',
    targetRole: 'Senior Full Stack Developer',
    experienceLevel: user?.level || 'Fresh Graduate',
    skills: ['React.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Git', 'REST API'],
    education: [
      {
        id: 1,
        institution: 'Universitas Gadjah Mada',
        degree: 'S1 Informatika',
        year: '2022 - 2026',
      },
    ],
  });

  // === Security State ===
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    sessions: [
      { id: 1, device: 'Chrome - Windows', location: 'Yogyakarta, ID', lastActive: 'Aktif sekarang', isCurrent: true },
      { id: 2, device: 'Safari - iPhone', location: 'Jakarta, ID', lastActive: '2 jam lalu', isCurrent: false },
    ],
  });

  // === Preferences State ===
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReport: true,
    jobAlerts: true,
    language: 'id',
    theme: 'light',
  });

  // === Save States ===
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // === Handlers ===
  const updatePersonalInfo = useCallback((field, value) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  }, []);

  const updateCareerInfo = useCallback((field, value) => {
    setCareerInfo(prev => ({ ...prev, [field]: value }));
  }, []);

  const addSkill = useCallback((skill) => {
    if (skill && !careerInfo.skills.includes(skill)) {
      setCareerInfo(prev => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }
  }, [careerInfo.skills]);

  const removeSkill = useCallback((skillToRemove) => {
    setCareerInfo(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove),
    }));
  }, []);

  const updateSecurity = useCallback((field, value) => {
    setSecurity(prev => ({ ...prev, [field]: value }));
  }, []);

  const updatePreferences = useCallback((field, value) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  }, []);

  const removeSession = useCallback((sessionId) => {
    setSecurity(prev => ({
      ...prev,
      sessions: prev.sessions.filter(s => s.id !== sessionId),
    }));
  }, []);

  /**
   * Simulasi save — nantinya akan terintegrasi dengan API backend.
   * Menampilkan feedback visual selama proses penyimpanan.
   */
  const handleSave = useCallback(async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    // Simulasi network delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsSaving(false);
    setSaveSuccess(true);
    // Reset success indicator setelah 3 detik
    setTimeout(() => setSaveSuccess(false), 3000);
  }, []);

  return {
    activeTab,
    setActiveTab,
    personalInfo,
    updatePersonalInfo,
    careerInfo,
    updateCareerInfo,
    addSkill,
    removeSkill,
    security,
    updateSecurity,
    removeSession,
    preferences,
    updatePreferences,
    isSaving,
    saveSuccess,
    handleSave,
    user,
  };
};
