from django.db import models
from django.utils import timezone
import uuid


class Subscriber(models.Model):
    """Newsletter subscriber model"""
    email = models.EmailField(unique=True)
    is_confirmed = models.BooleanField(default=False)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    confirmed_at = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-subscribed_at']

    def __str__(self):
        return self.email


class SubscriptionToken(models.Model):
    """Token for email confirmation and unsubscribe links"""
    TOKEN_TYPE_CHOICES = [
        ('confirm', 'Confirmation'),
        ('unsubscribe', 'Unsubscribe'),
    ]

    subscriber = models.ForeignKey(Subscriber, on_delete=models.CASCADE, related_name='tokens')
    token = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    token_type = models.CharField(max_length=20, choices=TOKEN_TYPE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_used = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.token_type} token for {self.subscriber.email}"

    def is_valid(self):
        """Check if token is still valid"""
        return not self.is_used and timezone.now() < self.expires_at

    def mark_as_used(self):
        """Mark token as used"""
        self.is_used = True
        self.save()
