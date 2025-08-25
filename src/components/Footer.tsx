// Footer.tsx
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import type { IconType } from "react-icons";

// --- Data Dipisahkan dari Tampilan ---

// Tipe untuk link navigasi
type NavLink = {
  href: string;
  label: string;
};

// Tipe untuk link sosial media
type SocialLink = {
  href: string;
  label: string;
  Icon: IconType;
};

const navLinks: NavLink[] = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

const socialLinks: SocialLink[] = [
  { href: "https://twitter.com", label: "Twitter", Icon: FaTwitter },
  { href: "https://instagram.com/ul.co_tarulipasaribu/", label: "Instagram", Icon: FaInstagram },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: FaLinkedin },
];

// --- Komponen Utama ---

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#921e27] to-[#6d141b] text-white">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* 1. Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold tracking-wider">UL.CO</h3>
            <p className="text-sm text-white/70 mt-2">&copy; {new Date().getFullYear()} All Rights Reserved.</p>
          </div>

          {/* 2. Navigasi */}
          <nav className="flex justify-center items-center">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              {navLinks.map(({ href, label }) => (
                <li key={label}>
                  <a href={href} className="hover:text-white transition-colors duration-300 text-white/80">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* 3. Sosial Media */}
          <div className="flex justify-center md:justify-end items-center space-x-4">
            {socialLinks.map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="group bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all duration-300">
                <Icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>
        </div>

        {/* Garis Pemisah */}
        <hr className="my-8 border-white/20" />

        {/* Teks Bawah */}
        <div className="text-center text-sm text-white/70">
          Built with <span className="animate-pulse text-[#ff8a99]">❤️</span> by UL.CO
        </div>
      </div>
    </footer>
  );
};

export default Footer;
