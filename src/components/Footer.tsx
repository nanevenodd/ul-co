// Footer.tsx
import { FaTwitter, FaInstagram, FaLinkedin, FaFacebook, FaTiktok, FaYoutube } from "react-icons/fa";
import type { IconType } from "react-icons";
import { readFileSync } from 'fs';
import { join } from 'path';

// --- Data Dipisahkan dari Tampilan ---

// Tipe untuk link navigasi
// type NavLink = {
//   href: string;
//   label: string;
// };

// Tipe untuk link sosial media
// type SocialLink = {
//   href: string;
//   platform: string;
//   icon: string;
// };

// Mapping ikon
const iconMap: Record<string, IconType> = {
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaTiktok,
  FaYoutube,
};

// Fungsi untuk mendapatkan content dari file JSON
async function getContent() {
  try {
    const contentPath = join(process.cwd(), 'src/data/content.json');
    const content = readFileSync(contentPath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error loading content:', error);
    // Fallback content
    return {
      footer: {
        brandDescription: "UL.CO - Fashion Brand by Taruli Pasaribu",
        copyright: `© ${new Date().getFullYear()} All Rights Reserved.`,
        bottomText: "Built with ❤️ by UL.CO",
        socialLinks: [
          { platform: "Instagram", url: "https://instagram.com/ul.co_tarulipasaribu/", icon: "FaInstagram" }
        ],
        navigation: [
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Portfolio", href: "/portfolio" },
          { label: "Contact", href: "/contact" }
        ]
      }
    };
  }
}

// --- Komponen Utama ---

const Footer = async () => {
  const content = await getContent();
  return (
    <footer className="bg-gradient-to-r from-[#921e27] to-[#6d141b] text-white">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* 1. Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold tracking-wider">UL.CO</h3>
            <p className="text-sm text-white/80 mt-2 leading-relaxed">{content.footer.brandDescription}</p>
            <p className="text-sm text-white/70 mt-2">{content.footer.copyright}</p>
          </div>

          {/* 2. Navigasi */}
          <nav className="flex justify-center items-center">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              {content.footer.navigation.map((navItem: { href: string; label: string }, index: number) => (
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
            {content.footer.socialLinks.map((socialItem: { platform: string; url: string; icon: string }, index: number) => {
              const IconComponent = iconMap[socialItem.icon] || FaInstagram;
              return (
                <a 
                  key={index} 
                  href={socialItem.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={socialItem.platform} 
                  className="group bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all duration-300"
                >
                  <IconComponent className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Garis Pemisah */}
        <hr className="my-8 border-white/20" />

        {/* Teks Bawah */}
        <div className="text-center text-sm text-white/70">
          {content.footer.bottomText}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
