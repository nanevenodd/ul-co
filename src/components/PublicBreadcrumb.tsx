"use client";

import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

interface PublicBreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface PublicBreadcrumbProps {
  items: PublicBreadcrumbItem[];
  className?: string;
}

export default function PublicBreadcrumb({ items, className = "" }: PublicBreadcrumbProps) {
  return (
    <div className={`bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-4 mb-8 relative z-40 ${className}`}>
      <nav className="flex items-center space-x-2 text-sm">
        <Link 
          href="/" 
          className="flex items-center text-gray-600 hover:text-[#921e27] transition-colors duration-200 font-medium group"
        >
          <HomeIcon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
          Home
        </Link>
        
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            <ChevronRightIcon className="w-4 h-4 text-gray-400 mx-2" />
            {item.current || !item.href ? (
              <span className="text-[#921e27] font-semibold bg-[#921e27]/10 px-3 py-1 rounded-lg">
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href} 
                className="text-gray-600 hover:text-[#921e27] transition-colors duration-200 font-medium px-2 py-1 rounded-lg hover:bg-gray-50"
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
