const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * API Error class for structured error handling
 */
class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Get authentication token from localStorage
 */
const getAuthToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('authToken');
};

/**
 * Set authentication token in localStorage
 */
export const setAuthToken = (token) => {
  if (typeof window === 'undefined') return;
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
};

/**
 * Request interceptor - adds headers and auth token
 */
const requestInterceptor = (url, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return {
    ...options,
    headers,
  };
};

/**
 * Response interceptor - handles errors and parsing
 */
const responseInterceptor = async (response) => {
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');

  let data;
  if (isJson) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    // Handle unauthorized - clear token
    if (response.status === 401) {
      setAuthToken(null);
    }

    throw new APIError(
      data?.message || data?.detail || 'An error occurred',
      response.status,
      data
    );
  }

  return data;
};

/**
 * Base fetch wrapper for API requests
 * @param {string} endpoint - API endpoint (e.g., '/api/users')
 * @param {Object} options - Fetch options (method, body, headers, etc.)
 * @returns {Promise} - Response data
 */
export const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;

  try {
    const config = requestInterceptor(url, options);
    const response = await fetch(url, config);
    return await responseInterceptor(response);
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    // Network or other errors
    throw new APIError(
      error.message || 'Network error occurred',
      0,
      null
    );
  }
};

/**
 * HTTP method helpers
 */
export const api = {
  get: (endpoint, options = {}) => {
    return apiFetch(endpoint, { ...options, method: 'GET' });
  },

  post: (endpoint, data, options = {}) => {
    return apiFetch(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  put: (endpoint, data, options = {}) => {
    return apiFetch(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  patch: (endpoint, data, options = {}) => {
    return apiFetch(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  delete: (endpoint, options = {}) => {
    return apiFetch(endpoint, { ...options, method: 'DELETE' });
  },
};

export default api;
