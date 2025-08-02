// START OF CODE FOR src/app/map/page.jsx
"use client"; // This page needs client-side interactivity for hover state and filters
import React, { useState, useRef, useEffect } from 'react'; // Import useRef and useEffect
import Navbar from '../Components/Navbar/Navbar'; // Adjust path if needed
import Footer from '../Components/Footer/Footer'; // Adjust path if needed
import Link from 'next/link'; // Import Link for navigation
import { FILTER_OPTIONS } from '../../utils/filters'; // Import filter options

// Filter Panel Component
const FilterPanel = ({ isVisible, setShowFilters }) => {
  // Ref for detecting clicks outside the panel
  const panelRef = useRef(null);

  // Effect to add and remove click listener for closing the panel
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the click is outside the panel, close it
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };

    // Add event listener when component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowFilters]); // Re-run effect if setShowFilters changes (though it's stable)

  // Filter options with Google Material Symbols icons
  // IMPORTANT: To display these icons, you need to link the Material Symbols stylesheet
  // in your globals.css or layout.js, e.g.:
  // <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
  // And apply the 'material-symbols-outlined' class where the icon is used.
  const filterOptions = [
    { id: 'agricultural', label: 'Agricultural Land', iconClass: 'agriculture' },
    { id: 'forest', label: 'Forest', iconClass: 'forest' },
    { id: 'urban', label: 'Urban', iconClass: 'location_city' },
    { id: 'boundaries', label: 'Boundaries', iconClass: 'polyline' }, // Closest for boundaries
    { id: 'waterbodies', label: 'Water Bodies', iconClass: 'water' },
    { id: 'wind', label: 'Wind', iconClass: 'air' },
    { id: 'temperature', label: 'Temperature', iconClass: 'thermostat' },
    { id: 'humidity', label: 'Humidity', iconClass: 'humidity_mid' },
    { id: 'rainfall', label: 'Rainfall', iconClass: 'rainy' },
    { id: 'elevation', label: 'Elevation', iconClass: 'landscape' }, // Closest for elevation
    { id: 'slope', label: 'Slope', iconClass: 'trending_up' }, // Closest for slope
  ];

  return (
    // Shifted left-0 to left-auto and added ml-16 (64px margin-left) to move it right of the button
    // Added ref to the panel div
    // CRITICAL FIX: Conditionally apply 'hidden' class instead of returning null
    <div ref={panelRef} className={`absolute right-0 top-1/2 -translate-y-1/2 ml-16 w-[300px] bg-white rounded-lg shadow-xl p-6 z-20 font-poppins ${isVisible ? '' : 'hidden'}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold font-geist text-gray-800">Filters</h3>
        <button
          className="px-4 py-2 bg-[#4C2C2C] text-white rounded-md hover:bg-[#6A4747] transition-colors duration-200 font-poppins text-sm"
          onClick={() => setShowFilters(false)} // Close panel on Apply click
        >
          Apply
        </button>
      </div>
      <div className="space-y-3">
        {filterOptions.map(option => (
          <div key={option.id} className="flex items-center justify-between">
            <label htmlFor={option.id} className="flex items-center text-lg text-gray-700 cursor-pointer">
              {/* Re-added Google Material Symbols icon span */}
              <span className="material-symbols-outlined mr-2 text-xl">
                {option.iconClass}
              </span>
              <span className="flex-grow">{option.label}</span> {/* Added flex-grow to label */}
            </label>
            <input
              type="checkbox"
              id={option.id}
              className="form-checkbox h-5 w-5 text-[#4C2C2C] rounded border-gray-300 focus:ring-[#4C2C2C]"
              defaultChecked={false} // Set to false to keep all unchecked by default
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Map Content Component (now includes the Filters button and panel)
const MapContent = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="container mx-auto p-8 mt-4 relative"> {/* Added relative for absolute positioning of filters */}
      <h1 className="text-4xl font-semibold font-geist text-black mb-6">Map of Planning Data for Bengaluru</h1>
      
      {/* Map Placeholder - Changed background color to bg-gray-300 */}
      <div className="w-full h-[500px] bg-gray-300 border border-gray-400 rounded-lg overflow-hidden shadow-lg flex items-center justify-center mb-4">
        <img
          className="w-full h-full object-cover"
          alt="Map of Bengaluru"
          src="https://placehold.co/1200x500/E0E0E0/333333?text=Interactive+Map+Placeholder" // Placeholder for your map image
        />
      </div>
      
      {/* Filters Button */}
      {/* Added conditional 'hidden' class based on showFilters state */}
      <div
        className={`absolute right-8 top-1/2 -translate-y-1/2 z-10 ${showFilters ? 'hidden' : ''}`} // Hide button when filters are shown
        onClick={() => setShowFilters(!showFilters)} // Toggles visibility on click
      >
        {/* Adjusted button styling to match the small, dark brown circle from the image */}
        <button className="w-10 h-10 bg-[#4C2C2C] rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:bg-[#6A4747] transition-colors duration-200">
          {/* Filter Icon - using SVG for consistency */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20" // Reduced size of icon
            height="20" // Reduced size of icon
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-filter text-white" // Ensure icon color is white
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
        </button>
      </div>
      {/* Filter Panel - Always rendered, but its visibility is controlled by FilterPanel component */}
      {/* Pass setShowFilters to FilterPanel */}
      <FilterPanel isVisible={showFilters} setShowFilters={setShowFilters} />

      <p className="text-lg font-normal font-poppins text-[#4E4E4E] text-center mt-4" style={{ marginBottom: '150px' }}> {/* Added 100px margin-bottom */}
        {/* Changed to a Next.js Link component */}
        <Link href="/report" className="hover:underline">
          click here to generate report ONLY on selected filters
        </Link>
      </p>
    </div>
  );
};


export default function MapPage() {
  return (
    <div className="min-h-screen bg-white font-poppins antialiased">
      <Navbar />
      <MapContent />
      <Footer />
    </div>
  );
}
// END OF CODE FOR src/app/map/page.jsx
