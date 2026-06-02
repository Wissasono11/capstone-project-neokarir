import { useMemo } from 'react';
import { 
  Cpu, 
  UserCheck, 
  GraduationCap, 
  Award, 
  Building2, 
  CalendarRange 
} from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

export const useExtractedEntities = (entities) => {
  const { t } = useLanguage();

  const sections = useMemo(() => {
    if (!entities) return [];

    return [
      {
        title: t.cvAnalyzer.entities.skillsTitle,
        tag: 'SKILL',
        icon: Cpu,
        items: entities.skills || [],
        bgColor: 'bg-indigo-50/50',
        iconColor: 'text-indigo-600',
        badgeColor: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200/70',
        description: t.cvAnalyzer.entities.skillsDesc
      },
      {
        title: t.cvAnalyzer.entities.rolesTitle,
        tag: 'ROLE',
        icon: UserCheck,
        items: entities.roles || [],
        bgColor: 'bg-emerald-50/50',
        iconColor: 'text-emerald-600',
        badgeColor: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200/70',
        description: t.cvAnalyzer.entities.rolesDesc
      },
      {
        title: t.cvAnalyzer.entities.eduTitle,
        tag: 'EDU',
        icon: GraduationCap,
        items: entities.education || [],
        bgColor: 'bg-purple-50/50',
        iconColor: 'text-purple-600',
        badgeColor: 'bg-purple-100 text-purple-700 hover:bg-purple-200/70',
        description: t.cvAnalyzer.entities.eduDesc
      },
      {
        title: t.cvAnalyzer.entities.certTitle,
        tag: 'CERT',
        icon: Award,
        items: entities.certifications || [],
        bgColor: 'bg-amber-50/50',
        iconColor: 'text-amber-600',
        badgeColor: 'bg-amber-100 text-amber-700 hover:bg-amber-200/70',
        description: t.cvAnalyzer.entities.certDesc
      },
      {
        title: t.cvAnalyzer.entities.compTitle,
        tag: 'COMP',
        icon: Building2,
        items: entities.companies || [],
        bgColor: 'bg-sky-50/50',
        iconColor: 'text-sky-600',
        badgeColor: 'bg-sky-100 text-sky-700 hover:bg-sky-200/70',
        description: t.cvAnalyzer.entities.compDesc
      },
      {
        title: t.cvAnalyzer.entities.expTitle,
        tag: 'EXP',
        icon: CalendarRange,
        items: entities.experience || [],
        bgColor: 'bg-rose-50/50',
        iconColor: 'text-rose-600',
        badgeColor: 'bg-rose-100 text-rose-700 hover:bg-rose-200/70',
        description: t.cvAnalyzer.entities.expDesc
      }
    ];
  }, [entities, t]);

  return sections;
};
