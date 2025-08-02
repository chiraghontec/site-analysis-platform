"use client";

import React, { useState } from "react";

export default function LandingPage() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [kmlFile, setKmlFile] = useState(null);

  const footerLinks = [
    {
      section: [
        { title: "Dashboard", url: "#" },
        { title: "Sources", url: "#" },
        { title: "Feedback", url: "#" },
      ],
    },
    {
      section: [
        { title: "About", url: "#" },
        { title: "Contact", url: "#" },
        { title: "Terms And Conditions", url: "#" },
      ],
    },
  ];

  const handleFileUpload = () => {
    // File upload logic would go here
    console.log("File upload triggered");
  };

  const handleRetrieveData = (dataType) => {
    // Data retrieval logic would go here
    console.log(`Retrieving ${dataType} data`);
  };

  // Simple arrow down icon component
  const KeyboardArrowDown = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
    </svg>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Container for full responsive layout */}
      <div className="w-full max-w-none mx-auto">
        {/* Header/Navigation Bar */}
        <header className="w-full h-20 bg-[#4c2c2c] relative">
          <nav className="w-full h-full flex items-center justify-between px-4">
            {/* Logo section */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-[#fff8f8] rounded-full" />
              <h1 className="font-['Actor-Regular',Helvetica] font-normal text-white text-2xl lg:text-3xl whitespace-nowrap">
                Website name
              </h1>
            </div>

            {/* Center greeting */}
            <div className="hidden md:block font-['Poppins-Regular',Helvetica] font-normal text-white text-xl lg:text-2xl">
              Hi
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-4">
              <form role="search" className="hidden sm:block">
                <input
                  className="w-64 lg:w-96 h-11 bg-white border-none font-['Poppins-Regular',Helvetica] font-normal text-[#5e5e5e] text-lg lg:text-xl px-4 rounded"
                  id="search-input"
                  placeholder="Search..."
                  type="search"
                  aria-label="Search through site content"
                />
              </form>
              <div className="w-11 h-11 bg-[#fffbfb] rounded-full" />
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-gray-400 to-gray-600 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
            style={{backgroundImage: "url('/siteimage.jpg')"}}
          />
          <div className="absolute inset-0 bg-black bg-opacity-30" />
          
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <h2 className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent font-['Geist-Bold',Helvetica] font-bold text-4xl md:text-5xl lg:text-6xl mb-8">
              Interactive Map
            </h2>

            <button
              className="w-48 lg:w-60 h-16 lg:h-20 rounded-full bg-gradient-to-b from-[#4c2d2d] to-[#744545] hover:from-[#5c3d3d] hover:to-[#846555] transition-all duration-300 shadow-lg"
              aria-label="Open interactive map"
            >
              <span className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent font-['Geist-Bold',Helvetica] font-bold text-2xl lg:text-3xl">
                Open
              </span>
            </button>
          </div>

          {/* Navigation at bottom */}
          <nav className="absolute bottom-0 left-0 w-full bg-black bg-opacity-20 py-4">
            <div className="container mx-auto px-4">
              <ul className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-8">
                <li>
                  <a href="#dashboard" className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors">
                    <span className="font-['Geist-Regular',Helvetica] font-normal text-base lg:text-xl">
                      DASHBOARD
                    </span>
                    <KeyboardArrowDown className="w-5 h-5 lg:w-6 lg:h-6" />
                  </a>
                </li>
                <li>
                  <a href="#sources" className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors">
                    <span className="font-['Geist-Regular',Helvetica] font-normal text-base lg:text-xl">
                      SOURCES
                    </span>
                    <KeyboardArrowDown className="w-5 h-5 lg:w-6 lg:h-6" />
                  </a>
                </li>
                <li>
                  <a href="#feedback" className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors">
                    <span className="font-['Geist-Regular',Helvetica] font-normal text-base lg:text-xl">
                      FEEDBACK
                    </span>
                    <KeyboardArrowDown className="w-5 h-5 lg:w-6 lg:h-6" />
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </section>

        {/* Site Location Section */}
        <section id="site-location" className="container mx-auto px-4 py-12 lg:py-16">
          <h2 className="font-['Geist-SemiBold',Helvetica] font-semibold text-black text-3xl md:text-4xl lg:text-5xl text-center mb-8">
            Site Location
          </h2>

          <div className="max-w-4xl mx-auto">
            <p className="font-['Poppins-Regular',Helvetica] font-normal text-[#4e4e4e] text-lg md:text-xl lg:text-2xl mb-12 text-center md:text-left">
              Enter the latitude and longitude co-ordinates or upload a kml file
              to obtain precise details on the site.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left column - Input fields */}
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="latitude-input"
                      className="block font-['Geist-Medium',Helvetica] font-medium text-black text-xl md:text-2xl lg:text-3xl mb-2"
                    >
                      Latitude
                    </label>
                    <div className="w-full">
                      <input
                        id="latitude-input"
                        type="text"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        placeholder="Latitude"
                        className="w-full px-4 py-3 border border-gray-300 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-[#4c2c2c] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="longitude-input"
                      className="block font-['Geist-Medium',Helvetica] font-medium text-black text-xl md:text-2xl lg:text-3xl mb-2"
                    >
                      Longitude
                    </label>
                    <div className="w-full">
                      <input
                        id="longitude-input"
                        type="text"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        placeholder="Longitude"
                        className="w-full px-4 py-3 border border-gray-300 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-[#4c2c2c] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-['Geist-Medium',Helvetica] font-medium text-black text-xl md:text-2xl lg:text-3xl mb-4">
                    Upload KML File
                  </h3>
                  <button
                    onClick={handleFileUpload}
                    className="flex items-center justify-center w-full md:w-auto px-6 py-4 bg-[#653d3d] hover:bg-[#754d4d] text-white rounded-lg transition-colors duration-300 shadow-lg"
                  >
                    <span className="font-['Poppins-Light',Helvetica] font-light text-lg lg:text-xl">
                      Upload
                    </span>
                  </button>
                </div>
              </div>

              {/* Right column - Map preview */}
              <div className="flex justify-center lg:justify-end">
                <div className="w-full max-w-lg h-64 md:h-80 lg:h-96 bg-green-100 border-2 border-green-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-green-700">
                    <div className="w-16 h-16 mx-auto mb-4 bg-green-200 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-lg font-medium">Map Preview</p>
                    <p className="text-sm">Location visualization will appear here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vegetation & Terrain Analysis Section */}
        <section id="vegetation-terrain" className="container mx-auto px-4 py-12 lg:py-16">
          <h2 className="font-['Geist-SemiBold',Helvetica] font-semibold text-black text-3xl md:text-4xl lg:text-5xl text-center mb-8">
            Vegetation &amp; Terrain Analysis
          </h2>

          <div className="max-w-6xl mx-auto">
            <p className="font-['Poppins-Regular',Helvetica] font-normal text-[#4e4e4e] text-lg md:text-xl lg:text-2xl text-center mb-12">
              Automatically retrieves vegetation, terrain slope, water bodies in
              and around your site
            </p>

            <div className="relative w-full h-64 md:h-80 lg:h-96 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-lg overflow-hidden mb-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 md:w-20 h-16 md:h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 md:w-10 h-8 md:h-10" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-lg md:text-xl font-medium">Vegetation & Terrain Analysis</p>
                  <p className="text-sm md:text-base">Analysis visualization will appear here</p>
                </div>
              </div>
              <button
                onClick={() => handleRetrieveData("vegetation")}
                className="absolute bottom-4 right-4 flex items-center justify-center w-auto px-6 py-3 md:px-8 md:py-4 bg-[#653d3d] hover:bg-[#754d4d] text-white rounded-lg transition-colors duration-300 shadow-lg"
              >
                <span className="font-['Poppins-Light',Helvetica] font-light text-lg md:text-xl">
                  Retrieve
                </span>
              </button>
            </div>

            <p className="text-center font-['Poppins-Regular',Helvetica] font-normal text-[#4e4e4e] text-lg md:text-xl lg:text-2xl">
              <a href="#" className="hover:underline transition-all duration-300">
                click here to download vegetation and terrain report
              </a>
            </p>
          </div>
        </section>

        {/* Climate Conditions Section */}
        <section id="climate-conditions" className="container mx-auto px-4 py-12 lg:py-16">
          <h2 className="font-['Geist-SemiBold',Helvetica] font-semibold text-black text-3xl md:text-4xl lg:text-5xl text-center mb-8">
            Climate Conditions At Your Site
          </h2>

          <div className="max-w-6xl mx-auto">
            <p className="font-['Poppins-Regular',Helvetica] font-normal text-[#4e4e4e] text-lg md:text-xl lg:text-2xl text-center mb-12">
              Automatically retrieves the temperature, humidity, sun exposure, and
              wind conditions at your site.
            </p>

            <div className="relative w-full h-64 md:h-80 lg:h-96 bg-gradient-to-br from-blue-400 via-blue-500 to-green-400 rounded-lg overflow-hidden mb-6">
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-6 md:grid-cols-8 grid-rows-4 md:grid-rows-6 h-full w-full">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="border border-white/10 flex items-center justify-center text-xs text-white"
                    >
                      {Math.floor(Math.random() * 30 + 10)}°
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white z-10">
                  <div className="w-16 md:w-20 h-16 md:h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 md:w-10 h-8 md:h-10" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-lg md:text-xl font-medium">Climate Conditions</p>
                  <p className="text-sm md:text-base">Temperature, humidity & weather data</p>
                </div>
              </div>
              <button
                onClick={() => handleRetrieveData("climate")}
                className="absolute bottom-4 right-4 flex items-center justify-center w-auto px-6 py-3 md:px-8 md:py-4 bg-[#653d3d] hover:bg-[#754d4d] text-white rounded-lg transition-colors duration-300 shadow-lg"
              >
                <span className="font-['Poppins-Light',Helvetica] font-light text-lg md:text-xl">
                  Retrieve
                </span>
              </button>
            </div>

            <p className="text-center font-['Poppins-Regular',Helvetica] font-normal text-[#4e4e4e] text-lg md:text-xl lg:text-2xl">
              <a href="#" className="hover:underline transition-all duration-300">
                click here to download climate condition report
              </a>
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full bg-[#4c2c2cb5] py-8">
          <div className="container mx-auto px-4">
            <div className="border-t border-gray-300 mb-8"></div>
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
              {/* Footer Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 lg:mb-0">
                {footerLinks.map((group, groupIndex) => (
                  <div key={`footer-group-${groupIndex}`}>
                    {group.section.map((link, linkIndex) => (
                      <div
                        key={`footer-link-${groupIndex}-${linkIndex}`}
                        className="mb-4"
                      >
                        <a
                          href={link.url}
                          className="font-['Poppins-Regular',Helvetica] font-normal text-black text-lg md:text-xl lg:text-2xl hover:underline transition-all duration-300"
                        >
                          {link.title}
                        </a>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Logo and Copyright */}
              <div className="flex flex-col items-center lg:items-end">
                <div className="w-20 h-20 lg:w-24 lg:h-24 bg-[#4c2c2cb5] rounded mb-4" />
                
                <p className="font-['Poppins-Regular',Helvetica] font-normal text-black text-lg md:text-xl lg:text-2xl text-center lg:text-right">
                  <a
                    href="https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="underline hover:no-underline transition-all duration-300"
                  >
                    © XYZ
                  </a>
                  {" "}copyright
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
