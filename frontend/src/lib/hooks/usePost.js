'use client';

import { useState, useEffect } from 'react';
import { fetchPost } from '../api';

/**
 * Custom hook for fetching a single blog post by slug
 * @param {string} slug - Post slug
 * @returns {Object} - Post data, loading state, and error
 */
export function usePost(slug) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const loadPost = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchPost(slug);
        setPost(data);
      } catch (err) {
        setError(err.message || 'Failed to load post');
        console.error('Error loading post:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  return {
    post,
    loading,
    error,
  };
}
