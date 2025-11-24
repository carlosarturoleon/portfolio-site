'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import BlogPostCard from './BlogPostCard';
import SearchBar from './SearchBar';
import { usePosts } from '@/lib/hooks/usePosts';

/**
 * BlogPostList component - displays a list of blog posts with infinite scroll
 * @param {number} pageSize - Number of posts to load per page (default: 10)
 * @param {string} categorySlug - Optional category slug to filter posts
 * @param {string} tagSlug - Optional tag slug to filter posts
 * @param {string} categoryName - Optional category name for display
 * @param {string} tagName - Optional tag name for display
 */
export default function BlogPostList({
  pageSize = 10,
  categorySlug = '',
  tagSlug = '',
  categoryName = '',
  tagName = ''
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const { posts, loading, error, hasMore, loadMore } = usePosts(
    pageSize,
    searchQuery,
    categorySlug,
    tagSlug
  );
  const observerTarget = useRef(null);

  /**
   * Intersection Observer for infinite scroll
   * Loads more posts when the user scrolls near the bottom
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
        placeholder="Search blog posts"
      />

      {/* Active Filters */}
      {(categoryName || tagName) && (
        <div className="mb-400 flex flex-wrap items-center gap-200">
          <span className="text-6 text-neutral-600">Filtered by:</span>
          {categoryName && (
            <div className="inline-flex items-center gap-100 bg-brand-blue-50 text-brand-blue-700 px-300 py-100 rounded-lg border border-brand-blue-200">
              <span className="text-6 font-medium">Category: {categoryName}</span>
              <Link
                href="/blog"
                className="text-brand-blue-500 hover:text-brand-blue-700 transition-colors"
                aria-label="Clear category filter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          )}
          {tagName && (
            <div className="inline-flex items-center gap-100 bg-neutral-100 text-neutral-700 px-300 py-100 rounded-lg border border-neutral-200">
              <span className="text-6 font-medium">Tag: #{tagName}</span>
              <Link
                href="/blog"
                className="text-neutral-500 hover:text-neutral-700 transition-colors"
                aria-label="Clear tag filter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      )}

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

      {/* Posts Grid */}
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

      {/* Loading State - More Posts */}
      {loading && posts.length > 0 && (
        <div className="mt-600 text-center">
          <div className="inline-flex items-center gap-200 text-5 text-neutral-600">
            <div className="w-[20px] h-[20px] border-2 border-brand-blue-500 border-t-transparent rounded-full animate-spin" />
            Loading more posts...
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
                  No blog posts match &quot;{searchQuery}&quot;. Try a different search term.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-3 text-neutral-900 mb-200">No posts yet</h2>
                <p className="text-5 text-neutral-600">
                  Check back soon for new content!
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
