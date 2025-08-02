"use client";
import React, { useState } from 'react';

const SiteLocation = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Site Location</h2>
        <p className="text-gray-600">
          Enter the latitude and longitude co-ordinates or upload a kml file to obtain precise details on the site.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Form */}
        <div className="space-y-6">
          {/* Coordinate Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Latitude
              </label>
              <input
                type="text"
                placeholder="Latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Longitude
              </label>
              <input
                type="text"
                placeholder="Longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* KML Upload */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Upload KML File</h3>
            <div className="flex items-center space-x-4">
              <button className="px-6 py-2 bg-red-800 text-white font-medium rounded hover:bg-red-700 transition-colors">
                Upload
              </button>
            </div>
          </div>
        </div>

        {/* Right side - Map placeholder */}
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <div className="w-full h-64 bg-green-100 relative">
            {/* Map placeholder */}
            <div className="w-full h-full flex items-center justify-center bg-green-100 text-green-700">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-200 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm">Map will appear here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SiteLocation;
