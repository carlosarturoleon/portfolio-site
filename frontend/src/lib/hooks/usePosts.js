'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchPosts } from '../api';

/**
 * Custom hook for fetching blog posts with infinite scroll support
 * @param {number} pageSize - Number of posts to fetch per page
 * @param {string} searchQuery - Optional search query to filter posts
 * @param {string} categorySlug - Optional category slug to filter posts
 * @param {string} tagSlug - Optional tag slug to filter posts
 * @returns {Object} - Posts data, loading states, and fetch functions
 */
export function usePosts(pageSize = 10, searchQuery = '', categorySlug = '', tagSlug = '') {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  // Use ref to track if initial fetch has happened
  const initialFetchDone = useRef(false);

  /**
   * Load more posts (for pagination or infinite scroll)
   */
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const filters = {};
      if (searchQuery) filters.search = searchQuery;
      if (categorySlug) filters.categories__slug = categorySlug;
      if (tagSlug) filters.tags__slug = tagSlug;

      const data = await fetchPosts(page, pageSize, filters);

      setPosts((prevPosts) => {
        // Avoid duplicates by checking if posts already exist
        const existingIds = new Set(prevPosts.map(p => p.id));
        const newPosts = data.results.filter(p => !existingIds.has(p.id));
        return [...prevPosts, ...newPosts];
      });

      setHasMore(!!data.next);
      setTotalCount(data.count);
      setPage((prevPage) => prevPage + 1);
    } catch (err) {
      setError(err.message || 'Failed to load posts');
      console.error('Error loading posts:', err);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, loading, hasMore, searchQuery, categorySlug, tagSlug]);

  /**
   * Reset and refetch from beginning
   */
  const refresh = useCallback(async () => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
    setError(null);
    initialFetchDone.current = false;
  }, []);

  /**
   * Reset when search query or filters change
   */
  useEffect(() => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
    setError(null);
    initialFetchDone.current = false;
  }, [searchQuery, categorySlug, tagSlug]);

  /**
   * Initial load
   */
  useEffect(() => {
    if (!initialFetchDone.current) {
      initialFetchDone.current = true;
      loadMore();
    }
  }, [loadMore]);

  return {
    posts,
    loading,
    error,
    hasMore,
    totalCount,
    loadMore,
    refresh,
  };
}
