from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils import timezone
from django.utils.html import strip_tags
from datetime import timedelta
from .models import SubscriptionToken


def send_confirmation_email(subscriber):
    """Send confirmation email to new subscriber using HTML templates"""
    # Create confirmation token (expires in 24 hours)
    token = SubscriptionToken.objects.create(
        subscriber=subscriber,
        token_type='confirm',
        expires_at=timezone.now() + timedelta(hours=24)
    )

    # Build confirmation URL
    confirmation_url = f"{settings.SITE_URL}/newsletter/confirm/{token.token}"

    # Context for templates
    context = {
        'confirmation_url': confirmation_url,
        'site_name': 'Carlos Leon Portfolio',
        'site_url': settings.SITE_URL,
    }

    # Render email templates
    html_content = render_to_string('newsletter/emails/confirmation.html', context)
    text_content = render_to_string('newsletter/emails/confirmation.txt', context)

    # Create email with both HTML and plain text versions
    email = EmailMultiAlternatives(
        subject='Confirm your newsletter subscription',
        body=text_content,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[subscriber.email]
    )
    email.attach_alternative(html_content, "text/html")
    email.send(fail_silently=False)

    return token


def send_welcome_email(subscriber):
    """Send welcome email after confirmation with unsubscribe link using HTML templates"""
    # Create unsubscribe token (expires in 30 days)
    unsubscribe_token = create_unsubscribe_token(subscriber)
    unsubscribe_url = f"{settings.SITE_URL}/newsletter/unsubscribe/{unsubscribe_token.token}"

    # Context for templates
    context = {
        'unsubscribe_url': unsubscribe_url,
        'site_name': 'Carlos Leon Portfolio',
        'site_url': settings.SITE_URL,
    }

    # Render email templates
    html_content = render_to_string('newsletter/emails/welcome.html', context)
    text_content = render_to_string('newsletter/emails/welcome.txt', context)

    # Create email with both HTML and plain text versions
    email = EmailMultiAlternatives(
        subject='Welcome to Carlos Leon Portfolio Newsletter!',
        body=text_content,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[subscriber.email]
    )
    email.attach_alternative(html_content, "text/html")
    email.send(fail_silently=False)

    return unsubscribe_token


def create_unsubscribe_token(subscriber):
    """Create unsubscribe token (expires in 30 days)"""
    token = SubscriptionToken.objects.create(
        subscriber=subscriber,
        token_type='unsubscribe',
        expires_at=timezone.now() + timedelta(days=30)
    )
    return token


def get_or_create_unsubscribe_token(subscriber):
    """
    Get existing valid unsubscribe token or create a new one.
    This ensures each subscriber has a persistent unsubscribe link.
    """
    # Try to find an existing valid token
    existing_token = SubscriptionToken.objects.filter(
        subscriber=subscriber,
        token_type='unsubscribe',
        is_used=False,
        expires_at__gt=timezone.now()
    ).first()

    if existing_token:
        return existing_token

    # Create new token if none exists or all expired
    return create_unsubscribe_token(subscriber)


def get_unsubscribe_url(subscriber):
    """Get unsubscribe URL for a subscriber"""
    token = get_or_create_unsubscribe_token(subscriber)
    return f"{settings.SITE_URL}/newsletter/unsubscribe/{token.token}"
