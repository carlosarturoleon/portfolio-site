from rest_framework import status
from rest_framework.decorators import api_view, throttle_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from django.core.mail import send_mail
from django.conf import settings
from slack_sdk.webhook import WebhookClient
from .models import ContactInquiry
from .serializers import ContactInquirySerializer


class ContactSubmitThrottle(AnonRateThrottle):
    """Custom throttle for contact form submissions."""
    rate = '3/hour'
    scope = 'contact_submit'


@api_view(['POST'])
@permission_classes([AllowAny])
@throttle_classes([ContactSubmitThrottle])
def submit_contact_form(request):
    """
    Handle contact form submissions.

    Accepts POST requests with contact information and project details.
    Sends email notification and stores inquiry in database.
    """
    serializer = ContactInquirySerializer(data=request.data)

    if serializer.is_valid():
        # Save the inquiry
        inquiry = serializer.save()

        # Send email notification
        try:
            send_notification_email(inquiry)
        except Exception as e:
            # Log error but don't fail the request
            print(f"Error sending email notification: {e}")

        # Send Slack notification
        try:
            send_slack_notification(inquiry)
        except Exception as e:
            # Log error but don't fail the request
            print(f"Error sending Slack notification: {e}")

        return Response(
            {
                'success': True,
                'message': 'Thank you for your inquiry! I will review your project details and get back to you within 24 hours.',
                'inquiry_id': inquiry.id
            },
            status=status.HTTP_201_CREATED
        )

    return Response(
        {
            'success': False,
            'errors': serializer.errors
        },
        status=status.HTTP_400_BAD_REQUEST
    )


def send_notification_email(inquiry):
    """Send email notification when a new contact inquiry is submitted."""

    # Prepare email content
    services = ', '.join(inquiry.services_interested) if inquiry.services_interested else 'None selected'
    subject = f"New Contact Inquiry: {services} - {inquiry.name}"

    message = f"""
New Contact Form Submission
{'='*50}

Contact Information:
- Name: {inquiry.name}
- Email: {inquiry.email}
- Phone: {inquiry.phone or 'Not provided'}
- Company: {inquiry.company or 'Not provided'}
- Preferred Contact: {inquiry.get_preferred_contact_method_display() or 'Not specified'}

Company/Role Details:
- Company Size: {inquiry.get_company_size_display() or 'Not provided'}
- Role: {inquiry.get_role_display() or 'Not provided'}
- Industry: {inquiry.get_industry_display() or 'Not provided'}

Project Details:
- Services Interested: {services}
- Budget Range: {inquiry.get_budget_range_display()}
- Timeline: {inquiry.get_timeline_display()}
- Priority: {inquiry.get_priority_level_display() or 'Not specified'}

Project Goals:
{inquiry.project_goals}

Current Situation:
{inquiry.current_situation or 'Not provided'}

Referral Source:
{inquiry.referral_source or 'Not provided'}

{'='*50}
High Value Lead: {'YES 💰' if inquiry.is_high_value else 'No'}
High Priority: {'YES 🔴' if inquiry.is_high_priority else 'No'}

View in Admin: {settings.SITE_URL}/secure-admin-panel/contact/contactinquiry/{inquiry.id}/change/
"""

    # Send email
    send_mail(
        subject=subject,
        message=message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[settings.DEFAULT_FROM_EMAIL],  # Send to yourself
        fail_silently=False,
    )

    # Optionally send confirmation email to the client
    send_confirmation_email(inquiry)


def send_confirmation_email(inquiry):
    """Send confirmation email to the person who submitted the form."""

    subject = f"Thanks for reaching out, {inquiry.name.split()[0]}!"

    services = ', '.join(inquiry.services_interested) if inquiry.services_interested else 'your'
    message = f"""
Hi {inquiry.name.split()[0]},

Thank you for your interest in working together on {services.lower()} project{'s' if len(inquiry.services_interested) > 1 else ''}.

I've received your inquiry and will review your project details carefully. I'll get back to you within 24 hours to discuss next steps.

In the meantime, feel free to check out my latest projects and blog posts at {settings.SITE_URL}.

Best regards,
Carlos Leon
Data Analytics & Software Development
{settings.SITE_URL}

---
This is an automated confirmation email. Please do not reply to this message.
"""

    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[inquiry.email],
            fail_silently=True,  # Don't fail if client email bounces
        )
    except Exception as e:
        print(f"Error sending confirmation email: {e}")


def send_slack_notification(inquiry):
    """Send Slack notification when a new contact inquiry is submitted."""

    if not settings.SLACK_WEBHOOK_URL:
        print("Slack webhook URL not configured, skipping notification")
        return

    try:
        webhook = WebhookClient(settings.SLACK_WEBHOOK_URL)

        # Format services
        services = ', '.join(inquiry.services_interested) if inquiry.services_interested else 'None selected'

        # Build priority indicators
        priority_indicators = []
        if inquiry.is_high_value:
            priority_indicators.append("💰 *High Value Lead*")
        if inquiry.is_high_priority:
            priority_indicators.append("🔴 *High Priority*")
        priority_text = " | ".join(priority_indicators) if priority_indicators else ""

        # Build Slack message blocks
        blocks = [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": "🎯 New Contact Form Submission",
                    "emoji": True
                }
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": f"*Name:*\n{inquiry.name}"
                    },
                    {
                        "type": "mrkdwn",
                        "text": f"*Email:*\n{inquiry.email}"
                    },
                    {
                        "type": "mrkdwn",
                        "text": f"*Phone:*\n{inquiry.phone or 'Not provided'}"
                    },
                    {
                        "type": "mrkdwn",
                        "text": f"*Company:*\n{inquiry.company or 'Not provided'}"
                    }
                ]
            },
            {
                "type": "divider"
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": f"*Services:*\n{services}"
                    },
                    {
                        "type": "mrkdwn",
                        "text": f"*Budget:*\n{inquiry.get_budget_range_display()}"
                    },
                    {
                        "type": "mrkdwn",
                        "text": f"*Timeline:*\n{inquiry.get_timeline_display()}"
                    },
                    {
                        "type": "mrkdwn",
                        "text": f"*Industry:*\n{inquiry.get_industry_display() or 'Not provided'}"
                    }
                ]
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f"*Project Goals:*\n{inquiry.project_goals[:200]}{'...' if len(inquiry.project_goals) > 200 else ''}"
                }
            }
        ]

        # Add priority indicators if any
        if priority_text:
            blocks.append({
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": priority_text
                }
            })

        # Add action button to view in admin
        blocks.append({
            "type": "divider"
        })
        blocks.append({
            "type": "actions",
            "elements": [
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "View in Admin",
                        "emoji": True
                    },
                    "url": f"{settings.SITE_URL}/secure-admin-panel/contact/contactinquiry/{inquiry.id}/change/",
                    "style": "primary"
                }
            ]
        })

        # Send the message
        response = webhook.send(
            text=f"New contact inquiry from {inquiry.name}",  # Fallback text
            blocks=blocks
        )

        if response.status_code != 200:
            print(f"Slack notification failed with status {response.status_code}: {response.body}")

    except Exception as e:
        print(f"Error sending Slack notification: {e}")
