'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '../../_components/Header';
import Footer from '../../_components/Footer';
import BlogPostDetail from '../../_components/BlogPostDetail';
import { usePost } from '@/lib/hooks/usePost';

export default function BlogDetailPage({ params }) {
  const [slug, setSlug] = useState(null);

  // Unwrap params in useEffect since it's a Promise in Next.js 15
  useEffect(() => {
    params.then((resolvedParams) => {
      setSlug(resolvedParams.slug);
    });
  }, [params]);

  const { post, loading, error } = usePost(slug);

  return (
    <div className="min-h-screen bg-neutral-0 container-margin container-padding">
      <Header />
      <main className="py-800">
        <div className="max-w-[1110px] mx-auto">
          {/* Loading State */}
          {loading && (
            <div className="max-w-[800px] mx-auto">
              <div className="animate-pulse">
                {/* Breadcrumb skeleton */}
                <div className="h-[16px] bg-neutral-200 rounded w-[200px] mb-400" />

                {/* Category skeleton */}
                <div className="h-[24px] bg-neutral-200 rounded w-[100px] mb-300" />

                {/* Title skeleton */}
                <div className="h-[48px] bg-neutral-200 rounded mb-300" />
                <div className="h-[48px] bg-neutral-200 rounded w-3/4 mb-400" />

                {/* Meta skeleton */}
                <div className="h-[20px] bg-neutral-200 rounded w-full mb-300" />
                <div className="h-[20px] bg-neutral-200 rounded w-2/3 mb-400" />

                {/* Author skeleton */}
                <div className="flex items-center gap-200 pb-400 mb-600 border-b border-neutral-100">
                  <div className="w-[48px] h-[48px] bg-neutral-200 rounded-full" />
                  <div className="flex-1">
                    <div className="h-[16px] bg-neutral-200 rounded w-[120px] mb-100" />
                    <div className="h-[14px] bg-neutral-200 rounded w-[180px]" />
                  </div>
                </div>

                {/* Featured image skeleton */}
                <div className="w-full aspect-video bg-neutral-200 rounded-lg mb-600" />

                {/* Content skeleton */}
                <div className="space-y-200">
                  <div className="h-[16px] bg-neutral-200 rounded w-full" />
                  <div className="h-[16px] bg-neutral-200 rounded w-full" />
                  <div className="h-[16px] bg-neutral-200 rounded w-3/4" />
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="max-w-[800px] mx-auto">
              <div className="bg-red-50 border border-red-200 rounded-lg p-400">
                <h2 className="text-4 text-red-900 font-medium mb-200">
                  Failed to Load Post
                </h2>
                <p className="text-5 text-red-700 mb-300">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="text-5 text-red-700 underline hover:no-underline"
                >
                  Try again
                </button>
              </div>
            </div>
          )}

          {/* Post Content */}
          {!loading && !error && post && <BlogPostDetail post={post} />}

          {/* Not Found State */}
          {!loading && !error && !post && (
            <div className="max-w-[800px] mx-auto text-center py-800">
              <h1 className="text-2 text-neutral-900 mb-200">Post Not Found</h1>
              <p className="text-4 text-neutral-600 mb-400">
                The blog post you&apos;re looking for doesn&apos;t exist or has been removed.
              </p>
              <Link
                href="/blog"
                className="inline-block text-5 text-brand-blue-500 hover:text-brand-blue-600 underline"
              >
                Back to Blog
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
