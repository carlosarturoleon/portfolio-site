from rest_framework.throttling import AnonRateThrottle


class NewsletterSubscribeThrottle(AnonRateThrottle):
    """
    Throttle for newsletter subscription endpoint.
    Limits to 5 requests per hour per IP to prevent spam.
    """
    scope = 'newsletter_subscribe'


class NewsletterConfirmThrottle(AnonRateThrottle):
    """
    Throttle for newsletter confirmation endpoint.
    Limits to 10 requests per hour per IP.
    """
    scope = 'newsletter_confirm'
