// START OF CODE FOR src/app/Components/SiteLocation/SiteLocation.jsx
"use client"; // CRITICAL: This must be the very first line of the file.
import React, { useState } from 'react';
import { useSiteAnalysis, useCoordinates, useFileUpload } from '../../../utils/hooks';
import { geoUtils } from '../../../utils/api';

const SiteLocation = () => {
  // API integration hooks
  const { createAnalysis, loading: analysisLoading, error: analysisError } = useSiteAnalysis();
  const { 
    latitude, 
    longitude, 
    errors: coordErrors, 
    isValid: coordsValid, 
    setLatitude, 
    setLongitude 
  } = useCoordinates();
  const { 
    file, 
    uploading, 
    error: uploadError, 
    handleFileSelect, 
    uploadFile 
  } = useFileUpload();

  // Local state
  const [analysisName, setAnalysisName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle coordinate-based analysis
  const handleCreateAnalysis = async () => {
    if (!coordsValid) {
      return;
    }

    if (!analysisName.trim()) {
      alert('Please enter a name for your analysis');
      return;
    }

    try {
      const analysisData = {
        name: analysisName,
        location: {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)]
        },
        description: `Site analysis for coordinates ${latitude}, ${longitude}`
      };

      const newAnalysis = await createAnalysis(analysisData);
      setSuccessMessage(`Analysis "${newAnalysis.name}" created successfully!`);
      
      // Clear form after successful creation
      setAnalysisName('');
      setTimeout(() => setSuccessMessage(''), 5000);
      
    } catch (error) {
      console.error('Failed to create analysis:', error);
    }
  };

  // Handle KML file upload
  const handleKMLUpload = async () => {
    if (!file) {
      alert('Please select a KML file first');
      return;
    }

    try {
      const result = await uploadFile();
      setSuccessMessage('KML file uploaded and analysis created successfully!');
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      console.error('Failed to upload KML file:', error);
    }
  };

  // Handle file input change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    handleFileSelect(selectedFile);
  };
  return (
    <div className="container mx-auto p-8 mt-16">
      <h2 className="text-5xl font-semibold font-geist text-black mb-6">Site Location</h2>
      <p className="text-2xl font-normal font-poppins text-[#4E4E4E] mb-12 max-w-[654px]">
        Enter the latitude and longitude co-ordinates or upload a kml file to
        obtain precise details on the site.
      </p>

      {/* Main container with side-by-side layout */}
      <div className="flex justify-between gap-16">
        {/* Left Column - Form Inputs and Upload Button */}
        <div className="w-[500px]">
          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {successMessage}
            </div>
          )}

          {/* Error Messages */}
          {(analysisError || uploadError) && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {analysisError || uploadError}
            </div>
          )}

          {/* Analysis Name Input */}
          <div className="mb-6">
            <label htmlFor="analysisName" className="block text-3xl font-medium font-geist text-black mb-2">
              Analysis Name
            </label>
            <input
              type="text"
              id="analysisName"
              value={analysisName}
              onChange={(e) => setAnalysisName(e.target.value)}
              placeholder="Enter analysis name"
              className="w-full px-4 py-3 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A4747] text-2xl font-poppins text-[#4E4E4E] shadow-sm"
            />
          </div>

          <div className="flex flex-col space-y-6 mb-10">
            {/* Latitude Input */}
            <div>
              <label htmlFor="latitude" className="block text-3xl font-medium font-geist text-black mb-2">
                Latitude
              </label>
              <input
                type="text"
                id="latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="Latitude (e.g., 40.7128)"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A4747] text-2xl font-poppins text-[#4E4E4E] shadow-sm ${
                  coordErrors.latitude ? 'border-red-500' : 'border-[#D1D5DB]'
                }`}
              />
              {coordErrors.latitude && (
                <p className="mt-1 text-sm text-red-600">{coordErrors.latitude}</p>
              )}
            </div>
            {/* Longitude Input */}
            <div>
              <label htmlFor="longitude" className="block text-3xl font-medium font-geist text-black mb-2">
                Longitude
              </label>
              <input
                type="text"
                id="longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="Longitude (e.g., -74.0060)"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A4747] text-2xl font-poppins text-[#4E4E4E] shadow-sm ${
                  coordErrors.longitude ? 'border-red-500' : 'border-[#D1D5DB]'
                }`}
              />
              {coordErrors.longitude && (
                <p className="mt-1 text-sm text-red-600">{coordErrors.longitude}</p>
              )}
            </div>
          </div>

          {/* Create Analysis Button */}
          <div className="mb-10">
            <button 
              onClick={handleCreateAnalysis}
              disabled={!coordsValid || !analysisName.trim() || analysisLoading}
              className={`w-[212px] h-[68px] rounded-lg flex items-center justify-center shadow-md transition-colors duration-200 ${
                coordsValid && analysisName.trim() && !analysisLoading
                  ? 'bg-[#653D3D] hover:bg-[#7A4D4D] text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span className="text-xl font-light font-poppins">
                {analysisLoading ? 'Creating...' : 'Create Analysis'}
              </span>
            </button>
          </div>

          {/* Upload KML File */}
          <div className="mb-10">
            <h3 className="text-3xl font-medium font-geist text-black mb-4">Upload KML File</h3>
            <div className="flex flex-col space-y-4">
              <input
                type="file"
                accept=".kml,.xml"
                onChange={handleFileChange}
                className="hidden"
                id="kml-upload"
              />
              <label
                htmlFor="kml-upload"
                className="w-[212px] h-[68px] bg-[#653D3D] rounded-lg flex items-center justify-center shadow-md hover:bg-[#7A4D4D] transition-colors duration-200 cursor-pointer"
              >
                <span className="text-xl font-light font-poppins text-white">
                  {file ? 'Change File' : 'Select File'}
                </span>
              </label>
              
              {file && (
                <div className="text-sm text-gray-600">
                  <p>Selected: {file.name}</p>
                  <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
                </div>
              )}
              
              {file && (
                <button
                  onClick={handleKMLUpload}
                  disabled={uploading}
                  className={`w-[212px] h-[68px] rounded-lg flex items-center justify-center shadow-md transition-colors duration-200 ${
                    uploading
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  <span className="text-xl font-light font-poppins">
                    {uploading ? 'Uploading...' : 'Upload & Analyze'}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Map Placeholder */}
        <div className="w-[615px]">
          <div className="sticky top-8">
            <img
              className="w-full h-[346px] object-cover rounded-lg shadow-lg"
              alt="Map Image"
              src="https://placehold.co/615x346/E0E0E0/333333?text=Map+Placeholder"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteLocation;
// END OF CODE FOR src/app/Components/SiteLocation/SiteLocation.jsx
