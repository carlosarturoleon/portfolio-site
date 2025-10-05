from django.core.management.base import BaseCommand
from django.utils import timezone
from blog.models import Author, Category, Tag, Post


class Command(BaseCommand):
    help = 'Create sample data for blog app'

    def handle(self, *args, **kwargs):
        self.stdout.write('Creating sample data...\n')

        # Create Author
        author, created = Author.objects.get_or_create(
            email='john.doe@example.com',
            defaults={
                'name': 'John Doe',
                'bio': 'Full-stack developer and tech enthusiast. Passionate about Django, React, and cloud technologies.',
                'profile_image': 'https://ui-avatars.com/api/?name=John+Doe&size=200'
            }
        )
        if created:
            self.stdout.write(self.style.SUCCESS(f'✓ Created author: {author.name}'))
        else:
            self.stdout.write(f'  Author already exists: {author.name}')

        # Create Categories
        categories_data = [
            {
                'name': 'Technology',
                'slug': 'technology',
                'description': 'Latest trends and insights in technology'
            },
            {
                'name': 'Web Development',
                'slug': 'web-development',
                'description': 'Web development tutorials and best practices'
            },
            {
                'name': 'Cloud Computing',
                'slug': 'cloud-computing',
                'description': 'Cloud architecture and AWS services'
            },
        ]

        categories = []
        for cat_data in categories_data:
            cat, created = Category.objects.get_or_create(
                slug=cat_data['slug'],
                defaults=cat_data
            )
            categories.append(cat)
            if created:
                self.stdout.write(self.style.SUCCESS(f'✓ Created category: {cat.name}'))
            else:
                self.stdout.write(f'  Category already exists: {cat.name}')

        # Create Tags
        tags_data = [
            {'name': 'Django', 'slug': 'django'},
            {'name': 'React', 'slug': 'react'},
            {'name': 'Python', 'slug': 'python'},
            {'name': 'AWS', 'slug': 'aws'},
            {'name': 'PostgreSQL', 'slug': 'postgresql'},
            {'name': 'Docker', 'slug': 'docker'},
        ]

        tags = []
        for tag_data in tags_data:
            tag, created = Tag.objects.get_or_create(
                slug=tag_data['slug'],
                defaults=tag_data
            )
            tags.append(tag)
            if created:
                self.stdout.write(self.style.SUCCESS(f'✓ Created tag: {tag.name}'))
            else:
                self.stdout.write(f'  Tag already exists: {tag.name}')

        # Create Posts
        posts_data = [
            {
                'title': 'Getting Started with Django REST Framework',
                'slug': 'getting-started-django-rest-framework',
                'content': '''# Introduction

Django REST Framework (DRF) is a powerful toolkit for building Web APIs in Django. In this tutorial, we'll explore the basics of setting up a REST API.

## Why Django REST Framework?

- **Serialization**: Easily convert complex data types to JSON
- **Authentication**: Built-in support for various authentication schemes
- **Browsable API**: Automatically generated API documentation

## Installation

```python
pip install djangorestframework
```

## Conclusion

Django REST Framework makes API development fast and efficient.''',
                'meta_description': 'Learn how to build REST APIs with Django REST Framework',
                'reading_time': 5,
                'categories': [categories[0], categories[1]],
                'tags': [tags[0], tags[2]],
            },
            {
                'title': 'Building a Full-Stack App with React and Django',
                'slug': 'building-fullstack-app-react-django',
                'content': '''# Full-Stack Development

Combining React and Django creates a powerful full-stack solution.

## Frontend: React

React provides a modern, component-based approach to building user interfaces.

## Backend: Django

Django offers a robust backend with ORM, authentication, and admin interface.

## Connecting the Stack

Use Django REST Framework to create APIs that React can consume.''',
                'meta_description': 'Complete guide to building full-stack applications',
                'reading_time': 8,
                'categories': [categories[1]],
                'tags': [tags[0], tags[1], tags[2]],
            },
            {
                'title': 'Deploying Django Apps on AWS with Docker',
                'slug': 'deploying-django-aws-docker',
                'content': '''# Cloud Deployment

Learn how to deploy Django applications on AWS using Docker containers.

## AWS Services

- **App Runner**: Containerized application deployment
- **RDS**: Managed PostgreSQL database
- **S3**: Static file storage
- **CloudFront**: Content delivery network

## Docker Setup

Containerize your Django app for consistent deployments.

```dockerfile
FROM python:3.11
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
```''',
                'meta_description': 'Deploy Django applications to AWS using Docker',
                'reading_time': 10,
                'categories': [categories[2]],
                'tags': [tags[0], tags[3], tags[5]],
            },
            {
                'title': 'PostgreSQL Best Practices for Django',
                'slug': 'postgresql-best-practices-django',
                'content': '''# Database Optimization

PostgreSQL is a powerful database that pairs perfectly with Django.

## Indexing Strategies

- Use database indexes for frequently queried fields
- Leverage composite indexes for multiple field queries
- GIN indexes for full-text search

## Query Optimization

Use `select_related()` and `prefetch_related()` to reduce database queries.''',
                'meta_description': 'Optimize PostgreSQL databases in Django applications',
                'reading_time': 6,
                'categories': [categories[1]],
                'tags': [tags[0], tags[2], tags[4]],
            },
            {
                'title': 'Advanced React Patterns for 2024',
                'slug': 'advanced-react-patterns-2024',
                'content': '''# Modern React Development

Explore the latest patterns and best practices in React development.

## Hooks

Custom hooks enable code reuse and separation of concerns.

## Server Components

React Server Components offer new ways to render on the server.

## Performance

Optimize rendering with `memo`, `useMemo`, and `useCallback`.''',
                'meta_description': 'Latest React patterns and best practices',
                'reading_time': 7,
                'categories': [categories[0], categories[1]],
                'tags': [tags[1]],
            },
        ]

        for i, post_data in enumerate(posts_data, 1):
            categories_to_add = post_data.pop('categories')
            tags_to_add = post_data.pop('tags')

            post, created = Post.objects.get_or_create(
                slug=post_data['slug'],
                defaults={
                    **post_data,
                    'author': author,
                    'is_published': True,
                    'published_date': timezone.now() - timezone.timedelta(days=i),
                }
            )

            if created:
                post.categories.set(categories_to_add)
                post.tags.set(tags_to_add)
                self.stdout.write(self.style.SUCCESS(f'✓ Created post: {post.title}'))
            else:
                self.stdout.write(f'  Post already exists: {post.title}')

        self.stdout.write(self.style.SUCCESS('\n✅ Sample data creation complete!'))
        self.stdout.write('\nYou can now:')
        self.stdout.write('1. Access the API at: http://127.0.0.1:8000/api/posts/')
        self.stdout.write('2. Access admin at: http://127.0.0.1:8000/secure-admin-panel/')
