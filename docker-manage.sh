#!/bin/bash

# Docker Image Management Script for Portfolio Site
# This script helps you manage Docker images to avoid rebuilding unnecessarily

set -e

BACKEND_IMAGE="portfolio-backend"
BACKEND_TAG="latest"
POSTGRES_IMAGE="postgres"
POSTGRES_TAG="17"
LAMBDA_IMAGE="public.ecr.aws/lambda/python"
LAMBDA_TAG="3.11"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_header() {
    echo -e "${GREEN}================================${NC}"
    echo -e "${GREEN}$1${NC}"
    echo -e "${GREEN}================================${NC}"
}

print_status() {
    echo -e "${YELLOW}→${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if image exists
image_exists() {
    docker images --format "{{.Repository}}:{{.Tag}}" | grep -q "^$1:$2$"
}

# Pull or verify image
ensure_image() {
    local image=$1
    local tag=$2
    local description=$3

    if image_exists "$image" "$tag"; then
        print_success "$description already exists"
    else
        print_status "Pulling $description..."
        docker pull "$image:$tag"
        print_success "$description ready"
    fi
}

# Build backend image
build_backend() {
    print_status "Building backend production image..."
    cd backend
    docker build -t "$BACKEND_IMAGE:$BACKEND_TAG" .
    cd ..
    print_success "Backend image built: $BACKEND_IMAGE:$BACKEND_TAG"
}

# List all project images
list_images() {
    print_header "Project Docker Images"
    echo ""
    echo "Required Images:"
    docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedAt}}" | grep -E "(REPOSITORY|postgres|lambda/python|portfolio-backend)" || echo "No project images found"
}

# Clean up dangling images
cleanup() {
    print_header "Cleaning Up Docker"
    print_status "Removing dangling images..."
    docker image prune -f
    print_status "Removing unused containers..."
    docker container prune -f
    print_success "Cleanup complete"
}

# Save images to tar (for backup)
save_images() {
    print_header "Saving Images to Backup"
    mkdir -p docker-backups

    if image_exists "$BACKEND_IMAGE" "$BACKEND_TAG"; then
        print_status "Saving backend image..."
        docker save "$BACKEND_IMAGE:$BACKEND_TAG" | gzip > docker-backups/backend-latest.tar.gz
        print_success "Backend saved to docker-backups/backend-latest.tar.gz"
    fi
}

# Load images from tar (restore backup)
load_images() {
    print_header "Loading Images from Backup"

    if [ -f "docker-backups/backend-latest.tar.gz" ]; then
        print_status "Loading backend image..."
        docker load < docker-backups/backend-latest.tar.gz
        print_success "Backend image loaded"
    else
        print_error "No backup files found in docker-backups/"
    fi
}

# Setup all required images
setup() {
    print_header "Setting Up Project Docker Images"

    # Pull base images
    ensure_image "$POSTGRES_IMAGE" "$POSTGRES_TAG" "PostgreSQL 17"
    ensure_image "$LAMBDA_IMAGE" "$LAMBDA_TAG" "AWS Lambda Python 3.11"

    # Check if backend image exists
    if image_exists "$BACKEND_IMAGE" "$BACKEND_TAG"; then
        print_success "Backend image exists"
        read -p "Rebuild backend image? (y/N): " rebuild
        if [[ $rebuild =~ ^[Yy]$ ]]; then
            build_backend
        fi
    else
        print_status "Backend image not found"
        read -p "Build backend image now? (Y/n): " build
        if [[ ! $build =~ ^[Nn]$ ]]; then
            build_backend
        fi
    fi

    echo ""
    list_images
}

# Show help
show_help() {
    cat << EOF
Docker Image Management for Portfolio Site

Usage: ./docker-manage.sh [command]

Commands:
    setup       Set up all required Docker images
    list        List all project Docker images
    build       Build backend production image
    clean       Clean up dangling images and containers
    save        Save images to backup files
    load        Load images from backup files
    help        Show this help message

Examples:
    ./docker-manage.sh setup     # First time setup
    ./docker-manage.sh list      # Check what images you have
    ./docker-manage.sh build     # Rebuild backend image
    ./docker-manage.sh clean     # Clean up unused Docker resources

EOF
}

# Main script
case "${1:-help}" in
    setup)
        setup
        ;;
    list)
        list_images
        ;;
    build)
        build_backend
        ;;
    clean)
        cleanup
        ;;
    save)
        save_images
        ;;
    load)
        load_images
        ;;
    help|*)
        show_help
        ;;
esac
