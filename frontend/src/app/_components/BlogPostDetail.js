'use client';

import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

/**
 * BlogPostDetail component - displays a single blog post with full content
 * @param {Object} post - Blog post data from API
 */
export default function BlogPostDetail({ post }) {
  if (!post) return null;

  const {
    title,
    content,
    featured_image,
    author,
    published_date,
    updated_date,
    reading_time,
    categories = [],
    tags = [],
    meta_description,
  } = post;

  // Format dates
  const formattedPublishedDate = new Date(published_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedUpdatedDate = updated_date
    ? new Date(updated_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  // Get dynamic CTA content based on post category
  const getCTAContent = (categories) => {
    const categoryName = categories[0].name.toLowerCase();

    if (categoryName.includes('data analytics') || categoryName.includes('analytics')) {
      return {
        heading: 'Transform Your Data into Revenue Driving Insights',
        description: "I help businesses unlock the full potential of their data from pipeline optimization to custom transformation workflows that deliver measurable ROI. Whether you're struggling with data silos or need scalable analytics infrastructure, let's build a solution tailored to your goals.",
      };
    }

    if (categoryName.includes('software development') || categoryName.includes('development') || categoryName.includes('software')) {
      return {
        heading: 'Bring Your Next Web Project to Life',
        description: "I build robust, scalable web applications using modern full stack technologies. Whether you need a customer facing portal, an internal dashboard, or a complex SaaS platform, I deliver end to end solutions with clean code, maintainable architecture, and seamless user experiences.",
      };
    }

    if (categoryName.includes('data engineering') || categoryName.includes('engineering')) {
      return {
        heading: 'Build Data Infrastructure That Scales with Your Business',
        description: "I architect enterprise grade data pipelines that are built for performance, cost efficiency, and long term growth. Stop wasting budget on inefficient workflows get a data engineering solution designed to handle your toughest challenges and scale as you grow.",
      };
    }

    // Default fallback
    return {
      heading: "Let's Build Something Great Together",
      description: "Whether you need analytics infrastructure, custom web applications, or scalable data pipelines, I deliver end to end solutions that drive real business results. Let's discuss how I can help solve your technical challenges and accelerate your growth.",
    };
  };

  const ctaContent = getCTAContent(categories);

  return (
    <article className="max-w-[800px] mx-auto">
      {/* Breadcrumb Navigation */}
      <nav className="mb-400 text-6 text-neutral-500">
        <Link href="/blog" className="hover:text-brand-blue-500 transition-colors">
          Blog
        </Link>
        <span className="mx-100">/</span>
        <span className="text-neutral-900">{title}</span>
      </nav>

      {/* Title */}
      <h1 className="text-1 text-neutral-900 mb-300">{title}</h1>

      {/* Meta Description */}
      {meta_description && (
        <p className="text-4 text-neutral-600 mb-400">{meta_description}</p>
      )}

      {/* Author and Meta Info */}
      <div className="flex items-center justify-between pb-400 mb-600 border-b border-neutral-100">
        <div className="flex items-center gap-200">
          {author?.profile_image && (
            <div className="relative w-[48px] h-[48px] rounded-full overflow-hidden">
              <Image
                src={author.profile_image}
                alt={author.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div>
            <p className="text-5 text-neutral-900 font-medium">{author?.name}</p>
            <div className="flex items-center gap-200 text-6 text-neutral-500">
              <time dateTime={published_date}>{formattedPublishedDate}</time>
              {reading_time > 0 && (
                <>
                  <span>•</span>
                  <span>{reading_time} min read</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-100 mb-300">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/blog?category=${category.slug}`}
              className="inline-block text-6 text-brand-blue-500 bg-brand-blue-50 px-200 py-050 rounded hover:bg-brand-blue-100 transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}

      {/* Featured Image */}
      {featured_image && (
        <div className="relative w-full aspect-video mb-600 rounded-lg overflow-hidden">
          <Image
            src={featured_image}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 800px) 100vw, 800px"
          />
        </div>
      )}

      {/* Blog Content */}
      <div className="blog-content mb-800">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-2 text-neutral-900 font-bold mt-800 mb-400 first:mt-0">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-3 text-neutral-900 font-bold mt-600 mb-300">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-4 text-neutral-900 font-semibold mt-500 mb-200">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-5 text-neutral-700 leading-relaxed mb-400">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside text-5 text-neutral-700 mb-400 space-y-100 ml-200">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside text-5 text-neutral-700 mb-400 space-y-100 ml-200">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="text-5 text-neutral-700">{children}</li>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                className="text-brand-blue-500 hover:text-brand-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-brand-blue-500 pl-400 py-200 my-400 text-5 text-neutral-600 italic bg-neutral-50">
                {children}
              </blockquote>
            ),
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <div className="my-400 rounded-lg overflow-hidden">
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      borderRadius: '8px',
                      fontSize: '14px',
                      padding: '16px',
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code className="bg-neutral-100 text-brand-blue-600 px-100 py-050 rounded text-6 font-mono">
                  {children}
                </code>
              );
            },
            pre: ({ children }) => <div className="my-400">{children}</div>,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      {/* Updated Date */}
      {formattedUpdatedDate && formattedUpdatedDate !== formattedPublishedDate && (
        <p className="text-6 text-neutral-500 mb-600">
          Last updated: {formattedUpdatedDate}
        </p>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="pt-600 border-t border-neutral-100">
          <h3 className="text-6 text-neutral-500 font-medium mb-200">Tags</h3>
          <div className="flex flex-wrap gap-100">
            {tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/blog?tag=${tag.slug}`}
                className="inline-block text-6 text-neutral-600 bg-neutral-50 px-200 py-050 rounded hover:bg-neutral-100 transition-colors"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Call-to-Action Section */}
      <div className="mt-800 p-600 bg-brand-blue-50 rounded-lg border border-brand-blue-100">
        <h3 className="text-3 text-neutral-900 font-bold mb-300">
          {ctaContent.heading}
        </h3>
        <p className="text-5 text-neutral-700 mb-400 leading-relaxed">
          {ctaContent.description}
        </p>
        <div className="flex flex-wrap gap-300">
          <Link
            href="/contact"
            className="inline-block bg-brand-blue-500 text-white text-5 font-medium px-400 py-200 rounded-lg hover:bg-brand-blue-600 transition-colors"
          >
            Schedule a Consultation
          </Link>
          <Link
            href="/projects"
            className="inline-block bg-white text-brand-blue-500 text-5 font-medium px-400 py-200 rounded-lg border border-brand-blue-500 hover:bg-brand-blue-50 transition-colors"
          >
            View My Work
          </Link>
        </div>
      </div>

      {/* Author Bio */}
      {author?.bio && (
        <div className="mt-800 pt-600 border-t border-neutral-100">
          <div className="flex gap-400">
            {author.profile_image && (
              <div className="relative w-[80px] h-[80px] rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={author.profile_image}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h3 className="text-4 text-neutral-900 font-medium mb-100">
                About {author.name}
              </h3>
              <p className="text-5 text-neutral-600">{author.bio}</p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
