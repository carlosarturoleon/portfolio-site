from django.db import models
from django.utils import timezone
from django.contrib.postgres.indexes import GinIndex
from markdownx.models import MarkdownxField


class Author(models.Model):
    name = models.CharField(max_length=200)
    bio = models.TextField(blank=True)
    email = models.EmailField(unique=True)
    profile_image = models.URLField(max_length=500, blank=True)
    created_date = models.DateTimeField(default=timezone.now)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    created_date = models.DateTimeField(default=timezone.now)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ['name']


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=50, unique=True)
    created_date = models.DateTimeField(default=timezone.now)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


class Post(models.Model):
    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=250, unique=True)
    content = MarkdownxField()
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='posts')
    categories = models.ManyToManyField(Category, related_name='posts', blank=True)
    tags = models.ManyToManyField(Tag, related_name='posts', blank=True)
    created_date = models.DateTimeField(default=timezone.now)
    published_date = models.DateTimeField(default=timezone.now)
    updated_date = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False)
    featured_image = models.URLField(max_length=500, blank=True)
    meta_description = models.CharField(max_length=160, blank=True)
    reading_time = models.IntegerField(default=0, help_text='Reading time in minutes')

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-published_date']
        indexes = [
            models.Index(fields=['-published_date']),
            models.Index(fields=['is_published']),
            models.Index(fields=['is_published', '-published_date']),  # Composite index for common query
            models.Index(fields=['author']),
            # Slug index removed - unique=True already creates an index
            GinIndex(fields=['title'], name='blog_post_title_gin_idx', opclasses=['gin_trgm_ops']),
            GinIndex(fields=['content'], name='blog_post_content_gin_idx', opclasses=['gin_trgm_ops']),
        ]


