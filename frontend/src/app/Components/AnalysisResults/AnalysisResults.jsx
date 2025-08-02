"use client";
import React, { useState, useEffect } from 'react';
import { useSiteAnalysis } from '../../../utils/hooks';
import { dataUtils } from '../../../utils/api';

const AnalysisResults = ({ analysisId, onClose }) => {
  const { loadAnalysis, exportFeatures, loading, error } = useSiteAnalysis();
  const [analysis, setAnalysis] = useState(null);
  const [features, setFeatures] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    if (analysisId) {
      loadAnalysisData();
    }
  }, [analysisId]);

  const loadAnalysisData = async () => {
    try {
      const analysisData = await loadAnalysis(analysisId);
      setAnalysis(analysisData);

      // Load features if available
      if (analysisData.feature_count > 0) {
        const featuresData = await exportFeatures(analysisId, 'geojson');
        setFeatures(dataUtils.transformFeatureData(featuresData.features || []));
      }
    } catch (error) {
      console.error('Failed to load analysis data:', error);
    }
  };

  const handleExport = async (format) => {
    try {
      const data = await exportFeatures(analysisId, format);
      
      let blob, filename;
      if (format === 'geojson') {
        blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        filename = `analysis-${analysisId}-features.geojson`;
      } else if (format === 'csv') {
        blob = new Blob([data], { type: 'text/csv' });
        filename = `analysis-${analysisId}-features.csv`;
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export features:', error);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#653D3D]"></div>
            <span className="text-lg">Loading analysis data...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-3xl font-semibold font-geist text-black">
            {analysis.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Analysis Info */}
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">Location</label>
                <p className="text-lg">
                  {analysis.location.coordinates[1].toFixed(6)}, {analysis.location.coordinates[0].toFixed(6)}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Created</label>
                <p className="text-lg">
                  {new Date(analysis.created_at).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Status</label>
                <p className="text-lg capitalize">{analysis.status}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Features Found</label>
                <p className="text-lg">{analysis.feature_count || 0}</p>
              </div>
            </div>
            
            {analysis.description && (
              <div>
                <label className="text-sm font-semibold text-gray-600">Description</label>
                <p className="text-lg">{analysis.description}</p>
              </div>
            )}
          </div>

          {/* Features List */}
          {features.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Environmental Features</h3>
              <div className="max-h-60 overflow-y-auto border rounded-lg">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">Type</th>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((feature, index) => (
                      <tr key={feature.id || index} className="border-t">
                        <td className="px-4 py-2 capitalize">{feature.type}</td>
                        <td className="px-4 py-2">{feature.name || 'N/A'}</td>
                        <td className="px-4 py-2">{feature.description || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Export Options */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Export Data</h3>
            <div className="flex space-x-4">
              <button
                onClick={() => handleExport('geojson')}
                className="px-6 py-3 bg-[#653D3D] text-white rounded-lg hover:bg-[#7A4D4D] transition-colors"
              >
                Export as GeoJSON
              </button>
              <button
                onClick={() => handleExport('csv')}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Export as CSV
              </button>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
