/**
 * API utilities for fetching data from Django backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Generic fetch wrapper with error handling
 * @param {string} endpoint - API endpoint path (e.g., '/api/posts/')
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<any>} - Response data
 */
export async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
}

/**
 * Fetch paginated blog posts
 * @param {number} page - Page number (default: 1)
 * @param {number} pageSize - Number of posts per page (default: 10)
 * @param {Object} filters - Optional filters (categories, tags, search)
 * @returns {Promise<Object>} - Paginated response with count, next, previous, results
 */
export async function fetchPosts(page = 1, pageSize = 10, filters = {}) {
  const params = new URLSearchParams({
    page: page.toString(),
    page_size: pageSize.toString(),
    ...filters,
  });

  return apiFetch(`/api/posts/?${params.toString()}`);
}

/**
 * Fetch a single blog post by slug
 * @param {string} slug - Post slug
 * @returns {Promise<Object>} - Post data
 */
export async function fetchPost(slug) {
  return apiFetch(`/api/posts/${slug}/`);
}

/**
 * Fetch all categories
 * @returns {Promise<Array>} - List of categories
 */
export async function fetchCategories() {
  return apiFetch('/api/categories/');
}

/**
 * Fetch a single category by slug
 * @param {string} slug - Category slug
 * @returns {Promise<Object>} - Category data
 */
export async function fetchCategory(slug) {
  return apiFetch(`/api/categories/${slug}/`);
}

/**
 * Fetch all tags
 * @returns {Promise<Array>} - List of tags
 */
export async function fetchTags() {
  return apiFetch('/api/tags/');
}

/**
 * Fetch a single tag by slug
 * @param {string} slug - Tag slug
 * @returns {Promise<Object>} - Tag data
 */
export async function fetchTag(slug) {
  return apiFetch(`/api/tags/${slug}/`);
}
