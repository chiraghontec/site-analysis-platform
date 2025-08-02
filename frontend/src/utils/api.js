// API configuration and utilities for Site Analysis Backend integration

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_VERSION = 'v1';

class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

// Generic API request function with error handling
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}/api/${API_VERSION}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status,
        errorData
      );
    }

    // Handle empty responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(`Network error: ${error.message}`, 0, null);
  }
}

// Site Analysis API functions
export const siteAnalysisAPI = {
  // Create a new site analysis
  createAnalysis: async (analysisData) => {
    return apiRequest('/analysis/', {
      method: 'POST',
      body: JSON.stringify(analysisData),
    });
  },

  // Get all site analyses
  getAnalyses: async () => {
    return apiRequest('/analysis/');
  },

  // Get a specific analysis by ID
  getAnalysis: async (analysisId) => {
    return apiRequest(`/analysis/${analysisId}/`);
  },

  // Update an existing analysis
  updateAnalysis: async (analysisId, analysisData) => {
    return apiRequest(`/analysis/${analysisId}/`, {
      method: 'PUT',
      body: JSON.stringify(analysisData),
    });
  },

  // Delete an analysis
  deleteAnalysis: async (analysisId) => {
    return apiRequest(`/analysis/${analysisId}/`, {
      method: 'DELETE',
    });
  },

  // Export features for an analysis
  exportFeatures: async (analysisId, format = 'geojson') => {
    return apiRequest(`/analysis/${analysisId}/export/?format=${format}`);
  },

  // Get analysis summary
  getAnalysisSummary: async (analysisId) => {
    return apiRequest(`/analysis/${analysisId}/summary/`);
  },
};

// Climate Data API functions
export const climateAPI = {
  // Get climate data for a location
  getClimateData: async (latitude, longitude) => {
    return apiRequest(`/climate-data/?lat=${latitude}&lon=${longitude}`);
  },

  // Refresh climate data for a location
  refreshClimateData: async (latitude, longitude) => {
    return apiRequest('/climate-data/refresh/', {
      method: 'POST',
      body: JSON.stringify({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      }),
    });
  },

  // Get climate data summary for a location
  getClimateSummary: async (latitude, longitude, days = 30) => {
    return apiRequest(`/climate-data/summary/?lat=${latitude}&lon=${longitude}&days=${days}`);
  },
};

// Utility functions for coordinate validation and formatting
export const geoUtils = {
  // Validate latitude (-90 to 90)
  isValidLatitude: (lat) => {
    const num = parseFloat(lat);
    return !isNaN(num) && num >= -90 && num <= 90;
  },

  // Validate longitude (-180 to 180)
  isValidLongitude: (lon) => {
    const num = parseFloat(lon);
    return !isNaN(num) && num >= -180 && num <= 180;
  },

  // Validate coordinate pair
  isValidCoordinates: (lat, lon) => {
    return geoUtils.isValidLatitude(lat) && geoUtils.isValidLongitude(lon);
  },

  // Format coordinates for display
  formatCoordinates: (lat, lon, precision = 6) => {
    return {
      latitude: parseFloat(lat).toFixed(precision),
      longitude: parseFloat(lon).toFixed(precision),
    };
  },

  // Convert degrees to radians
  toRadians: (degrees) => degrees * (Math.PI / 180),

  // Calculate distance between two points using Haversine formula
  calculateDistance: (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = geoUtils.toRadians(lat2 - lat1);
    const dLon = geoUtils.toRadians(lon2 - lon1);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(geoUtils.toRadians(lat1)) * Math.cos(geoUtils.toRadians(lat2)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  },
};

// File upload utilities
export const fileUtils = {
  // Upload KML file for analysis
  uploadKMLFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return apiRequest('/analysis/upload-kml/', {
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type for FormData, let browser set it
      },
    });
  },

  // Validate file type
  isValidKMLFile: (file) => {
    const validTypes = ['application/vnd.google-earth.kml+xml', 'application/xml', 'text/xml'];
    const validExtensions = ['.kml'];
    
    const hasValidType = validTypes.includes(file.type);
    const hasValidExtension = validExtensions.some(ext => 
      file.name.toLowerCase().endsWith(ext)
    );
    
    return hasValidType || hasValidExtension;
  },

  // Format file size for display
  formatFileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },
};

// Error handling utilities
export const errorUtils = {
  // Get user-friendly error message
  getErrorMessage: (error) => {
    if (error instanceof APIError) {
      switch (error.status) {
        case 400:
          return 'Invalid request. Please check your input data.';
        case 401:
          return 'Authentication required. Please log in.';
        case 403:
          return 'Access denied. You don\'t have permission for this action.';
        case 404:
          return 'Resource not found. The requested data may have been deleted.';
        case 500:
          return 'Server error. Please try again later.';
        default:
          return error.message || 'An unexpected error occurred.';
      }
    }
    return error.message || 'An unexpected error occurred.';
  },

  // Check if error is network-related
  isNetworkError: (error) => {
    return error instanceof APIError && error.status === 0;
  },

  // Check if error is client-side
  isClientError: (error) => {
    return error instanceof APIError && error.status >= 400 && error.status < 500;
  },

  // Check if error is server-side
  isServerError: (error) => {
    return error instanceof APIError && error.status >= 500;
  },
};

// Data transformation utilities
export const dataUtils = {
  // Transform analysis data for display
  transformAnalysisData: (analysisData) => {
    return {
      id: analysisData.id,
      name: analysisData.name,
      location: {
        latitude: analysisData.location.coordinates[1],
        longitude: analysisData.location.coordinates[0],
      },
      created: new Date(analysisData.created_at),
      updated: new Date(analysisData.updated_at),
      status: analysisData.status,
      featureCount: analysisData.feature_count || 0,
      area: analysisData.area,
      description: analysisData.description,
    };
  },

  // Transform climate data for display
  transformClimateData: (climateData) => {
    return {
      temperature: {
        current: climateData.temperature,
        unit: '°C',
        description: climateData.weather_description,
      },
      humidity: {
        value: climateData.humidity,
        unit: '%',
      },
      windSpeed: {
        value: climateData.wind_speed,
        unit: 'm/s',
        direction: climateData.wind_direction,
      },
      pressure: {
        value: climateData.pressure,
        unit: 'hPa',
      },
      visibility: {
        value: climateData.visibility,
        unit: 'km',
      },
      cloudCover: {
        value: climateData.cloud_cover,
        unit: '%',
      },
      lastUpdated: new Date(climateData.date),
    };
  },

  // Transform feature data for map display
  transformFeatureData: (features) => {
    return features.map(feature => ({
      id: feature.id,
      type: feature.feature_type,
      name: feature.name,
      description: feature.description,
      geometry: feature.geometry,
      properties: feature.properties,
      analysis: feature.analysis,
    }));
  },
};

export { APIError };
export default {
  siteAnalysisAPI,
  climateAPI,
  geoUtils,
  fileUtils,
  errorUtils,
  dataUtils,
};
