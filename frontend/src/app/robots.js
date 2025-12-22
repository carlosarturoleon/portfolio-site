/**
 * Robots.txt configuration for carlosleon.tech
 * This file is automatically processed by Next.js to generate robots.txt
 * Learn more: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://carlosleon.tech';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',                    // Disallow API routes
          '/newsletter/confirm/',     // Disallow newsletter confirmation pages
          '/newsletter/unsubscribe/', // Disallow unsubscribe pages
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
