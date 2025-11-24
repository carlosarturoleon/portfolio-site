'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchPosts } from '../api';

/**
 * Custom hook for fetching project posts (blog posts filtered by "Projects" category)
 * @param {number} pageSize - Number of projects to fetch per page
 * @param {string} searchQuery - Optional search query to filter projects
 * @returns {Object} - Posts data, loading states, and fetch functions
 */
export function useProjectPosts(pageSize = 12, searchQuery = '') {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  // Use ref to track if initial fetch has happened
  const initialFetchDone = useRef(false);

  /**
   * Load more projects (for pagination or infinite scroll)
   * Filters by "Projects" or "Case Studies" category
   */
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch posts filtered by "Projects" category using category slug
      // Backend expects: categories__slug=projects
      const filters = {
        categories__slug: 'projects',
      };

      if (searchQuery) {
        filters.search = searchQuery;
      }

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
      setError(err.message || 'Failed to load projects');
      console.error('Error loading projects:', err);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, loading, hasMore, searchQuery]);

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
   * Reset when search query changes
   */
  useEffect(() => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
    setError(null);
    initialFetchDone.current = false;
  }, [searchQuery]);

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
