"use client";
import React from 'react';

const ClimateConditions = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Climate Conditions At Your Site</h2>
        <p className="text-gray-600">
          Automatically retrieves the temperature, humidity, sun exposure, and wind conditions at your site.
        </p>
      </div>

      {/* Climate Map Container */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-6">
        <div className="w-full h-96 bg-blue-50 relative">
          {/* Climate map placeholder with weather visualization */}
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-green-400 text-white relative">
            {/* Weather visualization mockup */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="border border-white/10 flex items-center justify-center text-xs"
                  >
                    {Math.floor(Math.random() * 30 + 10)}°
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-lg font-medium">Climate Conditions Map</p>
              <p className="text-sm">Temperature, humidity & weather data visualization</p>
            </div>
          </div>
          
          {/* Retrive button positioned on the map */}
          <button className="absolute bottom-4 right-4 px-6 py-2 bg-red-800 text-white font-medium rounded hover:bg-red-700 transition-colors shadow-lg">
            Retrive
          </button>
        </div>
      </div>

      {/* Download link */}
      <div className="text-center">
        <button className="text-blue-600 hover:text-blue-800 underline">
          click here to download climate condition report
        </button>
      </div>
    </section>
  );
};

export default ClimateConditions;
