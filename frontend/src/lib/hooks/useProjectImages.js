'use client';

import { useState, useEffect } from 'react';
import { fetchPosts } from '../api';

/**
 * Custom hook for fetching project images from posts with "Projects" category
 * Returns only posts with featured images for the portfolio carousel
 * @returns {Object} - Projects with images, loading state, and error
 */
export function useProjectImages() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch projects with featured images
        const data = await fetchPosts(1, 10, {
          categories__slug: 'projects',
        });

        // Filter to only include posts with featured images
        const projectsWithImages = data.results
          .filter(post => post.featured_image)
          .map(post => ({
            id: post.id,
            image: post.featured_image,
            alt: post.title,
            slug: post.slug,
            title: post.title,
          }));

        setProjects(projectsWithImages);
      } catch (err) {
        setError(err.message || 'Failed to load projects');
        console.error('Error loading project images:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return {
    projects,
    loading,
    error,
  };
}
