import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import {
  Target,
  Award,
  BriefcaseBusiness,
  FileText,
  MessageSquareMore ,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Icon as Iconify } from '@iconify/react';

const SIDEBAR_ITEMS = [
  { id: 'overview', label: 'My Overview', icon: 'si:dashboard-customize-duotone', path: '/dashboard' },
  { id: 'skill-gap', label: 'Skill Gap Analysis', icon: Target, path: '/dashboard/skill-gap' },
  { id: 'recommendation', label: 'Career Recommendation', icon: Award, path: '/dashboard/recommendations' },
  { id: 'jobs-match', label: 'Jobs Match Score', icon: BriefcaseBusiness, path: '/dashboard/jobs-match' },
  { id: 'cv-analyzer', label: 'CV Analyzer', icon: FileText, path: '/dashboard/cv-analyzer' },
  { id: 'jobs-market', label: 'Jobs Market', icon: "mingcute:presentation-1-line", path: '/dashboard/jobs-market' },
  { id: 'ai-assistant', label: 'AI Assistant', icon: MessageSquareMore, path: '/dashboard/ai-assistant' },
];

const BOTTOM_ITEMS = [
  { id: 'settings', label: 'Profile & Settings', icon: Settings, path: '/settings' },
  { id: 'support', label: 'Support', icon: HelpCircle, path: '/support' },
];

const DashboardSidebar = ({ isOpen, onClose }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <aside
        className={`bg-white border-r border-border/60 flex flex-col shrink-0 transition-all duration-300 fixed lg:static inset-y-0 left-0 z-50 
          ${isCollapsed ? 'lg:w-[88px]' : 'lg:w-[280px]'}
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          w-[280px]
        `}
      >
        {/* Toggle Button (Desktop) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-4 top-[24px] w-8 h-8 rounded-full border border-border/60 bg-white items-center justify-center text-secondary-text hover:text-primary transition-colors z-20 shadow-sm"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        {/* Logo Area */}
        <div className="h-[80px] flex items-center px-6 border-b border-border/60">
          <Link to="/" className={`flex items-center gap-1 w-full ${isCollapsed ? 'lg:justify-center' : ''}`}>
            <div className="flex items-center justify-center p-1 rounded-full shrink-0">
              <img
                src={logo}
                alt="NeoKarir"
                className='w-8 h-8 object-cover'
                loading='lazy'
              />
            </div>
            {(!isCollapsed || (isOpen && window.innerWidth < 1024)) && (
              <span className="text-xl font-bold text-primary-text tracking-tight truncate">
                NeoKarir
              </span>
            )}
          </Link>

          {/* Close button for mobile */}
          <button className="lg:hidden p-2 text-secondary-text" onClick={onClose}>
            <ChevronLeft size={24} />
          </button>
        </div>

        {/* Main Nav */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2 scrollbar-hide">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname.startsWith('/dashboard') && location.pathname.length === 10);
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => { if (window.innerWidth < 1024) onClose(); }}
                title={isCollapsed ? item.label : undefined}
                className={`flex items-center rounded-full transition-all duration-200 font-medium
                  ${isCollapsed ? 'lg:justify-center p-4' : 'gap-3 px-4 py-4'}
                  ${isActive
                    ? 'bg-primary-light text-primary'
                    : 'text-secondary-text hover:bg-canvas-white hover:text-primary-text'
                  }
                `}
              >
                {typeof Icon === 'string' ? (
                  <Iconify
                    icon={Icon}
                    size={20}
                    className={`w-5 h-5 shrink-0 ${isActive ? 'text-primary' : 'text-secondary-text'}`}
                  />
                ) : (
                  <Icon
                    size={20}
                    className={isActive ? 'text-primary' : 'text-secondary-text'}
                  />
                )}

                {(!isCollapsed || (isOpen && window.innerWidth < 1024)) && (
                  <span className="text-sm truncate">{item.label}</span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom Nav */}
        <div className="p-4 border-t border-border/60 space-y-2">
          {BOTTOM_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => { if (window.innerWidth < 1024) onClose(); }}
                title={isCollapsed ? item.label : undefined}
                className={`flex items-center rounded-xl transition-all duration-200 font-medium text-secondary-text hover:bg-canvas-white hover:text-primary-text
                  ${isCollapsed ? 'lg:justify-center p-3' : 'gap-3 px-4 py-3'}
                `}
              >
                <Icon size={20} />
                {(!isCollapsed || (isOpen && window.innerWidth < 1024)) && <span className="text-sm truncate">{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
