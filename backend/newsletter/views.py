from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import status, generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Subscriber, SubscriptionToken
from .serializers import SubscribeSerializer
from .utils import send_confirmation_email, send_welcome_email


class SubscribeAPIView(generics.CreateAPIView):
    """
    Subscribe to newsletter - sends confirmation email

    POST /api/newsletter/subscribe/
    Body: {"email": "user@example.com"}
    """
    serializer_class = SubscribeSerializer
    permission_classes = [AllowAny]

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
        send_confirmation_email(subscriber)

        return Response(
            {'message': 'Confirmation email sent. Please check your inbox.'},
            status=status.HTTP_201_CREATED
        )


class ConfirmSubscriptionAPIView(APIView):
    """
    Confirm newsletter subscription

    GET /api/newsletter/confirm/<token>/
    """
    permission_classes = [AllowAny]

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

        # Send welcome email
        send_welcome_email(subscriber)

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
