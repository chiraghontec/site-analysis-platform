// START OF CODE FOR src/app/Components/VegetationAnalysis/VegetationAnalysis.jsx
"use client"; // Added for client-side rendering compatibility
import React from 'react';

const VegetationAnalysis = () => {
  return (
    <div className="container mx-auto p-8 mt-16">
      <h2 className="text-5xl font-semibold font-geist text-black mb-6">Vegetation &amp; Terrain Analysis</h2>
      <p className="text-2xl font-normal font-poppins text-[#4E4E4E] mb-12 max-w-[654px]">
        Automatically retrieves vegetation, terrain slope, water bodies in and around your site.
      </p>

      <div className="w-full h-[500px] bg-gray-200 rounded-lg overflow-hidden shadow-lg flex items-center justify-center relative">
        {/* Background image for this section */}
        <img
          className="w-full h-full object-cover"
          alt="Vegetation Analysis Image"
          src="https://placehold.co/1293x500/D0D0D0/333333?text=Vegetation+Map+Placeholder" // Placeholder for image-3.png
        />
        <div className="absolute inset-0 bg-black opacity-30"></div> {/* Overlay for better text visibility */}

        {/* Retrieve Button */}
        {/* Adjusted positioning to bottom-right using absolute positioning and direct CSS */}
        <div style={{ position: 'absolute', bottom: '32px', right: '32px' }}> {/* Equivalent to Tailwind bottom-8 right-8 */}
          <button className="w-[212px] h-[68px] bg-[#653D3D] rounded-lg flex items-center justify-center shadow-md hover:bg-[#7A4D4D] transition-colors duration-200">
            <span className="text-xl font-light font-poppins text-white">Retrieve</span>
          </button>
        </div>
      </div>

      <p className="text-2xl font-normal font-poppins text-[#4E4E4E] text-center mt-8">
        click here to download vegetation and terrain report
      </p>
    </div>
  );
};

export default VegetationAnalysis;
// END OF CODE FOR src/app/Components/VegetationAnalysis/VegetationAnalysis.jsx
