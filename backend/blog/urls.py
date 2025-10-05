from django.urls import path
from .views import (
    PostListAPIView,
    PostDetailAPIView,
    AuthorListAPIView,
    AuthorDetailAPIView,
    CategoryListAPIView,
    CategoryDetailAPIView,
    TagListAPIView,
    TagDetailAPIView,
    SubscriberCreateAPIView,
)

app_name = 'blog'

urlpatterns = [
    # Post endpoints
    path('posts/', PostListAPIView.as_view(), name='post-list'),
    path('posts/<slug:slug>/', PostDetailAPIView.as_view(), name='post-detail'),

    # Author endpoints
    path('authors/', AuthorListAPIView.as_view(), name='author-list'),
    path('authors/<int:pk>/', AuthorDetailAPIView.as_view(), name='author-detail'),

    # Category endpoints
    path('categories/', CategoryListAPIView.as_view(), name='category-list'),
    path('categories/<slug:slug>/', CategoryDetailAPIView.as_view(), name='category-detail'),

    # Tag endpoints
    path('tags/', TagListAPIView.as_view(), name='tag-list'),
    path('tags/<slug:slug>/', TagDetailAPIView.as_view(), name='tag-detail'),

    # Subscriber endpoints
    path('subscribers/', SubscriberCreateAPIView.as_view(), name='subscriber-create'),
]
