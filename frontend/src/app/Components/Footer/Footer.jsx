// START OF CODE FOR src/app/Components/Footer/Footer.jsx
"use client"; // Added for client-side rendering compatibility
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#4C2C2CB5] text-white pt-8 pb-16 mt-16 relative">
      <img
        className="absolute top-0 left-0 w-full h-px"
        alt="Line"
        src="/line-2.svg" // Assuming line-2.svg is in public folder
      />
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
        {/* Column 1 */}
        <div className="flex flex-col space-y-3">
          <a href="#" className="text-2xl font-normal font-poppins text-black hover:text-gray-700">Dashboard</a>
          <a href="#" className="text-2xl font-normal font-poppins text-black hover:text-gray-700">Sources</a>
          <a href="#" className="text-2xl font-normal font-poppins text-black hover:text-gray-700">Feedback</a>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col space-y-3">
          <a href="#" className="text-2xl font-normal font-poppins text-black hover:text-gray-700">About</a>
          <a href="#" className="text-2xl font-normal font-poppins text-black hover:text-gray-700">Contact</a>
          <a href="#" className="text-2xl font-normal font-poppins text-black hover:text-gray-700">Terms And Conditions</a>
        </div>

        {/* Column 3 - Removed circular logo and copyright text */}
        <div className="flex justify-end items-end relative">
          {/* Removed the <p> tag containing copyright */}
          {/* Removed the <div> for the circular logo */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
// END OF CODE FOR src/app/Components/Footer/Footer.jsx
