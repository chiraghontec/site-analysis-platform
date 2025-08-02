// React hooks for Site Analysis state management
"use client";

import { useState, useEffect, useCallback } from 'react';
import { siteAnalysisAPI, climateAPI, geoUtils, errorUtils } from '../utils/api';

// Hook for managing site analysis workflow
export const useSiteAnalysis = () => {
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load all analyses
  const loadAnalyses = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await siteAnalysisAPI.getAnalyses();
      setAnalyses(data);
    } catch (err) {
      setError(errorUtils.getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new analysis
  const createAnalysis = useCallback(async (analysisData) => {
    setLoading(true);
    setError(null);

    try {
      const newAnalysis = await siteAnalysisAPI.createAnalysis(analysisData);
      setCurrentAnalysis(newAnalysis);
      setAnalyses(prev => [...prev, newAnalysis]);
      return newAnalysis;
    } catch (err) {
      setError(errorUtils.getErrorMessage(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Load specific analysis
  const loadAnalysis = useCallback(async (analysisId) => {
    setLoading(true);
    setError(null);

    try {
      const analysis = await siteAnalysisAPI.getAnalysis(analysisId);
      setCurrentAnalysis(analysis);
      return analysis;
    } catch (err) {
      setError(errorUtils.getErrorMessage(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update analysis
  const updateAnalysis = useCallback(async (analysisId, updateData) => {
    setLoading(true);
    setError(null);

    try {
      const updatedAnalysis = await siteAnalysisAPI.updateAnalysis(analysisId, updateData);
      setCurrentAnalysis(updatedAnalysis);
      setAnalyses(prev => 
        prev.map(analysis => 
          analysis.id === analysisId ? updatedAnalysis : analysis
        )
      );
      return updatedAnalysis;
    } catch (err) {
      setError(errorUtils.getErrorMessage(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete analysis
  const deleteAnalysis = useCallback(async (analysisId) => {
    setLoading(true);
    setError(null);

    try {
      await siteAnalysisAPI.deleteAnalysis(analysisId);
      setAnalyses(prev => prev.filter(analysis => analysis.id !== analysisId));
      if (currentAnalysis && currentAnalysis.id === analysisId) {
        setCurrentAnalysis(null);
      }
    } catch (err) {
      setError(errorUtils.getErrorMessage(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentAnalysis]);

  // Export features
  const exportFeatures = useCallback(async (analysisId, format = 'geojson') => {
    setLoading(true);
    setError(null);

    try {
      const data = await siteAnalysisAPI.exportFeatures(analysisId, format);
      return data;
    } catch (err) {
      setError(errorUtils.getErrorMessage(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    currentAnalysis,
    analyses,
    loading,
    error,
    loadAnalyses,
    createAnalysis,
    loadAnalysis,
    updateAnalysis,
    deleteAnalysis,
    exportFeatures,
    clearError,
  };
};

// Hook for managing climate data
export const useClimateData = () => {
  const [climateData, setClimateData] = useState(null);
  const [climateSummary, setClimateSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch climate data for coordinates
  const fetchClimateData = useCallback(async (latitude, longitude) => {
    if (!geoUtils.isValidCoordinates(latitude, longitude)) {
      setError('Invalid coordinates provided');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await climateAPI.getClimateData(latitude, longitude);
      setClimateData(data);
      return data;
    } catch (err) {
      setError(errorUtils.getErrorMessage(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Refresh climate data
  const refreshClimateData = useCallback(async (latitude, longitude) => {
    if (!geoUtils.isValidCoordinates(latitude, longitude)) {
      setError('Invalid coordinates provided');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await climateAPI.refreshClimateData(latitude, longitude);
      setClimateData(data);
      return data;
    } catch (err) {
      setError(errorUtils.getErrorMessage(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch climate summary
  const fetchClimateSummary = useCallback(async (latitude, longitude, days = 30) => {
    if (!geoUtils.isValidCoordinates(latitude, longitude)) {
      setError('Invalid coordinates provided');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const summary = await climateAPI.getClimateSummary(latitude, longitude, days);
      setClimateSummary(summary);
      return summary;
    } catch (err) {
      setError(errorUtils.getErrorMessage(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    climateData,
    climateSummary,
    loading,
    error,
    fetchClimateData,
    refreshClimateData,
    fetchClimateSummary,
    clearError,
  };
};

// Hook for managing coordinates input
export const useCoordinates = (initialLat = '', initialLon = '') => {
  const [latitude, setLatitude] = useState(initialLat);
  const [longitude, setLongitude] = useState(initialLon);
  const [errors, setErrors] = useState({});

  // Validate and set latitude
  const setValidatedLatitude = useCallback((value) => {
    setLatitude(value);
    
    if (value && !geoUtils.isValidLatitude(value)) {
      setErrors(prev => ({
        ...prev,
        latitude: 'Latitude must be between -90 and 90 degrees'
      }));
    } else {
      setErrors(prev => {
        const { latitude, ...rest } = prev;
        return rest;
      });
    }
  }, []);

  // Validate and set longitude
  const setValidatedLongitude = useCallback((value) => {
    setLongitude(value);
    
    if (value && !geoUtils.isValidLongitude(value)) {
      setErrors(prev => ({
        ...prev,
        longitude: 'Longitude must be between -180 and 180 degrees'
      }));
    } else {
      setErrors(prev => {
        const { longitude, ...rest } = prev;
        return rest;
      });
    }
  }, []);

  // Check if coordinates are valid
  const isValid = geoUtils.isValidCoordinates(latitude, longitude);

  // Reset coordinates
  const reset = useCallback(() => {
    setLatitude('');
    setLongitude('');
    setErrors({});
  }, []);

  // Set coordinates from object
  const setCoordinates = useCallback((coords) => {
    if (coords.latitude !== undefined) setValidatedLatitude(coords.latitude);
    if (coords.longitude !== undefined) setValidatedLongitude(coords.longitude);
  }, [setValidatedLatitude, setValidatedLongitude]);

  return {
    latitude,
    longitude,
    errors,
    isValid,
    setLatitude: setValidatedLatitude,
    setLongitude: setValidatedLongitude,
    setCoordinates,
    reset,
  };
};

// Hook for file upload management
export const useFileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);

  // Handle file selection
  const handleFileSelect = useCallback((selectedFile) => {
    setError(null);
    
    if (!selectedFile) {
      setFile(null);
      return;
    }

    // Validate file type
    const fileUtils = require('../utils/api').fileUtils;
    if (!fileUtils.isValidKMLFile(selectedFile)) {
      setError('Please select a valid KML file');
      return;
    }

    // Check file size (limit to 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setFile(selectedFile);
  }, []);

  // Upload file
  const uploadFile = useCallback(async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const fileUtils = require('../utils/api').fileUtils;
      const result = await fileUtils.uploadKMLFile(file);
      setUploadResult(result);
      return result;
    } catch (err) {
      setError(errorUtils.getErrorMessage(err));
      throw err;
    } finally {
      setUploading(false);
    }
  }, [file]);

  // Reset upload state
  const reset = useCallback(() => {
    setFile(null);
    setUploading(false);
    setError(null);
    setUploadResult(null);
  }, []);

  return {
    file,
    uploading,
    error,
    uploadResult,
    handleFileSelect,
    uploadFile,
    reset,
  };
};
