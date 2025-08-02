"use client";
import React from 'react';

const VegetationAnalysis = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Vegetation &amp; Terrain Analysis</h2>
        <p className="text-gray-600">
          Automatically retrieves vegetation, terrain slope, water bodies in and around your site
        </p>
      </div>

      {/* Map Container */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-6">
        <div className="w-full h-96 bg-green-50 relative">
          {/* Large map placeholder */}
          <div className="w-full h-full flex items-center justify-center bg-green-50 text-green-700">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-green-200 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-lg font-medium">Vegetation & Terrain Analysis Map</p>
              <p className="text-sm">Analysis visualization will appear here</p>
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
          click here to download vegetation and terrain report
        </button>
      </div>
    </section>
  );
};

export default VegetationAnalysis;
