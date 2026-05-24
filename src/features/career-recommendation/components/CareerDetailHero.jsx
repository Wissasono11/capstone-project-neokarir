import { Briefcase, GraduationCap } from 'lucide-react';

const CareerDetailHero = ({ job }) => {
  if (!job) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-2xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div className="flex gap-4 items-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 p-2.5 flex items-center justify-center shrink-0 shadow-3xs">
          <img
            src={job.logo}
            alt={job.company}
            className="w-full h-full object-contain mix-blend-multiply"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = `<span class="font-extrabold text-indigo-600 text-heading">${job.company.charAt(0)}</span>`;
            }}
          />
        </div>
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded text-caption font-extrabold bg-indigo-50 text-indigo-600 mb-2.5 border border-indigo-100/50">
            {job.job_domain}
          </span>
          <h1 className="text-title md:text-heading font-extrabold text-slate-800 tracking-tight leading-tight">
            {job.job_title}
          </h1>
          <p className="text-body-sm font-semibold text-slate-500 mt-2">
            {job.company}
          </p>
        </div>
      </div>

      {/* Quick Specs requirements badges */}
      <div className="flex items-center gap-3 self-stretch md:self-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
        <div className="flex-1 md:flex-initial flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl text-slate-600">
          <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
          <div>
            <div className="text-slate-400 text-caption uppercase font-bold tracking-wider">Pengalaman</div>
            <div className="text-body-sm font-bold">{job.min_experience}</div>
          </div>
        </div>
        <div className="flex-1 md:flex-initial flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl text-slate-600">
          <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
          <div>
            <div className="text-slate-400 text-caption uppercase font-bold tracking-wider">Pendidikan</div>
            <div className="text-body-sm font-bold">{job.min_education}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerDetailHero;
