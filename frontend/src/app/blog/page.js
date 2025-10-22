'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../_components/Header';
import Footer from '../_components/Footer';
import BlogPostList from '../_components/BlogPostList';
import { fetchCategories, fetchTags } from '../../lib/api';

export default function BlogPage() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get('category') || '';
  const tagSlug = searchParams.get('tag') || '';

  const [categoryName, setCategoryName] = useState('');
  const [tagName, setTagName] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch category and tag names for display
  useEffect(() => {
    async function fetchFilterNames() {
      setLoading(true);
      try {
        if (categorySlug) {
          const response = await fetchCategories();
          // Handle both paginated response and array response
          const categories = Array.isArray(response) ? response : response.results || [];
          const category = categories.find((c) => c.slug === categorySlug);
          setCategoryName(category?.name || '');
        } else {
          setCategoryName('');
        }

        if (tagSlug) {
          const response = await fetchTags();
          // Handle both paginated response and array response
          const tags = Array.isArray(response) ? response : response.results || [];
          const tag = tags.find((t) => t.slug === tagSlug);
          setTagName(tag?.name || '');
        } else {
          setTagName('');
        }
      } catch (error) {
        console.error('Error fetching filter names:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFilterNames();
  }, [categorySlug, tagSlug]);

  // Dynamic page title based on filters
  const getPageTitle = () => {
    if (categoryName) return `${categoryName} - Blog`;
    if (tagName) return `Posts tagged "${tagName}" - Blog`;
    return 'Blog';
  };

  const getPageDescription = () => {
    if (categoryName) return `Blog posts in ${categoryName}`;
    if (tagName) return `Blog posts tagged with ${tagName}`;
    return 'Insights on data analytics, software engineering, and data engineering.';
  };

  return (
    <div className="min-h-screen bg-neutral-0 container-margin container-padding">
      <Header />
      <main className="py-800">
        <div className="max-w-[1110px] mx-auto">
          <div className="mb-600">
            <h1 className="text-1 text-neutral-900 mb-200">{getPageTitle()}</h1>
            <p className="text-4 text-neutral-600">
              {getPageDescription()}
            </p>
          </div>

          {!loading && (
            <BlogPostList
              pageSize={12}
              categorySlug={categorySlug}
              tagSlug={tagSlug}
              categoryName={categoryName}
              tagName={tagName}
            />
          )}

          {loading && (
            <div className="text-center py-800">
              <div className="inline-flex items-center gap-200 text-5 text-neutral-600">
                <div className="w-[20px] h-[20px] border-2 border-brand-blue-500 border-t-transparent rounded-full animate-spin" />
                Loading...
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
