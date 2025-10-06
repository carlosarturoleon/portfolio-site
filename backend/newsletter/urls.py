from django.urls import path
from .views import (
    SubscribeAPIView,
    ConfirmSubscriptionAPIView,
    UnsubscribeAPIView,
)

urlpatterns = [
    path('subscribe/', SubscribeAPIView.as_view(), name='newsletter-subscribe'),
    path('confirm/<uuid:token>/', ConfirmSubscriptionAPIView.as_view(), name='newsletter-confirm'),
    path('unsubscribe/<uuid:token>/', UnsubscribeAPIView.as_view(), name='newsletter-unsubscribe'),
]
