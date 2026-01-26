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

  // Desktop: hover, Mobile: click/tap
  const triggerProps = mobile
    ? {
        onClick: () => setIsOpen((v) => !v),
        'aria-expanded': isOpen,
        'aria-haspopup': true,
        className: 'nav-link text-sm uppercase tracking-wider font-medium px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400',
      }
    : {
        onMouseEnter: () => setIsOpen(true),
        onMouseLeave: () => setIsOpen(false),
        className: 'nav-link text-sm uppercase tracking-wider font-medium px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400',
      };

  return (
    <div className="relative" {...triggerProps}>
      <NavLink
        to="/destinations"
        className={({ isActive }) =>
          `nav-link text-sm uppercase tracking-wider font-medium px-3 py-2 rounded transition-all duration-200
          ${isActive
            ? 'text-red-600 bg-red-50 font-bold underline underline-offset-4'
            : 'text-[#0f4c5c] hover:text-red-600 hover:bg-red-50/20'}
          focus:outline-none focus:ring-2 focus:ring-red-400`
        }
        aria-current={window.location.pathname.startsWith('/destinations') ? 'page' : undefined}
      >
        Destinations
      </NavLink>
      {isOpen && (
        <div
          className={`absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-red-100 z-50 py-2 ${mobile ? 'fixed top-16 left-0 w-full' : ''}`}
          role="menu"
        >
          <button
            onClick={() => handleCategoryClick('local')}
            className="w-full text-left px-4 py-3 text-red-600 font-semibold hover:bg-red-50 transition-colors duration-200 text-sm"
            role="menuitem"
          >
            Nepal
          </button>
          <button
            onClick={() => handleCategoryClick('international')}
            className="w-full text-left px-4 py-3 text-red-600 font-semibold hover:bg-red-50 transition-colors duration-200 text-sm"
            role="menuitem"
          >
            International
          </button>
          <button
            onClick={() => handleCategoryClick('combo')}
            className="w-full text-left px-4 py-3 text-red-600 font-semibold hover:bg-red-50 transition-colors duration-200 text-sm"
            role="menuitem"
          >
            Combo Countries
          </button>
        </div>
      )}
    </div>
  );
}

