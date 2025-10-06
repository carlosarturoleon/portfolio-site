from django.urls import path
from .views import (
    PostListAPIView,
    PostDetailAPIView,
    PostMetadataAPIView,
    AuthorListAPIView,
    AuthorDetailAPIView,
    CategoryListAPIView,
    CategoryDetailAPIView,
    TagListAPIView,
    TagDetailAPIView,
)

app_name = 'blog'

urlpatterns = [
    # Post endpoints
    path('posts/', PostListAPIView.as_view(), name='post-list'),
    path('posts/<slug:slug>/', PostDetailAPIView.as_view(), name='post-detail'),
    path('posts/<slug:slug>/metadata/', PostMetadataAPIView.as_view(), name='post-metadata'),

    # Author endpoints
    path('authors/', AuthorListAPIView.as_view(), name='author-list'),
    path('authors/<int:pk>/', AuthorDetailAPIView.as_view(), name='author-detail'),

    # Category endpoints
    path('categories/', CategoryListAPIView.as_view(), name='category-list'),
    path('categories/<slug:slug>/', CategoryDetailAPIView.as_view(), name='category-detail'),

    # Tag endpoints
    path('tags/', TagListAPIView.as_view(), name='tag-list'),
    path('tags/<slug:slug>/', TagDetailAPIView.as_view(), name='tag-detail'),
]
