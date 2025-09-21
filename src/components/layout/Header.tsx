"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About", href: "/about" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  // Get page title and subtitle based on current pathname
  const getPageTitle = () => {
    if (pathname === "/") return "UL.CO - Fashion Berbasis Kain Ulos";
    if (pathname === "/portfolio") return "Portfolio - UL.CO";
    if (pathname.startsWith("/portfolio/")) {
      const segments = pathname.split("/");
      const collection = segments[2];
      if (segments[3]) {
        return `Product Detail - UL.CO`;
      }
      return `${collection.charAt(0).toUpperCase() + collection.slice(1)} Collection - UL.CO`;
    }
    if (pathname === "/about") return "About - UL.CO";
    if (pathname === "/faq") return "FAQ - UL.CO";
    if (pathname === "/contact") return "Contact - UL.CO";
    return "UL.CO - Taruli Pasaribu Fashion";
  };

  const getSubtitle = () => {
    if (pathname === "/") return "Fashion Berbasis Kain Ulos";
    if (pathname === "/portfolio") return "Our Collections";
    if (pathname.startsWith("/portfolio/")) {
      const segments = pathname.split("/");
      const collection = segments[2];
      if (segments[3]) {
        return "Product Details";
      }
      return `${collection.charAt(0).toUpperCase() + collection.slice(1)} Collection`;
    }
    if (pathname === "/about") return "About Designer";
    if (pathname === "/faq") return "Frequently Asked Questions";
    if (pathname === "/contact") return "Get In Touch";
    return "Taruli Pasaribu Fashion";
  };



  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3">
              {/* Logo UL.CO */}
              <div className="w-12 h-12 bg-gradient-to-br from-[#921e27] to-[#b8242f] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">UL</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold" style={{ color: "#921e27" }}>
                  UL.CO
                </span>
                <span className="text-xs text-gray-500 hidden sm:block">
                  {getSubtitle()}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="text-gray-600 hover:text-[#921e27] transition-colors">
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/admin/login" className="hidden sm:block text-sm text-gray-600 hover:text-[#921e27]">
              Admin
            </Link>

            {/* Mobile menu button */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} className="text-gray-600 hover:text-[#921e27] transition-colors" onClick={() => setIsMenuOpen(false)}>
                  {item.name}
                </Link>
              ))}
              <Link href="/admin/login" className="text-sm text-gray-600 hover:text-[#921e27]" onClick={() => setIsMenuOpen(false)}>
                Admin
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
