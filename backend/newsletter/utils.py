from django.conf import settings
from django.core.mail import send_mail
from django.utils import timezone
from datetime import timedelta
from .models import SubscriptionToken


def send_confirmation_email(subscriber):
    """Send confirmation email to new subscriber"""
    # Create confirmation token (expires in 24 hours)
    token = SubscriptionToken.objects.create(
        subscriber=subscriber,
        token_type='confirm',
        expires_at=timezone.now() + timedelta(hours=24)
    )

    # Build confirmation URL
    confirmation_url = f"{settings.SITE_URL}/newsletter/confirm/{token.token}"

    # Send email
    send_mail(
        subject='Confirm your newsletter subscription',
        message=f'Please confirm your subscription by clicking: {confirmation_url}',
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[subscriber.email],
        fail_silently=False,
    )

    return token


def send_welcome_email(subscriber):
    """Send welcome email after confirmation"""
    send_mail(
        subject='Welcome to the newsletter!',
        message='Thank you for confirming your subscription. You will now receive our updates.',
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[subscriber.email],
        fail_silently=False,
    )


def create_unsubscribe_token(subscriber):
    """Create unsubscribe token (expires in 30 days)"""
    token = SubscriptionToken.objects.create(
        subscriber=subscriber,
        token_type='unsubscribe',
        expires_at=timezone.now() + timedelta(days=30)
    )
    return token
