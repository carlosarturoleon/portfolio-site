from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from blog.models import Post


class BlogPostSitemap(Sitemap):
    """Sitemap for blog posts"""
    changefreq = "weekly"
    priority = 0.8

    def items(self):
        return Post.objects.filter(is_published=True).order_by('-published_date')

    def lastmod(self, obj):
        return obj.updated_date

    def location(self, obj):
        return f'/posts/{obj.slug}/'


class StaticViewSitemap(Sitemap):
    """Sitemap for static pages"""
    priority = 0.5
    changefreq = 'monthly'

    def items(self):
        return ['home', 'blog', 'newsletter']

    def location(self, item):
        if item == 'home':
            return '/'
        elif item == 'blog':
            return '/blog/'
        elif item == 'newsletter':
            return '/newsletter/'
