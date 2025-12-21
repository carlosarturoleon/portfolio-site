from django.http import JsonResponse


class HealthCheckMiddleware:
    """Bypass all Django middleware for health check endpoint"""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Intercept health check requests BEFORE any other middleware
        if request.path == '/api/health':
            return JsonResponse({
                "status": "ok",
                "message": "Django backend is running",
                "version": "1.0.0"
            })
        return self.get_response(request)
