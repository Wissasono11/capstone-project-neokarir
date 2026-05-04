import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import avatar from '../../assets/images/avatar.png';

const DashboardNavbar = () => {
  const { user } = useAuth();

  return (
    <header className="h-[80px] bg-white border-b border-border/60 shrink-0 relative z-10">
      <div className="h-full px-6">
        <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between">
          {/* Title */}
          <h1 className="text-2xl font-bold text-primary-text tracking-tight">Dashboard</h1>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-secondary-text leading-tight">Hello👋</p>
              <p className="text-[15px] font-bold text-primary-text leading-tight mt-0.5">{user?.name || 'Franz Hermann'}</p>
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden bg-yellow-400 border-white shadow-sm cursor-pointer">
              <img
                src={avatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
