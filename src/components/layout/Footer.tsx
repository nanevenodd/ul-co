"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export default function Footer() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [contactInfo, setContactInfo] = useState({
    email: "hello@ulco.com",
    phone: "+62 123 4567 890",
    address: "Jakarta, Indonesia",
  });
  const [brandInfo, setBrandInfo] = useState({
    title: "UL.CO",
    description: "Fashion berbasis kain ulos dengan desain modern dan berkelanjutan. Setiap karya adalah cerita, setiap desain adalah warisan.",
    designer: "Taruli Pasaribu",
  });

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch("/api/content");
        const data = await response.json();

        // Load social links
        if (data.footer?.socialLinks) {
          setSocialLinks(data.footer.socialLinks);
        }

        // Load contact info
        if (data.contact) {
          setContactInfo({
            email: data.contact.email || "hello@ulco.com",
            phone: data.contact.whatsapp || "+62 123 4567 890",
            address: data.contact.address || "Jakarta, Indonesia",
          });
        }

        // Load brand info
        if (data.about?.designerName) {
          setBrandInfo((prev) => ({
            ...prev,
            designer: data.about.designerName,
          }));
        }
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };

    fetchFooterData();
  }, []);

  const getSocialIcon = (iconType: string) => {
    switch (iconType) {
      case "instagram":
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.987 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.23 16.72c-2.086 0-3.78-1.693-3.78-3.78s1.693-3.78 3.78-3.78 3.78 1.693 3.78 3.78-1.693 3.78-3.78 3.78zm7.554 0c-2.086 0-3.78-1.693-3.78-3.78s1.693-3.78 3.78-3.78 3.78 1.693 3.78 3.78-1.693 3.78-3.78 3.78z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "facebook":
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "tiktok":
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.321 5.562a5.123 5.123 0 01-.443-.258 6.228 6.228 0 01-1.137-.966c-.849-.849-1.317-1.958-1.317-3.123V.83h-3.506v15.638c0 .849-.22 1.668-.635 2.37a4.738 4.738 0 01-1.693 1.693c-.703.415-1.521.635-2.37.635-2.616 0-4.738-2.122-4.738-4.738 0-2.617 2.122-4.739 4.738-4.739.469 0 .923.069 1.351.2v-3.506a8.287 8.287 0 00-1.351-.111c-4.56 0-8.244 3.684-8.244 8.244S4.67 24 9.23 24c4.56 0 8.244-3.684 8.244-8.244V8.298a9.697 9.697 0 005.847 1.954V6.746c-1.317 0-2.555-.507-3.506-1.426-.474-.456-.85-.993-1.107-1.583-.164-.378-.244-.788-.244-1.202 0-.137.011-.273.032-.407h-.035z" />
          </svg>
        );
      case "twitter":
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
        );
      default:
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <footer className="bg-[#921e27] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-white">{brandInfo.title}</h3>
            <p className="text-red-100 mb-4">{brandInfo.description}</p>
            <p className="text-sm text-red-200">Designer: {brandInfo.designer}</p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-red-100 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-red-100 hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-red-100 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-red-100 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-red-100 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <ul className="space-y-2 text-red-100">
              <li>{contactInfo.email}</li>
              <li>{contactInfo.phone}</li>
              <li>{contactInfo.address}</li>
            </ul>
            <div className="mt-4 flex space-x-4">
              {socialLinks.map((link) => (
                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="text-red-100 hover:text-white transition-colors" title={link.name}>
                  <span className="sr-only">{link.name}</span>
                  {getSocialIcon(link.icon)}
                </a>
              ))}

              {/* Fallback social links if none configured */}
              {socialLinks.length === 0 && (
                <>
                  <a href="https://instagram.com/ul.co" target="_blank" rel="noopener noreferrer" className="text-red-100 hover:text-white transition-colors">
                    <span className="sr-only">Instagram</span>
                    {getSocialIcon("instagram")}
                  </a>
                  <a href="https://facebook.com/ulco" target="_blank" rel="noopener noreferrer" className="text-red-100 hover:text-white transition-colors">
                    <span className="sr-only">Facebook</span>
                    {getSocialIcon("facebook")}
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-red-800 mt-8 pt-8 text-center">
          <p className="text-sm text-red-200">© 2024 UL.CO. All rights reserved. | Designed by Taruli Pasaribu</p>
        </div>
      </div>
    </footer>
  );
}
