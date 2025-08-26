"use client";

import { FaTwitter, FaInstagram, FaLinkedin, FaFacebook, FaTiktok, FaYoutube, FaWhatsapp, FaEnvelope, FaTelegram, FaPinterest, FaSnapchat, FaDiscord } from "react-icons/fa";
import type { IconType } from "react-icons";
import { useState, useEffect } from "react";

// Interface untuk footer data
interface FooterData {
  brandDescription: string;
  copyright: string;
  bottomText: string;
  socialLinks: Array<{
    platform: string;
    url: string;
    icon: string;
    displayName?: string;
  }>;
  navigation: Array<{
    label: string;
    href: string;
  }>;
}

// Mapping ikon berdasarkan platform name
const getIconByPlatform = (platform: string): IconType => {
  const platformLower = platform.toLowerCase();

  switch (platformLower) {
    case "instagram":
      return FaInstagram;
    case "whatsapp":
      return FaWhatsapp;
    case "facebook":
      return FaFacebook;
    case "twitter":
    case "x":
      return FaTwitter;
    case "linkedin":
      return FaLinkedin;
    case "youtube":
      return FaYoutube;
    case "tiktok":
      return FaTiktok;
    case "email":
    case "mail":
      return FaEnvelope;
    case "telegram":
      return FaTelegram;
    case "pinterest":
      return FaPinterest;
    case "snapchat":
      return FaSnapchat;
    case "discord":
      return FaDiscord;
    default:
      return FaInstagram; // fallback
  }
};

const Footer = () => {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchFooterData = async () => {
    try {
      const response = await fetch("/api/footer", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setFooterData(data);
      } else {
        console.error("Failed to fetch footer data");
      }
    } catch (error) {
      console.error("Error fetching footer data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFooterData();

    // Listen for custom event from admin panel
    const handleFooterUpdate = () => {
      fetchFooterData();
    };

    window.addEventListener("footerUpdated", handleFooterUpdate);

    return () => {
      window.removeEventListener("footerUpdated", handleFooterUpdate);
    };
  }, []);

  if (loading) {
    return (
      <footer className="bg-gradient-to-r from-[#921e27] to-[#6d141b] text-white">
        <div className="container mx-auto px-6 py-10">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-4 bg-white/20 rounded w-48 mx-auto mb-2"></div>
              <div className="h-3 bg-white/20 rounded w-32 mx-auto"></div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  if (!footerData) {
    return (
      <footer className="bg-gradient-to-r from-[#921e27] to-[#6d141b] text-white">
        <div className="container mx-auto px-6 py-10">
          <div className="text-center text-white/70">Error loading footer data</div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gradient-to-r from-[#921e27] to-[#6d141b] text-white">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* 1. Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold tracking-wider">UL.CO</h3>
            <p className="text-sm text-white/80 mt-2 leading-relaxed">{footerData.brandDescription}</p>
            <p className="text-sm text-white/70 mt-2">{footerData.copyright}</p>
          </div>

          {/* 2. Navigasi */}
          <nav className="flex justify-center items-center">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              {footerData.navigation.map((navItem, index) => (
                <li key={index}>
                  <a href={navItem.href} className="hover:text-white transition-colors duration-300 text-white/80">
                    {navItem.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* 3. Sosial Media */}
          <div className="flex justify-center md:justify-end items-center space-x-4">
            {footerData.socialLinks
              .filter((socialItem) => {
                // Filter out entries with empty or invalid data
                const hasValidPlatform = socialItem.platform && socialItem.platform.trim() !== "";
                const hasValidUrl = socialItem.url && socialItem.url.trim() !== "";

                // Additional check: if URL is valid format
                const isValidUrl = hasValidUrl && (socialItem.url.startsWith("http://") || socialItem.url.startsWith("https://") || socialItem.url.startsWith("mailto:") || socialItem.url.startsWith("tel:"));

                return hasValidPlatform && isValidUrl;
              })
              .map((socialItem, index) => {
                const IconComponent = getIconByPlatform(socialItem.platform);
                return (
                  <a key={index} href={socialItem.url} target="_blank" rel="noopener noreferrer" aria-label={socialItem.platform} className="group bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all duration-300">
                    <IconComponent className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
          </div>
        </div>

        {/* Garis Pemisah */}
        <hr className="my-8 border-white/20" />

        {/* Teks Bawah */}
        <div className="text-center text-sm text-white/70">{footerData.bottomText}</div>
      </div>
    </footer>
  );
};

export default Footer;
