"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#fbeaec]/90 backdrop-blur-md shadow-lg text-[#5e0e15]" : "bg-[#921e27] text-white"}`}>
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="transition-transform duration-300 hover:scale-105" onClick={closeMenu}>
          <Image src="/image/Logo.png" alt="UL.CO Logo" width={40} height={40} priority className="h-auto w-auto" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 items-center">
          {["Home", "Portfolio", "About"].map((label) => (
            <Link key={label} href={`/${label.toLowerCase() === "home" ? "" : label.toLowerCase()}`} className="relative group font-light transition-colors duration-300 hover:text-[#fbeaec]">
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#fbeaec] group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
          <Link href="/contact" className="bg-[#921e27] text-white font-medium px-6 py-3 rounded-full hover:bg-[#7a1a21] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl shadow-[#921e27]/50">
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden z-50 relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#fbeaec]/20 transition-all duration-300" onClick={toggleMenu} aria-label="Toggle menu">
          <div className="w-6 h-6 relative flex flex-col justify-center items-center">
            <span className={`block absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${isMenuOpen ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`block absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`block absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${isMenuOpen ? "-rotate-45" : "translate-y-1.5"}`} />
          </div>
        </button>

        {/* Mobile Menu Panel */}
        <div className={`md:hidden fixed inset-0 transition-all duration-500 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
          <div className="absolute inset-0 bg-[#921e27]"></div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-8">
            {["Home", "Portfolio", "About", "Contact"].map((label, index) => (
              <Link
                key={label}
                href={`/${label.toLowerCase() === "home" ? "" : label.toLowerCase()}`}
                className={`text-4xl font-light text-white hover:text-[#fbeaec] transition-all duration-300 transform ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                style={{ transitionDelay: `${100 + index * 100}ms` }}
                onClick={closeMenu}>
                {label}
              </Link>
            ))}

            {/* Social Links */}
            <div className={`flex space-x-6 mt-8 transition-all duration-300 transform ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`} style={{ transitionDelay: "500ms" }}>
              {["instagram", "twitter", "linkedin"].map((platform) => (
                <a key={platform} href="#" className="text-white hover:text-[#fbeaec] transition-colors duration-300" onClick={closeMenu}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    {platform === "instagram" && (
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    )}
                    {platform === "twitter" && (
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    )}
                    {platform === "linkedin" && (
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
