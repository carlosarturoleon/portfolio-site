from django.contrib import admin
from .models import Subscriber, SubscriptionToken


@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ['email', 'is_confirmed', 'is_active', 'subscribed_at', 'confirmed_at']
    list_filter = ['is_confirmed', 'is_active', 'subscribed_at']
    search_fields = ['email']
    readonly_fields = ['subscribed_at', 'confirmed_at']
    ordering = ['-subscribed_at']


@admin.register(SubscriptionToken)
class SubscriptionTokenAdmin(admin.ModelAdmin):
    list_display = ['subscriber', 'token_type', 'token', 'is_used', 'created_at', 'expires_at']
    list_filter = ['token_type', 'is_used', 'created_at']
    search_fields = ['subscriber__email', 'token']
    readonly_fields = ['token', 'created_at']
    ordering = ['-created_at']
