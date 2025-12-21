#!/bin/bash

# Script to run Django backend locally with production environment variables
# This connects to production RDS database

set -e

echo "Building Docker image..."
docker build -t portfolio-backend:local .

echo ""
echo "Starting Django backend with production environment variables..."
echo "WARNING: This will connect to the PRODUCTION database!"
echo ""

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo "ERROR: .env.production file not found!"
    echo "Please create .env.production with your production environment variables."
    echo "You can use .env.production.example as a template."
    exit 1
fi

# Load environment variables from .env.production
source .env.production

# Run Docker container with production environment variables
docker run --rm -p 8000:8000 \
  -e DB_HOST="${DB_HOST}" \
  -e DB_NAME="${DB_NAME}" \
  -e DB_USER="${DB_USER}" \
  -e DB_PASSWORD="${DB_PASSWORD}" \
  -e DB_PORT="${DB_PORT:-5432}" \
  -e SECRET_KEY="${SECRET_KEY}" \
  -e DEBUG="${DEBUG:-False}" \
  -e ALLOWED_HOSTS="${ALLOWED_HOSTS}" \
  -e CORS_ALLOWED_ORIGINS="${CORS_ALLOWED_ORIGINS}" \
  -e AWS_REGION="${AWS_REGION}" \
  -e AWS_ACCESS_KEY_ID="${AWS_ACCESS_KEY_ID:-}" \
  -e AWS_SECRET_ACCESS_KEY="${AWS_SECRET_ACCESS_KEY:-}" \
  -e AWS_SES_ACCESS_KEY_ID="${AWS_SES_ACCESS_KEY_ID:-}" \
  -e AWS_SES_SECRET_ACCESS_KEY="${AWS_SES_SECRET_ACCESS_KEY:-}" \
  -e AWS_SES_REGION_NAME="${AWS_SES_REGION_NAME}" \
  -e AWS_SES_REGION_ENDPOINT="${AWS_SES_REGION_ENDPOINT}" \
  -e DEFAULT_FROM_EMAIL="${DEFAULT_FROM_EMAIL}" \
  -e EMAIL_BACKEND="${EMAIL_BACKEND:-}" \
  -e SLACK_WEBHOOK_URL="${SLACK_WEBHOOK_URL:-}" \
  portfolio-backend:local

echo ""
echo "Container stopped."
