#!/bin/bash
set -e

echo "======================================"
echo "Building Lambda Deployment Package"
echo "======================================"

# Configuration
PACKAGE_DIR="lambda-package"
ZIP_FILE="django-lambda.zip"
LAMBDA_FUNCTION_NAME="portfolio-backend-lambda"
AWS_REGION="us-east-2"

# Clean up previous build
echo "Cleaning up previous builds..."
rm -rf $PACKAGE_DIR
rm -f $ZIP_FILE

# Create package directory
echo "Creating package directory..."
mkdir -p $PACKAGE_DIR

# Install Python dependencies
echo "Installing Python dependencies..."
echo "Note: This installs for current platform. If you get import errors in Lambda,"
echo "you'll need to use the Docker method or build on Linux."

pip install -r requirements.txt -t $PACKAGE_DIR/ --upgrade

# Copy Django project files
echo "Copying Django project files..."
cp -r portfolio_backend $PACKAGE_DIR/
cp -r blog $PACKAGE_DIR/
cp -r newsletter $PACKAGE_DIR/
cp -r contact $PACKAGE_DIR/
cp manage.py $PACKAGE_DIR/

# Remove unnecessary files to reduce package size
echo "Cleaning up unnecessary files..."
cd $PACKAGE_DIR

# Remove test files and documentation
find . -type d -name "tests" -exec rm -rf {} + 2>/dev/null || true
find . -type d -name "*.dist-info" -exec rm -rf {} + 2>/dev/null || true
find . -type f -name "*.pyc" -delete
find . -type f -name "*.pyo" -delete
find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
find . -type d -name "*.egg-info" -exec rm -rf {} + 2>/dev/null || true

# Remove large unnecessary packages (Lambda provides these)
rm -rf boto3* botocore* 2>/dev/null || true
rm -rf pip* setuptools* wheel* 2>/dev/null || true

# Create ZIP file
echo "Creating ZIP archive..."
zip -r ../$ZIP_FILE . -x "*.pyc" -x "*__pycache__*" -x "*.dist-info/*" > /dev/null

cd ..

# Get ZIP file size
ZIP_SIZE=$(du -h $ZIP_FILE | cut -f1)
echo ""
echo "======================================"
echo "Build completed successfully!"
echo "======================================"
echo "Package: $ZIP_FILE"
echo "Size: $ZIP_SIZE"
echo ""

# Check if size exceeds 50MB (direct upload limit)
ZIP_SIZE_BYTES=$(stat -f%z "$ZIP_FILE" 2>/dev/null || stat -c%s "$ZIP_FILE" 2>/dev/null)
if [ "$ZIP_SIZE_BYTES" -gt 52428800 ]; then
    echo "⚠️  WARNING: Package is larger than 50MB!"
    echo "You must upload to S3 first, then update Lambda from S3."
    echo ""
    echo "Upload to S3:"
    echo "  aws s3 cp $ZIP_FILE s3://your-bucket-name/$ZIP_FILE"
    echo ""
    echo "Update Lambda from S3:"
    echo "  aws lambda update-function-code \\"
    echo "    --function-name $LAMBDA_FUNCTION_NAME \\"
    echo "    --s3-bucket your-bucket-name \\"
    echo "    --s3-key $ZIP_FILE \\"
    echo "    --region $AWS_REGION"
else
    echo "✅ Package size is OK for direct upload"
    echo ""
    echo "To deploy, run:"
    echo "  aws lambda update-function-code \\"
    echo "    --function-name $LAMBDA_FUNCTION_NAME \\"
    echo "    --zip-file fileb://$ZIP_FILE \\"
    echo "    --region $AWS_REGION"
fi

echo ""
echo "Or upload manually via AWS Console:"
echo "  Lambda > Functions > $LAMBDA_FUNCTION_NAME > Upload from > .zip file"
echo ""
