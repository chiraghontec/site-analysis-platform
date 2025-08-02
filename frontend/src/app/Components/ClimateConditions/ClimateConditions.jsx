"use client";

import React, { useState } from 'react';
import { useClimateData, useCoordinates } from '../../../utils/hooks';
import { dataUtils } from '../../../utils/api';

const ClimateConditions = () => {
  // State for UI
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedDataTypes, setSelectedDataTypes] = useState([
    'temperature',
    'precipitation',
    'humidity'
  ]);

  // Climate data hooks
  const { 
    climateData, 
    climateSummary, 
    loading, 
    error, 
    fetchClimateData, 
    refreshClimateData, 
    fetchClimateSummary 
  } = useClimateData();

  // Coordinate input hooks
  const { 
    latitude, 
    longitude, 
    errors: coordErrors, 
    isValid: coordsValid, 
    setLatitude, 
    setLongitude 
  } = useCoordinates();

  // Handle climate data fetching
  const handleFetchClimateData = async () => {
    if (!coordsValid) {
      return;
    }

    try {
      await fetchClimateData({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        dataTypes: selectedDataTypes
      });
    } catch (err) {
      console.error('Error fetching climate data:', err);
    }
  };

  // Handle data type selection
  const handleDataTypeToggle = (dataType) => {
    setSelectedDataTypes(prev => 
      prev.includes(dataType)
        ? prev.filter(type => type !== dataType)
        : [...prev, dataType]
    );
  };

  // Download climate report
  const handleDownloadReport = async () => {
    if (!climateData) return;

    try {
      const report = dataUtils.generateClimateReport(climateData);
      dataUtils.downloadFile(report, 'climate-report.json', 'application/json');
    } catch (err) {
      console.error('Error downloading report:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Climate Conditions Analysis
        </h2>
        <p className="text-gray-600">
          Get detailed climate data for your site location including temperature, 
          precipitation, humidity, and other environmental factors.
        </p>
      </div>

      {/* Coordinate Input Section */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Site Coordinates
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Latitude
            </label>
            <input
              type="number"
              step="any"
              placeholder="e.g., 40.7128"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                coordErrors.latitude ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {coordErrors.latitude && (
              <p className="text-red-500 text-sm mt-1">{coordErrors.latitude}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Longitude
            </label>
            <input
              type="number"
              step="any"
              placeholder="e.g., -74.0060"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                coordErrors.longitude ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {coordErrors.longitude && (
              <p className="text-red-500 text-sm mt-1">{coordErrors.longitude}</p>
            )}
          </div>
        </div>
      </div>

      {/* Data Type Selection */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Climate Data Types
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { key: 'temperature', label: 'Temperature' },
            { key: 'precipitation', label: 'Precipitation' },
            { key: 'humidity', label: 'Humidity' },
            { key: 'wind', label: 'Wind Speed' },
            { key: 'pressure', label: 'Atmospheric Pressure' },
            { key: 'solar', label: 'Solar Radiation' }
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedDataTypes.includes(key)}
                onChange={() => handleDataTypeToggle(key)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={handleFetchClimateData}
          disabled={!coordsValid || loading || selectedDataTypes.length === 0}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Fetching Data...' : 'Get Climate Data'}
        </button>
        
        {climateData && (
          <>
            <button
              onClick={refreshClimateData}
              disabled={loading}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Refresh Data
            </button>
            
            <button
              onClick={handleDownloadReport}
              className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
            >
              Download Report
            </button>
          </>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                {error}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Fetching climate data...</p>
        </div>
      )}

      {/* Climate Data Display */}
      {climateData && (
        <div className="space-y-6">
          {/* Summary Section */}
          {climateSummary && (
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Climate Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {climateSummary.avgTemperature}°C
                  </p>
                  <p className="text-sm text-gray-600">Average Temperature</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {climateSummary.totalPrecipitation}mm
                  </p>
                  <p className="text-sm text-gray-600">Annual Precipitation</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {climateSummary.avgHumidity}%
                  </p>
                  <p className="text-sm text-gray-600">Average Humidity</p>
                </div>
              </div>
            </div>
          )}

          {/* Detailed Data */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Detailed Climate Data
              </h3>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {showAdvanced ? 'Hide' : 'Show'} Advanced Data
              </button>
            </div>
            
            <div className="space-y-4">
              {selectedDataTypes.map(dataType => (
                <div key={dataType} className="bg-white p-4 rounded border">
                  <h4 className="font-semibold text-gray-700 mb-2 capitalize">
                    {dataType} Data
                  </h4>
                  <div className="text-sm text-gray-600">
                    {climateData[dataType] ? (
                      <pre className="whitespace-pre-wrap">
                        {JSON.stringify(climateData[dataType], null, 2)}
                      </pre>
                    ) : (
                      <p>No data available for {dataType}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClimateConditions;
