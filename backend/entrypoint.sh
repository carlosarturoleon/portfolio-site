#!/bin/bash
set -e

echo "Testing database connection..."
MAX_RETRIES=30
RETRY_COUNT=0

# Try to connect to database with timeout
while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if timeout 10 python manage.py migrate --check 2>&1; then
        echo "Database is available!"
        break
    fi
    RETRY_COUNT=$((RETRY_COUNT + 1))
    echo "Database unavailable, retrying... ($RETRY_COUNT/$MAX_RETRIES)"
    sleep 2
done

# Run migrations if database is available
if [ $RETRY_COUNT -lt $MAX_RETRIES ]; then
    echo "Running database migrations..."
    python manage.py migrate --noinput
else
    echo "WARNING: Could not connect to database. Starting app anyway."
    echo "Database operations will be retried on first request."
fi

# Collect static files (doesn't require database)
echo "Collecting static files..."
python manage.py collectstatic --noinput --clear

# Start Gunicorn with optimized settings
echo "Starting Gunicorn..."
exec gunicorn \
    --bind 0.0.0.0:8000 \
    --workers 2 \
    --threads 4 \
    --timeout 120 \
    --graceful-timeout 30 \
    --max-requests 1000 \
    --max-requests-jitter 50 \
    --access-logfile - \
    --error-logfile - \
    --log-level info \
    portfolio_backend.wsgi:application
