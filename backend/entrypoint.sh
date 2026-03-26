#!/bin/bash
set -e

echo "Running database migrations..."

# Wait for database to be available
MAX_RETRIES=30
RETRY_COUNT=0
until python manage.py migrate --check 2>/dev/null || [ $RETRY_COUNT -eq $MAX_RETRIES ]; do
    echo "Database unavailable, retrying... ($RETRY_COUNT/$MAX_RETRIES)"
    RETRY_COUNT=$((RETRY_COUNT + 1))
    sleep 3
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
    echo "WARNING: Could not connect to database. Starting app anyway."
    echo "Database operations will be retried on first request."
else
    echo "Database is available!"
    python manage.py migrate
fi

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Starting Gunicorn..."
exec gunicorn portfolio_backend.wsgi:application \
    --workers 2 \
    --threads 4 \
    --worker-class gthread \
    --bind 0.0.0.0:${PORT:-8000} \
    --timeout 60 \
    --access-logfile - \
    --error-logfile -
