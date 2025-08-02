// START OF CODE FOR src/app/Components/SecondaryNav/SecondaryNav.jsx
"use client"; // CRITICAL: This must be the very first line of the file.
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link'; // Import Link for navigation

const SecondaryNav = () => {
  const [showDashboardDropdown, setShowDashboardDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const dashboardButtonRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        dashboardButtonRef.current &&
        !dashboardButtonRef.current.contains(event.target)
      ) {
        setShowDashboardDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // SVG for a simple down arrow icon
  const ArrowDownIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="ml-2 w-5 h-5 inline-block"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );

  // Dropdown items data - UPDATED HREFS FOR SCROLLING
  const dropdownItems = {
    Dashboard: [
      { label: 'Site Location', href: '/#site-location', iconClass: 'location_on' }, // Changed href
      { label: 'Vegetation Analysis', href: '/#vegetation-analysis', iconClass: 'forest' }, // Changed href
      { label: 'Climate Conditions', href: '/#climate-conditions', iconClass: 'cloud' }, // Changed href
      { label: 'Interactive Map', href: '/map', iconClass: 'map' },
    ],
  };

  return (
    <nav className="w-full bg-[#4C2C2C] text-white py-3 border-t border-white border-opacity-30 shadow-lg relative z-20">
      <div className="container mx-auto flex justify-start items-center px-6" style={{ gap: '20px' }}>
        {/* Dashboard button with dropdown */}
        <div className="relative">
          <button
            ref={dashboardButtonRef}
            onClick={() => setShowDashboardDropdown(!showDashboardDropdown)}
            className="font-normal text-lg text-white font-geist flex items-center hover:text-gray-300 transition-colors duration-200 focus:outline-none"
          >
            DASHBOARD
            <ArrowDownIcon />
          </button>

          {/* Dropdown Panel */}
          {showDashboardDropdown && (
            <>
              {/* Overlay to dim background content */}
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-20"
                onClick={() => setShowDashboardDropdown(false)}
              ></div>
              <div
                ref={dropdownRef}
                className="absolute bottom-0 left-0 mb-3 w-[450px] bg-white rounded-lg shadow-xl p-6 z-30 font-poppins text-gray-800 flex justify-between"
              >
                {Object.entries(dropdownItems).map(([category, items]) => (
                  <div key={category} className="flex flex-col space-y-2 mr-4">
                    <h4 className="text-sm font-bold uppercase text-gray-500 mb-2">{category}</h4>
                    {items.map(item => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setShowDashboardDropdown(false)}
                        className="flex items-center text-base hover:text-gray-900 transition-colors duration-200 whitespace-nowrap"
                      >
                        <span className="material-symbols-outlined mr-2 text-xl">
                          {item.iconClass}
                        </span>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Other Secondary Nav links - MODIFIED COLORS */}
        <a
          
          // Changed hover:text-yellow-300 to ensure text remains white on hover
          className="font-normal text-lg text-white font-geist flex items-center hover:bg-white hover:bg-opacity-20 rounded px-2 py-1 transition-all duration-200"
        >
          SOURCES
          <ArrowDownIcon />
        </a>
        <a
          
          // Changed hover:text-yellow-300 to ensure text remains white on hover
          className="font-normal text-lg text-white font-geist flex items-center hover:bg-white hover:bg-opacity-20 rounded px-2 py-1 transition-all duration-200"
        >
        
          FEEDBACK
          <ArrowDownIcon />
        </a>
      </div>
    </nav>
  );
};

export default SecondaryNav;
// END OF CODE FOR src/app/Components/SecondaryNav/SecondaryNav.jsx
