"use client";
import React, { useState, useEffect } from 'react';
import { useSiteAnalysis } from '../utils/hooks';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const AnalysesPage = () => {
  const { 
    analyses, 
    loading, 
    error, 
    loadAnalyses, 
    deleteAnalysis,
    exportFeatures 
  } = useSiteAnalysis();
  
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Load analyses on component mount
  useEffect(() => {
    loadAnalyses();
  }, [loadAnalyses]);

  // Handle analysis deletion
  const handleDelete = async (analysisId) => {
    try {
      await deleteAnalysis(analysisId);
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete analysis:', error);
    }
  };

  // Handle feature export
  const handleExport = async (analysisId, format = 'geojson') => {
    try {
      const data = await exportFeatures(analysisId, format);
      
      // Create and download file
      const blob = new Blob([JSON.stringify(data, null, 2)], { 
        type: 'application/json' 
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `analysis_${analysisId}_features.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export features:', error);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-poppins antialiased">
      <Navbar />
      
      <main className="flex-grow container mx-auto p-8 mt-16">
        <div className="mb-8">
          <h1 className="text-5xl font-semibold font-geist text-black mb-4">
            Site Analyses
          </h1>
          <p className="text-2xl font-normal font-poppins text-[#4E4E4E] max-w-[654px]">
            Manage and view all your environmental site analyses. Export data, view details, or create new analyses.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#653D3D]"></div>
          </div>
        )}

        {/* Analyses Grid */}
        {!loading && analyses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analyses.map((analysis) => (
              <div 
                key={analysis.id} 
                className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-semibold font-geist text-black mb-2">
                    {analysis.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {analysis.description}
                  </p>
                  
                  <div className="space-y-2 text-sm text-gray-700 mb-4">
                    <div>
                      <span className="font-medium">Location:</span>{' '}
                      {analysis.location?.coordinates ? 
                        `${analysis.location.coordinates[1].toFixed(4)}, ${analysis.location.coordinates[0].toFixed(4)}` :
                        'N/A'
                      }
                    </div>
                    <div>
                      <span className="font-medium">Created:</span>{' '}
                      {formatDate(analysis.created_at)}
                    </div>
                    <div>
                      <span className="font-medium">Status:</span>{' '}
                      <span className={`px-2 py-1 rounded text-xs ${
                        analysis.status === 'completed' ? 'bg-green-100 text-green-800' :
                        analysis.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {analysis.status}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedAnalysis(analysis)}
                      className="px-3 py-2 bg-[#653D3D] text-white text-sm rounded hover:bg-[#7A4D4D] transition-colors duration-200"
                    >
                      View Details
                    </button>
                    
                    <button
                      onClick={() => handleExport(analysis.id, 'geojson')}
                      className="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors duration-200"
                    >
                      Export GeoJSON
                    </button>
                    
                    <button
                      onClick={() => setShowDeleteConfirm(analysis.id)}
                      className="px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && analyses.length === 0 && (
          <div className="text-center py-12">
            <div className="mb-4">
              <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-medium text-gray-900 mb-2">No analyses found</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first site analysis.</p>
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-[#653D3D] text-white rounded-lg hover:bg-[#7A4D4D] transition-colors duration-200"
            >
              Create New Analysis
            </a>
          </div>
        )}

        {/* Analysis Detail Modal */}
        {selectedAnalysis && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-3xl font-semibold font-geist text-black">
                    {selectedAnalysis.name}
                  </h2>
                  <button
                    onClick={() => setSelectedAnalysis(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-600">{selectedAnalysis.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Location</h3>
                    <p className="text-gray-600">
                      {selectedAnalysis.location?.coordinates ? 
                        `Latitude: ${selectedAnalysis.location.coordinates[1].toFixed(6)}, Longitude: ${selectedAnalysis.location.coordinates[0].toFixed(6)}` :
                        'Location not available'
                      }
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Analysis Details</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Status:</span> {selectedAnalysis.status}
                      </div>
                      <div>
                        <span className="font-medium">Created:</span> {formatDate(selectedAnalysis.created_at)}
                      </div>
                      <div>
                        <span className="font-medium">Last Updated:</span> {formatDate(selectedAnalysis.updated_at)}
                      </div>
                      <div>
                        <span className="font-medium">Area:</span> {selectedAnalysis.area ? `${selectedAnalysis.area.toFixed(2)} sq km` : 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => handleExport(selectedAnalysis.id, 'geojson')}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
                  >
                    Export Data
                  </button>
                  <button
                    onClick={() => setSelectedAnalysis(null)}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Confirm Deletion
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this analysis? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(showDeleteConfirm)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default AnalysesPage;
