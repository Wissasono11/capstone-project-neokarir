import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Icon as Iconify } from "@iconify/react";

const Breadcrumb = ({ items = [], className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center space-x-2 text-sm font-medium ${className}`}>
      <ol className="flex items-center space-x-2">
        {/* Home Item */}
        <li className="flex items-center">
          <Link
            to="/dashboard"
            className="flex items-center text-secondary-text hover:text-primary transition-colors duration-200"
          >
            <Home className="w-4 h-4 mr-1 shrink-0" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {/* Dynamic Items */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const Icon = item.icon;

          return (
            <li key={index} className="flex items-center space-x-2">
              <ChevronRight className="w-4 h-4 text-border shrink-0" />
              {isLast ? (
                <span className="text-primary font-semibold select-none flex items-center">
                  {Icon && (
                    typeof Icon === 'string' ? (
                      <Iconify icon={Icon} className="w-4 h-4 mr-1.5 shrink-0" />
                    ) : (
                      <Icon className="w-4 h-4 mr-1.5 shrink-0" />
                    )
                  )}
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="flex items-center text-secondary-text hover:text-primary transition-colors duration-200"
                >
                  {Icon && (
                    typeof Icon === 'string' ? (
                      <Iconify icon={Icon} className="w-4 h-4 mr-1.5 shrink-0" />
                    ) : (
                      <Icon className="w-4 h-4 mr-1.5 shrink-0" />
                    )
                  )}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
