import React from 'react';
import { Menu, LogOut, Settings } from 'lucide-react';
import { Icon as Iconify } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useNavbarDropdown } from '../hooks/useNavbarDropdown';
import avatar from '../../../assets/images/avatar.png';

const DashboardNavbar = ({ onMenuClick }) => {
  const {
    user,
    isOpen,
    dropdownRef,
    toggleDropdown,
    closeDropdown,
    handleLogout
  } = useNavbarDropdown();

  return (
    <header className="h-[80px] bg-white border-b border-border/60 shrink-0 relative z-10">
      <div className="h-full px-4 md:px-6">
        <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Trigger */}
            <button
              onClick={onMenuClick}
              className="p-2 -ml-2 text-secondary-text hover:text-primary lg:hidden transition-colors cursor-pointer"
            >
              <Menu size={24} />
            </button>

            {/* Title */}
            <h1 className="text-subtitle md:text-title font-bold text-primary-text tracking-tight">Dashboard</h1>
          </div>

          <div className="flex items-center gap-3 md:gap-4 relative" ref={dropdownRef}>
            {/* Clickable Profile Trigger */}
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-3 text-left focus:outline-none cursor-pointer group"
              aria-expanded={isOpen}
              aria-haspopup="true"
            >
              <div className="text-right hidden sm:block">
                <p className="text-body-sm font-medium text-secondary-text leading-tight">Halo!👋</p>
                <p className="text-body-sm font-bold text-primary-text leading-tight mt-0.5 group-hover:text-primary transition-colors">
                  {user?.name || 'Franz Hermann'}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full overflow-hidden bg-yellow-400 border-2 border-white shadow-sm shrink-0 transition-transform duration-200 group-hover:scale-105">
                <img
                  src={user?.avatar_url || avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-white border border-border/80 shadow-lg py-2 z-50 animate-fade-in"
                role="menu"
                aria-orientation="vertical"
              >
                {/* User Info Header */}
                <div className="px-4 py-2.5 border-b border-border/50">
                  <p className="text-body-sm font-bold text-primary-text truncate">
                    {user?.name || 'Franz Hermann'}
                  </p>
                  <p className="text-caption text-secondary-text truncate">
                    {user?.email || 'hello@example.com'}
                  </p>
                </div>

                {/* Menu Items */}
                <div className="p-1.5 space-y-1">
                  <Link
                    to="/dashboard"
                    onClick={closeDropdown}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-body-sm font-medium text-secondary-text hover:text-primary-text hover:bg-canvas-white transition-all duration-200"
                    role="menuitem"
                  >
                    <Iconify icon="si:dashboard-customize-duotone" size={20} className="shrink-0" />
                    My Overview
                  </Link>

                  <Link
                    to="/dashboard/settings"
                    onClick={closeDropdown}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-body-sm font-medium text-secondary-text hover:text-primary-text hover:bg-canvas-white transition-all duration-200"
                    role="menuitem"
                  >
                    <Settings size={16} />
                    Profile & Settings
                  </Link>
                </div>

                <div className="border-t border-border/50 my-1"></div>

                {/* Logout Button */}
                <div className="p-1.5">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 px-3 py-2 rounded-xl text-body-sm font-semibold text-error hover:bg-error-light transition-all duration-200 cursor-pointer"
                    role="menuitem"
                  >
                    <LogOut size={16} />
                    Keluar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;

