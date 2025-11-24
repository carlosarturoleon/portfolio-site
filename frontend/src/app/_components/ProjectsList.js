'use client';

import { useEffect, useRef, useState } from 'react';
import BlogPostCard from './BlogPostCard';
import SearchBar from './SearchBar';
import { useProjectPosts } from '@/lib/hooks/useProjectPosts';

/**
 * ProjectsList component - displays project case studies using the blog infrastructure
 * Filters blog posts by "Projects" or "Case Studies" category
 * @param {number} pageSize - Number of projects to load per page (default: 12)
 */
export default function ProjectsList({ pageSize = 12 }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { posts, loading, error, hasMore, loadMore } = useProjectPosts(pageSize, searchQuery);
  const observerTarget = useRef(null);

  /**
   * Intersection Observer for infinite scroll
   * Loads more projects when the user scrolls near the bottom
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading, loadMore]);

  return (
    <div>
      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search projects"
      />

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-400 mb-600">
          <p className="text-5 text-red-700">
            <strong>Error:</strong> {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-300 text-5 text-red-700 underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-400 lg:gap-600">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Loading State - Initial */}
      {loading && posts.length === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-400 lg:gap-600">
          {[...Array(pageSize)].map((_, i) => (
            <div
              key={i}
              className="bg-neutral-50 border border-neutral-100 rounded-lg overflow-hidden animate-pulse"
            >
              <div className="w-full h-[240px] bg-neutral-200" />
              <div className="p-400">
                <div className="h-[20px] bg-neutral-200 rounded mb-200 w-1/3" />
                <div className="h-[24px] bg-neutral-200 rounded mb-200 w-3/4" />
                <div className="h-[16px] bg-neutral-200 rounded mb-100 w-full" />
                <div className="h-[16px] bg-neutral-200 rounded mb-300 w-2/3" />
                <div className="h-[32px] bg-neutral-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Loading State - More Projects */}
      {loading && posts.length > 0 && (
        <div className="mt-600 text-center">
          <div className="inline-flex items-center gap-200 text-5 text-neutral-600">
            <div className="w-[20px] h-[20px] border-2 border-brand-blue-500 border-t-transparent rounded-full animate-spin" />
            Loading more projects...
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && posts.length === 0 && !error && (
        <div className="text-center py-800">
          <div className="max-w-[400px] mx-auto">
            {searchQuery ? (
              <>
                <h2 className="text-3 text-neutral-900 mb-200">No results found</h2>
                <p className="text-5 text-neutral-600">
                  No projects match &quot;{searchQuery}&quot;. Try a different search term.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-3 text-neutral-900 mb-200">No projects yet</h2>
                <p className="text-5 text-neutral-600">
                  Project case studies will be showcased here soon. Check back later!
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Intersection Observer Target */}
      <div ref={observerTarget} className="h-[20px]" />
    </div>
  );
}
