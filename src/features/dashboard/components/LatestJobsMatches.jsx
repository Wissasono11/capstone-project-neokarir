import React from 'react';

const LatestJobsMatches = ({ matches }) => {
  return (
    <div className="bg-dashboard-background rounded-[32px] p-6 shadow-lg h-full flex flex-col relative overflow-hidden">
      {/* Decorative blur elements */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      
      <h3 className="text-[17px] font-bold text-white mb-6 relative z-10">Latest Jobs Matches</h3>
      
      <div className="flex-1 flex flex-col gap-4 relative z-10">
        {matches.map((job) => (
          <div 
            key={job.id} 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 flex items-center justify-between hover:bg-white/20 transition-colors cursor-pointer"
          >
            <div>
              <h4 className="font-bold text-white text-sm mb-1">{job.title}</h4>
              <div className="flex items-center gap-2 text-xs font-medium text-white/80">
                <span>{job.company}</span>
                <span className="w-1 h-1 rounded-full bg-white/50" />
                <span>{job.type}</span>
              </div>
            </div>
            <div className="bg-white rounded-full px-3 py-1 text-xs font-bold text-primary">
              {job.matchScore}%
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 bg-white hover:bg-white/90 text-primary font-bold py-3.5 rounded-2xl transition-colors relative z-10 shadow-sm">
        View All Matches
      </button>
    </div>
  );
};

export default LatestJobsMatches;
