// START OF CODE FOR src/app/report/page.jsx
"use client"; // This page needs client-side interactivity to use hooks like useSearchParams
import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import Link from 'next/link';
// NEW IMPORT: useSearchParams hook from Next.js navigation
import { useSearchParams } from 'next/navigation';
// NEW IMPORT: Filter options from the utility file
import { FILTER_OPTIONS } from '../../utils/filters';

// Report Content Component - MODIFIED
const ReportContent = () => {
  // NEW: Hook to get URL search parameters
  const searchParams = useSearchParams();
  // NEW STATE: To hold the filter objects that will be displayed
  const [displayedFeatures, setDisplayedFeatures] = useState([]);

  // NEW EFFECT: To parse URL parameters and update displayed features
  useEffect(() => {
    const filtersParam = searchParams.get('filters'); // Get the 'filters' parameter from URL
    if (filtersParam) {
      const selectedIds = filtersParam.split(','); // Split comma-separated IDs
      // Filter FILTER_OPTIONS to get the full feature objects based on selected IDs
      const featuresToDisplay = FILTER_OPTIONS.filter(option => selectedIds.includes(option.id));
      setDisplayedFeatures(featuresToDisplay);
    } else {
      setDisplayedFeatures([]); // If no filters are selected, display empty or a message
    }
  }, [searchParams]); // Dependency array: re-run this effect when searchParams change

  return (
    <div className="container mx-auto p-8 mt-4">
      <h1 className="text-4xl font-semibold font-geist text-black mb-6">Map of Planning Data for Bengaluru</h1>
      
      <div className="w-full h-[500px] bg-gray-300 border border-gray-400 rounded-lg overflow-hidden shadow-lg flex items-center justify-center mb-4">
        <img
          className="w-full h-full object-cover"
          alt="Map of Bengaluru"
          src="https://placehold.co/1200x500/E0E0E0/333333?text=Interactive+Map+Placeholder"
        />
      </div>
      
      <p className="text-lg font-normal font-poppins text-[#4E4E4E] text-center mt-4 mb-12">
        click here to download an overall report of the site with the following selected features
      </p>

      {/* Features Selected Section - MODIFIED */}
      <div className="mb-12">
        <h2 className="text-3xl font-semibold font-geist text-black mb-4">-Features Selected-</h2>
        <div className="space-y-3">
          {/* CONDITIONAL RENDERING: Display features only if displayedFeatures has items */}
          {displayedFeatures.length > 0 ? (
            displayedFeatures.map(feature => (
              <div key={feature.id} className="flex items-center text-xl font-poppins text-gray-700">
                <span className="material-symbols-outlined mr-2 text-2xl">
                  {feature.iconClass}
                </span>
                {feature.label}
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-[#4C2C2C] rounded border-gray-300 focus:ring-[#4C2C2C] ml-auto"
                  checked // Display as checked since they are 'selected'
                  readOnly // Make it read-only for display
                />
              </div>
            ))
          ) : (
            // NEW: Message if no features are selected
            <p className="text-lg font-normal font-poppins text-gray-500 text-center">No features selected for report.</p>
          )}
        </div>
        <Link href="/map" className="block text-lg font-normal font-poppins text-[#4E4E4E] text-center mt-8 cursor-pointer hover:underline">
          click here to add more features
        </Link>
      </div>
    </div>
  );
};


export default function ReportPage() {
  return (
    <div className="min-h-screen bg-white font-poppins antialiased">
      <Navbar />
      <ReportContent />
      <Footer />
    </div>
  );
}
// END OF CODE FOR src/app/report/page.jsx
