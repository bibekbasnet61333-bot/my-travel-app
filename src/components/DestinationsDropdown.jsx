import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function DestinationsDropdown({ mobile = false, closeMenu }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryClick = (category) => {
    setIsOpen(false);
    if (closeMenu) closeMenu();
    navigate(`/destinations?category=${category}`);
  };

  if (mobile) {
    // Accordion-style expansion for mobile
    return (
      <>
        <li>
          <button
            className="w-full flex items-center justify-between text-sm uppercase tracking-wider font-medium px-3 py-2 text-[#0f4c5c] focus:outline-none"
            aria-expanded={isOpen}
            aria-controls="destinations-mobile-submenu"
            onClick={() => setIsOpen((v) => !v)}
            type="button"
          >
            Destinations
            <span className={`ml-2 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}>▶</span>
          </button>
        </li>
        {isOpen && (
          <li id="destinations-mobile-submenu">
            <ul className="pl-6 py-1 space-y-1">
              <li>
                <button
                  onClick={() => handleCategoryClick('local')}
                  className="w-full text-left px-4 py-2 text-amber-700 font-semibold hover:bg-amber-50 rounded transition-colors duration-200 text-sm"
                  role="menuitem"
                >
                  Nepal
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('international')}
                  className="w-full text-left px-4 py-2 text-amber-700 font-semibold hover:bg-amber-50 rounded transition-colors duration-200 text-sm"
                  role="menuitem"
                >
                  International
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('combo')}
                  className="w-full text-left px-4 py-2 text-amber-700 font-semibold hover:bg-amber-50 rounded transition-colors duration-200 text-sm"
                  role="menuitem"
                >
                  Combo Countries
                </button>
              </li>
            </ul>
          </li>
        )}
      </>
    );
  }

  // Desktop dropdown
  const triggerProps = {
    onMouseEnter: () => setIsOpen(true),
    onMouseLeave: () => setIsOpen(false),
    className: 'nav-link text-sm uppercase tracking-wider font-medium px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400',
  };

  return (
    <div className="relative z-40" {...triggerProps}>
      <NavLink
        to="/destinations"
        className={({ isActive }) =>
          `nav-link text-sm uppercase tracking-wider font-medium px-3 py-2 rounded transition-all duration-200
          ${isActive
            ? 'text-amber-700 bg-amber-200 font-bold underline underline-offset-4'
            : 'text-[#0f4c5c] hover:text-amber-700 hover:bg-amber-100'}
          focus:outline-none focus:ring-2 focus:ring-amber-400`
        }
        aria-current={window.location.pathname.startsWith('/destinations') ? 'page' : undefined}
      >
        Destinations
      </NavLink>
      {isOpen && (
        <div
          className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-amber-100 z-50 py-2"
          role="menu"
        >
          <button
            onClick={() => handleCategoryClick('local')}
            className="w-full text-left px-4 py-3 text-amber-700 font-semibold hover:bg-amber-50 transition-colors duration-200 text-sm"
            role="menuitem"
          >
            Nepal
          </button>
          <button
            onClick={() => handleCategoryClick('international')}
            className="w-full text-left px-4 py-3 text-amber-700 font-semibold hover:bg-amber-50 transition-colors duration-200 text-sm"
            role="menuitem"
          >
            International
          </button>
          <button
            onClick={() => handleCategoryClick('combo')}
            className="w-full text-left px-4 py-3 text-amber-700 font-semibold hover:bg-amber-50 transition-colors duration-200 text-sm"
            role="menuitem"
          >
            Combo Countries
          </button>
        </div>
      )}
    </div>
  );
}

