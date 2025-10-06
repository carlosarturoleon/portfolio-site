from rest_framework import generics, filters
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from .models import Post, Author, Category, Tag
from .serializers import (
    PostSerializer,
    AuthorSerializer,
    CategorySerializer,
    TagSerializer
)


class PostPagination(PageNumberPagination):
    """Custom pagination class for Post list endpoint"""
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class PostListAPIView(generics.ListAPIView):
    """
    List all published posts with pagination and filtering.

    Query parameters:
    - categories__slug: Filter by category slug
    - tags__slug: Filter by tag slug
    - search: Search in title and content
    - ordering: Order by fields (e.g., -published_date, created_date)
    - page: Page number (default: 1)
    - page_size: Number of results per page (default: 10, max: 100)
    """
    serializer_class = PostSerializer
    pagination_class = PostPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = {
        'categories__slug': ['exact'],
        'tags__slug': ['exact'],
        'is_published': ['exact'],
        'author__id': ['exact'],
    }
    search_fields = ['title', 'content', 'meta_description']
    ordering_fields = ['created_date', 'published_date', 'updated_date', 'title']
    ordering = ['-published_date']

    def get_queryset(self):
        """Only return published posts, prefetch related data for performance"""
        return Post.objects.filter(
            is_published=True
        ).select_related(
            'author'
        ).prefetch_related(
            'categories',
            'tags'
        )


class PostDetailAPIView(generics.RetrieveAPIView):
    """
    Retrieve a single post by slug.
    Only returns published posts.
    """
    serializer_class = PostSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        """Only return published posts, prefetch related data for performance"""
        return Post.objects.filter(
            is_published=True
        ).select_related(
            'author'
        ).prefetch_related(
            'categories',
            'tags'
        )


class AuthorListAPIView(generics.ListAPIView):
    """List all authors"""
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'bio', 'email']
    ordering_fields = ['name', 'created_date']
    ordering = ['name']


class AuthorDetailAPIView(generics.RetrieveAPIView):
    """Retrieve a single author by ID"""
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


class CategoryListAPIView(generics.ListAPIView):
    """List all categories"""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_date']
    ordering = ['name']


class CategoryDetailAPIView(generics.RetrieveAPIView):
    """Retrieve a single category by slug"""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'


class TagListAPIView(generics.ListAPIView):
    """List all tags"""
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['name', 'created_date']
    ordering = ['name']


class TagDetailAPIView(generics.RetrieveAPIView):
    """Retrieve a single tag by slug"""
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    lookup_field = 'slug'


