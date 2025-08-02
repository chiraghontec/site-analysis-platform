"use client";
import React, { useState } from 'react';
import { siteAnalysisAPI, climateAPI } from '../utils/api';

const APITestComponent = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const addResult = (test, success, data, error) => {
    setTestResults(prev => [...prev, {
      test,
      success,
      data,
      error,
      timestamp: new Date().toISOString()
    }]);
  };

  const testBackendConnection = async () => {
    setLoading(true);
    setTestResults([]);

    try {
      // Test 1: Get all analyses
      try {
        const analyses = await siteAnalysisAPI.getAnalyses();
        addResult('Get All Analyses', true, analyses, null);
      } catch (error) {
        addResult('Get All Analyses', false, null, error.message);
      }

      // Test 2: Test climate data API (with sample coordinates)
      try {
        const climateData = await climateAPI.getClimateData(40.7128, -74.0060); // NYC
        addResult('Get Climate Data (NYC)', true, climateData, null);
      } catch (error) {
        addResult('Get Climate Data (NYC)', false, null, error.message);
      }

      // Test 3: Create a test analysis
      try {
        const testAnalysis = {
          name: 'API Test Analysis',
          location: {
            type: 'Point',
            coordinates: [-74.0060, 40.7128] // NYC (longitude, latitude)
          },
          description: 'Test analysis created from frontend'
        };
        const newAnalysis = await siteAnalysisAPI.createAnalysis(testAnalysis);
        addResult('Create Test Analysis', true, newAnalysis, null);

        // Test 4: Delete the test analysis
        try {
          await siteAnalysisAPI.deleteAnalysis(newAnalysis.id);
          addResult('Delete Test Analysis', true, { id: newAnalysis.id }, null);
        } catch (error) {
          addResult('Delete Test Analysis', false, null, error.message);
        }
      } catch (error) {
        addResult('Create Test Analysis', false, null, error.message);
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Backend API Integration Test</h2>
      
      <button
        onClick={testBackendConnection}
        disabled={loading}
        className={`px-6 py-3 rounded-lg font-medium ${
          loading
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {loading ? 'Testing APIs...' : 'Test Backend APIs'}
      </button>

      {testResults.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Test Results:</h3>
          <div className="space-y-3">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  result.success
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{result.test}</h4>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      result.success
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {result.success ? 'SUCCESS' : 'FAILED'}
                  </span>
                </div>
                
                {result.error && (
                  <div className="text-red-600 text-sm mb-2">
                    <strong>Error:</strong> {result.error}
                  </div>
                )}
                
                {result.data && (
                  <details className="text-sm">
                    <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                      Show Response Data
                    </summary>
                    <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </details>
                )}
                
                <div className="text-xs text-gray-500 mt-2">
                  {new Date(result.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">Expected Results:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>Get All Analyses:</strong> Should return an array (may be empty initially)</li>
          <li>• <strong>Get Climate Data:</strong> Should return weather data for NYC</li>
          <li>• <strong>Create Test Analysis:</strong> Should create a new analysis record</li>
          <li>• <strong>Delete Test Analysis:</strong> Should clean up the test record</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="font-medium text-yellow-800 mb-2">Troubleshooting:</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Ensure Django backend is running on http://localhost:8000</li>
          <li>• Check that PostgreSQL database is running</li>
          <li>• Verify environment variables are set correctly</li>
          <li>• Check browser console for additional error details</li>
        </ul>
      </div>
    </div>
  );
};

export default APITestComponent;
