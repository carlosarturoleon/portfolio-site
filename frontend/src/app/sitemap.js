/**
 * Dynamic sitemap generation for carlosleon.tech
 * This file is automatically processed by Next.js to generate sitemap.xml
 * Learn more: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://carlosleon.tech';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Fetch all blog post slugs from the backend
 */
async function fetchAllPostSlugs() {
  try {
    // Fetch all posts without pagination (or with a very high page_size)
    const response = await fetch(`${API_BASE_URL}/api/posts/?page_size=1000`);

    if (!response.ok) {
      console.error('Failed to fetch posts for sitemap');
      return [];
    }

    const data = await response.json();
    return data.results.map((post) => ({
      slug: post.slug,
      updated_at: post.updated_at || post.created_at,
      categories: post.categories || [],
    }));
  } catch (error) {
    console.error('Error fetching posts for sitemap:', error);
    return [];
  }
}

/**
 * Fetch all category slugs from the backend
 */
async function fetchAllCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/categories/`);

    if (!response.ok) {
      console.error('Failed to fetch categories for sitemap');
      return [];
    }

    const data = await response.json();
    return data.map((category) => ({
      slug: category.slug,
      name: category.name,
    }));
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error);
    return [];
  }
}

/**
 * Fetch all tag slugs from the backend
 */
async function fetchAllTags() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tags/`);

    if (!response.ok) {
      console.error('Failed to fetch tags for sitemap');
      return [];
    }

    const data = await response.json();
    return data.map((tag) => ({
      slug: tag.slug,
      name: tag.name,
    }));
  } catch (error) {
    console.error('Error fetching tags for sitemap:', error);
    return [];
  }
}

export default async function sitemap() {
  const currentDate = new Date().toISOString();

  // Static routes with their priorities and change frequencies
  const staticRoutes = [
    {
      url: SITE_URL,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Fetch dynamic content
  const [posts, categories, tags] = await Promise.all([
    fetchAllPostSlugs(),
    fetchAllCategories(),
    fetchAllTags(),
  ]);

  // Create blog post routes
  const blogRoutes = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updated_at || currentDate,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Create category filter routes
  const categoryRoutes = categories.map((category) => ({
    url: `${SITE_URL}/blog?category=${category.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  // Create tag filter routes
  const tagRoutes = tags.map((tag) => ({
    url: `${SITE_URL}/blog?tag=${tag.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  return [...staticRoutes, ...blogRoutes, ...categoryRoutes, ...tagRoutes];
}
