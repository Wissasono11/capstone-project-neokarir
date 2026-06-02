import { useState } from 'react';

export const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsOpen(prev => !prev);
  const closeSidebar = () => setIsOpen(false);
  const toggleCollapse = () => setIsCollapsed(prev => !prev);

  return {
    isOpen,
    isCollapsed,
    toggleSidebar,
    closeSidebar,
    toggleCollapse
  };
};
