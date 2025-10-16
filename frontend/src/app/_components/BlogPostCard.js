'use client';

import Link from 'next/link';
import Image from 'next/image';

/**
 * BlogPostCard component - displays a single blog post in a card format
 * @param {Object} post - Blog post data from API
 */
export default function BlogPostCard({ post }) {
  const {
    slug,
    title,
    meta_description,
    featured_image,
    author,
    published_date,
    reading_time,
    categories = [],
    tags = [],
  } = post;

  // Format date
  const formattedDate = new Date(published_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="bg-neutral-0 border border-neutral-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Featured Image */}
      {featured_image && (
        <Link href={`/blog/${slug}`}>
          <div className="relative w-full h-[240px] bg-neutral-100">
            <Image
              src={featured_image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
      )}

      {/* Content */}
      <div className="p-400">
        {/* Title */}
        <Link href={`/blog/${slug}`}>
          <h2 className="text-3 text-neutral-900 hover:text-brand-blue-500 transition-colors mb-200">
            {title}
          </h2>
        </Link>

        {/* Meta Description */}
        {meta_description && (
          <p className="text-5 text-neutral-600 mb-300">
            {meta_description}
          </p>
        )}

        {/* Author and Meta Info */}
        <div className="flex items-center justify-between pt-300 border-t border-neutral-100">
          <div className="flex items-center gap-200">
            {author?.profile_image && (
              <div className="relative w-[32px] h-[32px] rounded-full overflow-hidden">
                <Image
                  src={author.profile_image}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <p className="text-6 text-neutral-900 font-medium">{author?.name}</p>
              <p className="text-6 text-neutral-500">{formattedDate}</p>
            </div>
          </div>

          {/* Reading Time */}
          {reading_time > 0 && (
            <span className="text-6 text-neutral-500">
              {reading_time} min read
            </span>
          )}
        </div>

        {/* Categories and Tags */}
        {(categories.length > 0 || tags.length > 0) && (
          <div className="flex flex-wrap gap-100 mt-300">
            {categories.slice(0, 2).map((category) => (
              <span
                key={category.id}
                className="inline-block text-6 text-brand-blue-500 bg-brand-blue-50 px-200 py-050 rounded"
              >
                {category.name}
              </span>
            ))}
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="inline-block text-6 text-neutral-500 bg-neutral-50 px-200 py-050 rounded"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
