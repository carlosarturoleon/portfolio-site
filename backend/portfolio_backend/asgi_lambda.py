"""
ASGI Lambda handler for AWS Lambda deployment.
This file wraps Django ASGI application with Mangum adapter for Lambda.
"""
import os
import sys

# Add the project directory to Python path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Set Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_backend.settings')

# Import Django ASGI application
from django.core.asgi import get_asgi_application

# Initialize Django
django_app = get_asgi_application()

# Wrap with Mangum for Lambda
from mangum import Mangum

# Lambda handler - this is the entry point
handler = Mangum(django_app, lifespan="off")
