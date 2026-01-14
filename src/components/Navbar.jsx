import { NavLink } from 'react-router-dom';
import useMobileMenu from '../hooks/useMobileMenu';
import LINKS_STATIC from '../hooks/navLinks';
import DestinationsDropdown from './DestinationsDropdown';
import logoImage from '../assets/sasa_logo.png';
import { CONTACT_PHONES } from '../constants';

export default function Navbar() {
  const { open, toggle, close } = useMobileMenu(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-gradient-to-r from-purple-700 via-blue-600 to-indigo-800 text-white shadow-xl">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6 py-4 md:py-5 min-h-[80px]">
        <NavLink to="/" className="flex items-center gap-1" aria-label="Sasa Travel home">
          <img src={logoImage} alt="Sasa Travel" className="h-16 w-auto md:h-20 w-auto" />
        </NavLink>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS_STATIC.map((l) => {
            // Use custom dropdown for Destinations
            if (l.key === 'destinations') {
              return <DestinationsDropdown key={l.key} />;
            }

            return (
              <NavLink
                key={l.key}
                to={l.to}
                end={l.to === '/'}
                onClick={close}
                className={({ isActive }) =>
                  `relative text-sm uppercase tracking-wider font-medium transition-all duration-300 hover:text-indigo-400 ${
                    isActive
                      ? 'text-indigo-400 font-bold'
                      : 'text-white hover:text-indigo-300'
                  } before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-indigo-400 before:transition-all before:duration-300 hover:before:w-full`
                }
              >
                {l.label}
              </NavLink>
            );
          })}
        </nav>

        <a
          href={CONTACT_PHONES.WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 text-white hover:text-green-400 transition-colors duration-300"
          aria-label="Contact us on WhatsApp"
        >
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
          <span className="text-sm font-medium">Enquiry</span>
        </a>

        <button
          onClick={toggle}
          className="md:hidden p-2 rounded-md text-white hover:bg-white hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
        >
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gray-900 border-t border-gray-800 transition-all duration-300 ease-in-out ${
          open
            ? 'max-h-96 opacity-100'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <nav className="container mx-auto px-4 py-4">
          <ul className="space-y-4">
            {LINKS_STATIC.map((l) => {
              // Use custom dropdown for Destinations
              if (l.key === 'destinations') {
                return <DestinationsDropdown key={l.key} />;
              }

              return (
                <li key={l.key}>
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    onClick={close}
                    className={({ isActive }) =>
                      `block py-2 px-3 rounded-md text-base font-medium transition-all duration-200 ${
                        isActive
                          ? 'text-indigo-400 bg-indigo-900/20'
                          : 'text-white hover:text-indigo-300 hover:bg-purple-800/50'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
