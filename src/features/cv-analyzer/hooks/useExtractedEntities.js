import { useMemo } from 'react';
import { 
  Cpu, 
  UserCheck, 
  GraduationCap, 
  Award, 
  Building2, 
  CalendarRange 
} from 'lucide-react';

export const useExtractedEntities = (entities) => {
  const sections = useMemo(() => {
    if (!entities) return [];

    return [
      {
        title: 'Skills Detected',
        tag: 'SKILL',
        icon: Cpu,
        items: entities.skills || [],
        bgColor: 'bg-indigo-50/50',
        iconColor: 'text-indigo-600',
        badgeColor: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200/70',
        description: 'Bahasa pemrograman, framework, perkakas, & soft-skills'
      },
      {
        title: 'Roles & Positions',
        tag: 'ROLE',
        icon: UserCheck,
        items: entities.roles || [],
        bgColor: 'bg-emerald-50/50',
        iconColor: 'text-emerald-600',
        badgeColor: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200/70',
        description: 'Pekerjaan, jabatan, atau target spesifik'
      },
      {
        title: 'Education Background',
        tag: 'EDU',
        icon: GraduationCap,
        items: entities.education || [],
        bgColor: 'bg-purple-50/50',
        iconColor: 'text-purple-600',
        badgeColor: 'bg-purple-100 text-purple-700 hover:bg-purple-200/70',
        description: 'Institusi pendidikan, derajat (S1/D3), & IPK'
      },
      {
        title: 'Certifications',
        tag: 'CERT',
        icon: Award,
        items: entities.certifications || [],
        bgColor: 'bg-amber-50/50',
        iconColor: 'text-amber-600',
        badgeColor: 'bg-amber-100 text-amber-700 hover:bg-amber-200/70',
        description: 'Sertifikasi profesional, lisensi, & pelatihan/bootcamp'
      },
      {
        title: 'Companies & Organizations',
        tag: 'COMP',
        icon: Building2,
        items: entities.companies || [],
        bgColor: 'bg-sky-50/50',
        iconColor: 'text-sky-600',
        badgeColor: 'bg-sky-100 text-sky-700 hover:bg-sky-200/70',
        description: 'Nama perusahaan tempat bekerja terdahulu'
      },
      {
        title: 'Experience Details',
        tag: 'EXP',
        icon: CalendarRange,
        items: entities.experience || [],
        bgColor: 'bg-rose-50/50',
        iconColor: 'text-rose-600',
        badgeColor: 'bg-rose-100 text-rose-700 hover:bg-rose-200/70',
        description: 'Rentang waktu, durasi, & tanggal'
      }
    ];
  }, [entities]);

  return sections;
};
