from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import status, generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Subscriber, SubscriptionToken
from .serializers import SubscribeSerializer
from .utils import send_confirmation_email, send_welcome_email
from .throttles import NewsletterSubscribeThrottle, NewsletterConfirmThrottle


class SubscribeAPIView(generics.CreateAPIView):
    """
    Subscribe to newsletter - sends confirmation email

    POST /api/newsletter/subscribe/
    Body: {"email": "user@example.com"}

    Rate limit: 5 requests per hour per IP
    """
    serializer_class = SubscribeSerializer
    permission_classes = [AllowAny]
    throttle_classes = [NewsletterSubscribeThrottle]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']

        # Check if already subscribed
        subscriber, created = Subscriber.objects.get_or_create(email=email)

        if subscriber.is_confirmed:
            return Response(
                {'message': 'This email is already subscribed'},
                status=status.HTTP_200_OK
            )

        # Send confirmation email
        try:
            send_confirmation_email(subscriber)
            return Response(
                {'message': 'Confirmation email sent. Please check your inbox.'},
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            # Handle email sending errors gracefully
            error_msg = str(e)
            if 'Email address is not verified' in error_msg or 'MessageRejected' in error_msg:
                return Response(
                    {'message': 'Email service is currently in development mode. Please contact the administrator to enable your subscription.'},
                    status=status.HTTP_503_SERVICE_UNAVAILABLE
                )
            else:
                return Response(
                    {'message': 'Unable to send confirmation email. Please try again later.'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )


class ConfirmSubscriptionAPIView(APIView):
    """
    Confirm newsletter subscription

    GET /api/newsletter/confirm/<token>/

    Rate limit: 10 requests per hour per IP
    """
    permission_classes = [AllowAny]
    throttle_classes = [NewsletterConfirmThrottle]

    def get(self, request, token):
        subscription_token = get_object_or_404(SubscriptionToken, token=token, token_type='confirm')

        if not subscription_token.is_valid():
            return Response(
                {'error': 'This confirmation link is invalid or has expired'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Confirm subscription
        subscriber = subscription_token.subscriber
        subscriber.is_confirmed = True
        subscriber.confirmed_at = timezone.now()
        subscriber.save()

        subscription_token.mark_as_used()

        # Send welcome email (don't fail if email sending fails)
        try:
            send_welcome_email(subscriber)
        except Exception as e:
            # Log error but don't fail the confirmation
            print(f"Error sending welcome email: {e}")

        return Response(
            {'message': 'Subscription confirmed successfully!'},
            status=status.HTTP_200_OK
        )


class UnsubscribeAPIView(APIView):
    """
    Unsubscribe from newsletter

    POST /api/newsletter/unsubscribe/<token>/
    """
    permission_classes = [AllowAny]

    def post(self, request, token):
        subscription_token = get_object_or_404(SubscriptionToken, token=token, token_type='unsubscribe')

        if not subscription_token.is_valid():
            return Response(
                {'error': 'This unsubscribe link is invalid or has expired'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Unsubscribe
        subscriber = subscription_token.subscriber
        subscriber.is_active = False
        subscriber.save()

        subscription_token.mark_as_used()

        return Response(
            {'message': 'Successfully unsubscribed from newsletter'},
            status=status.HTTP_200_OK
        )
