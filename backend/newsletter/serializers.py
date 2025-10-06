from rest_framework import serializers
from .models import Subscriber, SubscriptionToken


class SubscriberSerializer(serializers.ModelSerializer):
    """Serializer for Subscriber model"""

    class Meta:
        model = Subscriber
        fields = ['id', 'email', 'is_confirmed', 'subscribed_at', 'confirmed_at', 'is_active']
        read_only_fields = ['id', 'is_confirmed', 'subscribed_at', 'confirmed_at', 'is_active']


class SubscribeSerializer(serializers.Serializer):
    """Serializer for newsletter subscription request"""
    email = serializers.EmailField(required=True)

    def validate_email(self, value):
        """Validate email format"""
        return value.lower().strip()
