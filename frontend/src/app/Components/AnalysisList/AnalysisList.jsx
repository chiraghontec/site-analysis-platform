"use client";
import React, { useState, useEffect } from 'react';
import { useSiteAnalysis } from '../../../utils/hooks';
import AnalysisResults from '../AnalysisResults/AnalysisResults';

const AnalysisList = () => {
  const { 
    analyses, 
    loading, 
    error, 
    loadAnalyses, 
    deleteAnalysis 
  } = useSiteAnalysis();
  
  const [selectedAnalysisId, setSelectedAnalysisId] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);

  useEffect(() => {
    loadAnalyses();
  }, [loadAnalyses]);

  const handleViewAnalysis = (analysisId) => {
    setSelectedAnalysisId(analysisId);
  };

  const handleDeleteAnalysis = async (analysisId) => {
    try {
      await deleteAnalysis(analysisId);
      setShowConfirmDelete(null);
    } catch (error) {
      console.error('Failed to delete analysis:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading && analyses.length === 0) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#653D3D]"></div>
            <span className="text-lg">Loading analyses...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h2 className="text-4xl font-semibold font-geist text-black mb-4">
          Your Site Analyses
        </h2>
        <p className="text-xl font-normal font-poppins text-[#4E4E4E]">
          Manage and view your completed site analyses
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Analyses Grid */}
      {analyses.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No analyses yet</h3>
          <p className="text-gray-500">Create your first site analysis to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analyses.map((analysis) => (
            <div key={analysis.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold font-geist text-black truncate">
                    {analysis.name}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(analysis.status)}`}>
                    {analysis.status}
                  </span>
                </div>

                {/* Location */}
                <div className="mb-3">
                  <p className="text-sm text-gray-600">Location:</p>
                  <p className="text-sm font-mono">
                    {analysis.location.coordinates[1].toFixed(4)}, {analysis.location.coordinates[0].toFixed(4)}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Features</p>
                    <p className="text-lg font-semibold">{analysis.feature_count || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Created</p>
                    <p className="text-sm">{formatDate(analysis.created_at)}</p>
                  </div>
                </div>

                {/* Description */}
                {analysis.description && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">Description:</p>
                    <p className="text-sm text-gray-800 line-clamp-2">{analysis.description}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewAnalysis(analysis.id)}
                    className="flex-1 px-4 py-2 bg-[#653D3D] text-white text-sm rounded-lg hover:bg-[#7A4D4D] transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => setShowConfirmDelete(analysis.id)}
                    className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Refresh Button */}
      <div className="mt-8 text-center">
        <button
          onClick={loadAnalyses}
          disabled={loading}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Refreshing...' : 'Refresh List'}
        </button>
      </div>

      {/* Analysis Details Modal */}
      {selectedAnalysisId && (
        <AnalysisResults
          analysisId={selectedAnalysisId}
          onClose={() => setSelectedAnalysisId(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this analysis? This action cannot be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowConfirmDelete(null)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteAnalysis(showConfirmDelete)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisList;
