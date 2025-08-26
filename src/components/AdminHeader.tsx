"use client";

import { useState } from "react";
import Link from "next/link";

interface AdminHeaderProps {
  title: string;
  icon: React.ReactNode;
  gradientColors: string;
  breadcrumbItems: Array<{
    label: string;
    href?: string;
    current?: boolean;
  }>;
  showLogout?: boolean;
  showPreview?: boolean;
  backLink?: string;
  onLogout?: () => void;
}

const AdminHeader = ({ title, icon, gradientColors, breadcrumbItems, showLogout = true, showPreview = true, backLink = "/admin/dashboard", onLogout }: AdminHeaderProps) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    if (!confirm("Are you sure you want to logout?")) return;

    setIsLoggingOut(true);
    try {
      if (onLogout) {
        await onLogout();
      } else {
        const response = await fetch("/api/auth/logout", {
          method: "POST",
        });
        if (response.ok) {
          window.location.href = "/admin";
        }
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Error logging out");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header */}
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Left Section - Icon, Title, Back Link */}
          <div className="flex items-center min-w-0 flex-1">
            {/* Back Link - Responsive */}
            {backLink && (
              <Link 
                href={backLink} 
                className="text-[#921e27] hover:text-[#7a1a21] mr-2 md:mr-4 lg:mr-6 font-semibold text-sm md:text-base">
                <span className="hidden sm:inline">← Back to Dashboard</span>
                <span className="sm:hidden">←</span>
              </Link>
            )}
            
            <div className="flex items-center space-x-2 md:space-x-4 min-w-0">
              {/* Icon - Responsive */}
              <div className={`w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r ${gradientColors} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <div className="w-4 h-4 md:w-6 md:h-6 text-white">
                  {icon}
                </div>
              </div>
              
              {/* Title and Breadcrumb */}
              <div className="min-w-0 flex-1">
                <h1 className={`text-lg md:text-2xl lg:text-3xl font-bold bg-gradient-to-r ${gradientColors} bg-clip-text text-transparent truncate`}>
                  {title}
                </h1>
                
                {/* Breadcrumb - Hidden on small mobile */}
                <nav className="text-xs md:text-sm mt-1 hidden sm:block">
                  <ol className="flex items-center space-x-1 md:space-x-2 text-gray-600 overflow-x-auto">
                    {breadcrumbItems.map((item, index) => (
                      <li key={index} className="flex items-center whitespace-nowrap">
                        {index > 0 && <span className="mx-1 md:mx-2 text-gray-400">/</span>}
                        {item.href && !item.current ? (
                          <Link href={item.href} className="hover:text-blue-600 transition-colors">
                            {item.label}
                          </Link>
                        ) : (
                          <span className={`${item.current ? "text-blue-700 font-medium" : ""}`}>
                            {item.label}
                          </span>
                        )}
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>
            </div>
          </div>

          {/* Right Section - Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {showPreview && (
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center px-3 lg:px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl text-sm">
                <svg className="w-4 h-4 mr-1 lg:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="hidden lg:inline">Preview Website</span>
                <span className="lg:hidden">Preview</span>
              </Link>
            )}

            {showLogout && (
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="inline-flex items-center px-3 lg:px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 text-sm">
                <svg className="w-4 h-4 mr-1 lg:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
                </svg>
                <span className="hidden lg:inline">{isLoggingOut ? "Logging out..." : "Logout"}</span>
                <span className="lg:hidden">{isLoggingOut ? "..." : "Out"}</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Breadcrumb - Only on small screens */}
        <div className="sm:hidden pb-3 border-t border-gray-100 pt-3">
          <nav className="text-xs">
            <ol className="flex items-center space-x-1 text-gray-600 overflow-x-auto pb-1">
              {breadcrumbItems.map((item, index) => (
                <li key={index} className="flex items-center whitespace-nowrap">
                  {index > 0 && <span className="mx-1 text-gray-400">/</span>}
                  {item.href && !item.current ? (
                    <Link href={item.href} className="hover:text-blue-600 transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span className={item.current ? "text-blue-700 font-medium" : ""}>
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-3">
              {showPreview && (
                <Link
                  href="/"
                  target="_blank"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg text-sm font-medium">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Preview Website
                </Link>
              )}

              {showLogout && (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  disabled={isLoggingOut}
                  className="inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg disabled:opacity-50 text-sm font-medium">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
                  </svg>
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
