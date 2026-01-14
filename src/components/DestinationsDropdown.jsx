import { useMemo, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { destinations } from '../data/destinations.js';
import useDropdownHover from '../hooks/useDropdownHover';
import { TIMINGS } from '../constants';

export default function DestinationsDropdown() {
  const navigate = useNavigate();
  const { isOpen, handleMouseEnter, handleMouseLeave, close } = useDropdownHover(TIMINGS.DROPDOWN_HOVER_DELAY);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileDropdown = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileDropdown = () => {
    setIsMobileOpen(false);
  };

  const localDestinations = useMemo(
    () => destinations.filter(d => d.category === 'local').slice(0, 5),
    []
  );

  const internationalDestinations = useMemo(
    () => destinations.filter(d => d.category === 'international'),
    []
  );

  const internationalDestinationsFirstHalf = useMemo(
    () => internationalDestinations.slice(0, Math.ceil(internationalDestinations.length / 2)),
    [internationalDestinations]
  );

  const internationalDestinationsSecondHalf = useMemo(
    () => internationalDestinations.slice(Math.ceil(internationalDestinations.length / 2)),
    [internationalDestinations]
  );

  const handleDestinationClick = (destId, category) => {
    close();
    closeMobileDropdown();
    navigate(`/destinations/${category}/${destId}`);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={toggleMobileDropdown}
        className="md:hidden nav-link text-sm uppercase tracking-wider transition-colors text-white hover:text-indigo-300"
        aria-expanded={isMobileOpen}
        aria-haspopup="true"
      >
        Destinations
      </button>
      <NavLink
        to="/destinations"
        className={({ isActive }) =>
          `hidden md:block nav-link text-sm uppercase tracking-wider transition-colors ${
            isActive
              ? 'text-indigo-400 font-bold'
              : 'text-white hover:text-indigo-300'
          }`
        }
      >
        Destinations
      </NavLink>

      {(isOpen || isMobileOpen) && (
        <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-full mt-2 w-full md:w-[480px] bg-white text-gray-900 shadow-2xl rounded-lg overflow-hidden z-[100] border border-gray-200 font-['Inter','Poppins',sans-serif]">
          <div className="grid grid-cols-2 divide-x divide-gray-200">
            {/* Local Section */}
            <div className="p-6">
              <Link
                to="/destinations"
                onClick={close}
                className="text-sm font-bold text-[#E76F51] uppercase tracking-wider mb-4 px-2 block hover:text-[#2A9D8F] transition-colors duration-300"
              >
                NEPAL
              </Link>
              <ul className="space-y-3">
                {localDestinations.map(dest => (
                  <li key={dest.id}>
                    <button
                      onClick={() => handleDestinationClick(dest.id, 'local')}
                      className="group w-full text-left px-3 py-4 text-base text-gray-700 hover:text-[#2A9D8F] hover:font-medium rounded-md transition-all duration-300 relative overflow-hidden"
                    >
                      <span className="relative z-10">{dest.name}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2A9D8F] group-hover:w-full transition-all duration-300 ease-out"></span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* International Section */}
            <div className="p-6">
              <Link
                to="/destinations"
                onClick={close}
                className="text-sm font-bold text-[#E76F51] uppercase tracking-wider mb-4 px-2 block hover:text-[#2A9D8F] transition-colors duration-300"
              >
                INTERNATIONAL
              </Link>
              <div className="grid grid-cols-2 gap-4">
                <ul className="space-y-3">
                  {internationalDestinationsFirstHalf.map(dest => (
                    <li key={dest.id}>
                      <button
                        onClick={() => handleDestinationClick(dest.id, 'international')}
                        className="group w-full text-left px-3 py-3 text-sm text-gray-700 hover:text-[#2A9D8F] hover:font-medium rounded-md transition-all duration-300 relative overflow-hidden"
                      >
                        <span className="relative z-10">{dest.name}</span>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2A9D8F] group-hover:w-full transition-all duration-300 ease-out"></span>
                      </button>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-3">
                  {internationalDestinationsSecondHalf.map(dest => (
                    <li key={dest.id}>
                      <button
                        onClick={() => handleDestinationClick(dest.id, 'international')}
                        className="group w-full text-left px-3 py-3 text-sm text-gray-700 hover:text-[#2A9D8F] hover:font-medium rounded-md transition-all duration-300 relative overflow-hidden"
                      >
                        <span className="relative z-10">{dest.name}</span>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2A9D8F] group-hover:w-full transition-all duration-300 ease-out"></span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
