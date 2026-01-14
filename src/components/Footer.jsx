import { Link } from "react-router-dom";
import useFooterAnimation from "../hooks/useFooterAnimation";
import logoImage from "../assets/sasa_logo.png";
import { CONTACT_PHONES, CONTACT_EMAILS } from "../constants";
import { getCurrentYear } from "../utils/dateUtils";
import { getIcon } from "../components/ui/Icons";

export default function Footer() {
  const currentYear = getCurrentYear();
  const { footerRef, isVisible } = useFooterAnimation();

  return (
    <footer 
      ref={footerRef}
      className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 text-gray-300 pt-6 pb-3 relative overflow-hidden"
    >
      {/* Subtle decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Content - Logo Left, Sections Right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-4">
          {/* Logo and Tagline - Left Side */}
          <div className={`lg:col-span-1 flex flex-col items-center text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="mb-4">
              <img src={logoImage} alt="Sasa Travel Logo" className="w-15 h-15 mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 tracking-wide text-center">
              Sasa Travel
            </h3>
            <p className="text-gray-300 text-sm max-w-xs text-center leading-relaxed">
              Where every journey becomes a story.
            </p>
          </div>

          {/* Four Column Section - Right Side */}
          <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Contact */}
            <div className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Contact</h3>
              <ul className="space-y-2 text-xs">
              <li>
                <div className="flex items-start gap-3 group">
                  {getIcon('Mail', 'w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0')}
                  <div className="flex flex-col gap-1">
                    <a href={`mailto:${CONTACT_EMAILS.INFO}`} className="hover:text-indigo-400 transition-colors">{CONTACT_EMAILS.INFO}</a>
                    <a href={`mailto:${CONTACT_EMAILS.SUPPORT}`} className="hover:text-indigo-400 transition-colors">{CONTACT_EMAILS.SUPPORT}</a>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3 group">
                  {getIcon('Phone', 'w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0')}
                  <div className="flex flex-col gap-1">
                    <a href={`tel:${CONTACT_PHONES.PRIMARY}`} className="hover:text-indigo-400 transition-colors">{CONTACT_PHONES.PRIMARY}</a>
                    <a href={`tel:${CONTACT_PHONES.WHATSAPP}`} className="hover:text-indigo-400 transition-colors">{CONTACT_PHONES.WHATSAPP}</a>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3 group">
                  {getIcon('MapPin', 'w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0')}
                  <div className="leading-relaxed">
                    <p className="text-gray-400">Gyaneshwor-30, Kathmandu, Nepal</p>
                    <p className="text-gray-500 text-xs mt-1">[Gita Complex, 2nd Floor]</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

            {/* Quick Links */}
            <div className={`transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Quick Links</h3>
              <ul className="space-y-2 text-xs">
              <li>
                <Link to="/destinations" className="flex items-center gap-2 hover:text-indigo-400 transition-all group">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full group-hover:w-6 transition-all"></span>
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center gap-2 hover:text-indigo-400 transition-all group">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full group-hover:w-6 transition-all"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/packages" className="flex items-center gap-2 hover:text-indigo-400 transition-all group">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full group-hover:w-6 transition-all"></span>
                  International Packages
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center gap-2 hover:text-indigo-400 transition-all group">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full group-hover:w-6 transition-all"></span>
                  Subscription
                </Link>
              </li>
            </ul>
          </div>

            {/* Services */}
            <div className={`transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Services</h3>
              <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2 hover:text-indigo-400 transition-all cursor-pointer group">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover:w-6 transition-all"></span>
                Customized Tours
              </li>
              <li className="flex items-center gap-2 hover:text-indigo-400 transition-all cursor-pointer group">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover:w-6 transition-all"></span>
                Adventure Trekking
              </li>
              <li className="flex items-center gap-2 hover:text-indigo-400 transition-all cursor-pointer group">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover:w-6 transition-all"></span>
                Cultural Experiences
              </li>
              <li className="flex items-center gap-2 hover:text-indigo-400 transition-all cursor-pointer group">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover:w-6 transition-all"></span>
                Hotel Bookings
              </li>
            </ul>
          </div>

            {/* Connect */}
            <div className={`transition-all duration-1000 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Connect</h3>
              <p className="text-xs mb-3 text-gray-400 leading-relaxed">Join our community for insights</p>
            <div className="flex gap-2">
              <a href="#" className="w-9 h-9 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/50 group">
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-9 h-9 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/50 group">
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-9 h-9 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/50 group">
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Very Compact */}
        <div className={`border-t border-gray-800 pt-2 mt-3 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="text-center text-xs text-gray-500">
            <p>© {currentYear} Sasa Travel. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

