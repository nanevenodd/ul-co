"use client";

import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

interface DarkBreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface DarkBreadcrumbProps {
  items: DarkBreadcrumbItem[];
  className?: string;
}

export default function DarkBreadcrumb({ items, className = "" }: DarkBreadcrumbProps) {
  return (
    <div className={`bg-black/40 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-4 mb-8 relative z-40 ${className}`}>
      <nav className="flex items-center space-x-2 text-sm">
        <Link 
          href="/" 
          className="flex items-center text-white/80 hover:text-white transition-colors duration-200 font-medium group"
        >
          <HomeIcon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
          Home
        </Link>
        
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            <ChevronRightIcon className="w-4 h-4 text-white/40 mx-2" />
            {item.current || !item.href ? (
              <span className="text-white font-semibold bg-white/20 px-3 py-1 rounded-lg">
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href} 
                className="text-white/80 hover:text-white transition-colors duration-200 font-medium px-2 py-1 rounded-lg hover:bg-white/10"
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
