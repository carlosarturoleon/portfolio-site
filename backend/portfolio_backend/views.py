from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_GET


@require_GET
def robots_txt(request):
    """Serve robots.txt file"""
    lines = [
        "User-agent: *",
        "Allow: /",
        "",
        "# Disallow admin and private areas",
        "Disallow: /secure-admin-panel/",
        "Disallow: /api/newsletter/confirm/",
        "Disallow: /api/newsletter/unsubscribe/",
        "",
        f"Sitemap: {request.scheme}://{request.get_host()}/sitemap.xml",
    ]
    return HttpResponse("\n".join(lines), content_type="text/plain")


@require_GET
def health_check(request):
    """API health check endpoint"""
    return JsonResponse({
        "status": "ok",
        "message": "Django backend is running",
        "version": "1.0.0"
    })
