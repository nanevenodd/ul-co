import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#921e27] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-white">
              UL.CO
            </h3>
            <p className="text-red-100 mb-4">Fashion berbasis kain ulos dengan desain modern dan berkelanjutan. Setiap karya adalah cerita, setiap desain adalah warisan.</p>
            <p className="text-sm text-red-200">Designer: Taruli Pasaribu</p>
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
              <li>hello@ulco.com</li>
              <li>+62 123 4567 890</li>
              <li>Jakarta, Indonesia</li>
            </ul>
            <div className="mt-4 flex space-x-4">
              <a href="https://instagram.com/ul.co" target="_blank" rel="noopener noreferrer" className="text-red-100 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.987 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.23 16.72c-2.086 0-3.78-1.693-3.78-3.78s1.693-3.78 3.78-3.78 3.78 1.693 3.78 3.78-1.693 3.78-3.78 3.78zm7.554 0c-2.086 0-3.78-1.693-3.78-3.78s1.693-3.78 3.78-3.78 3.78 1.693 3.78 3.78-1.693 3.78-3.78 3.78z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="https://facebook.com/ulco" target="_blank" rel="noopener noreferrer" className="text-red-100 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
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
