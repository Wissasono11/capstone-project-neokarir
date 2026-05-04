import React from 'react';
import DashboardSidebar from '../features/dashboard/components/DashboardSidebar';
import DashboardNavbar from '../features/dashboard/components/DashboardNavbar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <DashboardSidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <DashboardNavbar />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 scrollbar-hide relative z-0">
          <div className="max-w-[1200px] mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
