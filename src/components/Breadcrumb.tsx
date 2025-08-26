"use client";

import Link from "next/link";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/outline";

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  showStats?: boolean;
  statsInfo?: string;
}

export default function Breadcrumb({ items, className = "", showStats = false, statsInfo }: BreadcrumbProps) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <nav className="flex items-center space-x-2 text-sm">
          <Link href="/admin/dashboard" className="flex items-center text-gray-500 hover:text-[#921e27] transition-colors duration-200 font-medium group">
            <HomeIcon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Dashboard
          </Link>

          {items.map((item, index) => (
            <div key={index} className="flex items-center">
              <ChevronRightIcon className="w-4 h-4 text-gray-300 mx-2" />
              {item.current || !item.href ? (
                <span className="text-[#921e27] font-semibold bg-[#921e27]/10 px-3 py-1 rounded-lg">{item.label}</span>
              ) : (
                <Link href={item.href} className="text-gray-600 hover:text-[#921e27] transition-colors duration-200 font-medium px-2 py-1 rounded-lg hover:bg-gray-50">
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {showStats && statsInfo && <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-lg">{statsInfo}</div>}
      </div>
    </div>
  );
}
