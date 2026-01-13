# Django Lambda Deployment Guide

Complete guide to deploy your Django portfolio backend to AWS Lambda with API Gateway.

## 📊 Cost Savings Estimate

| Service | Current (ALB + ECS) | With Lambda |
|---------|---------------------|-------------|
| ALB | $16-18/month | **$0** ✅ |
| ECS Fargate | $30/month | **$0** ✅ |
| Lambda | $0 | $0-2/month |
| API Gateway | $0 | $1-3/month |
| RDS | $15/month | $15/month |
| S3 Static | $0 | $0.50/month |
| **Total** | **~$46-48/month** | **~$16-20/month** |

**💰 Estimated Savings: $26-32/month (56-68% reduction)**

---

## 🏗️ Architecture

```
┌─────────────┐
│   Users     │
└──────┬──────┘
       │
       ▼
┌──────────────────────────┐
│  Route 53                │
│  api.carlosleon.tech     │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  API Gateway (HTTP API)  │
│  - CORS configured       │
│  - Custom domain         │
│  - Rate limiting         │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  Lambda Function         │
│  - Django via Mangum     │
│  - 512MB RAM             │
│  - 30s timeout           │
│  - VPC enabled           │
└──────┬───────────────────┘
       │
       ├─────────────────────┐
       │                     │
       ▼                     ▼
┌─────────────┐      ┌──────────────┐
│ RDS Postgres│      │ S3 Bucket    │
│             │      │ Static Files │
└─────────────┘      └──────────────┘
```

---

## 📋 Prerequisites

### 1. AWS CLI Setup
```bash
# Install AWS CLI
brew install awscli  # macOS
# or
pip install awscli

# Configure credentials
aws configure
# Enter: Access Key, Secret Key, Region (us-east-2), Output format (json)

# Verify
aws sts get-caller-identity
```

### 2. AWS SAM CLI (Optional but Recommended)
```bash
# Install SAM CLI
brew install aws-sam-cli  # macOS

# Verify
sam --version
```

### 3. Get Your AWS Account Details
```bash
# Get Account ID
aws sts get-caller-identity --query Account --output text

# Note your RDS endpoint
aws rds describe-db-instances \
  --query 'DBInstances[?DBName==`portfolio_db`].Endpoint.Address' \
  --output text

# Note your VPC ID
aws ec2 describe-vpcs --query 'Vpcs[0].VpcId' --output text

# Note your subnet IDs (where RDS is located)
aws ec2 describe-subnets \
  --filters "Name=vpc-id,Values=<YOUR_VPC_ID>" \
  --query 'Subnets[*].SubnetId' \
  --output text
```

---

## 🚀 Deployment Steps

### Step 1: Create S3 Bucket for Static Files

```bash
# Set variables
STATIC_BUCKET="portfolio-static-files-$(date +%s)"  # Unique name
AWS_REGION="us-east-2"

# Create bucket
aws s3 mb s3://$STATIC_BUCKET --region $AWS_REGION

# Enable public access for static files
aws s3api put-public-access-block \
  --bucket $STATIC_BUCKET \
  --public-access-block-configuration \
    "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# Set CORS
cat > /tmp/cors.json <<EOF
{
  "CORSRules": [
    {
      "AllowedOrigins": ["https://carlosleon.tech", "https://www.carlosleon.tech"],
      "AllowedMethods": ["GET", "HEAD"],
      "AllowedHeaders": ["*"],
      "MaxAgeSeconds": 3600
    }
  ]
}
EOF

aws s3api put-bucket-cors \
  --bucket $STATIC_BUCKET \
  --cors-configuration file:///tmp/cors.json

# Make bucket public for static files
cat > /tmp/bucket-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::$STATIC_BUCKET/*"
    }
  ]
}
EOF

aws s3api put-bucket-policy \
  --bucket $STATIC_BUCKET \
  --policy file:///tmp/bucket-policy.json

echo "Static files bucket created: $STATIC_BUCKET"
```

### Step 2: Create Secrets in AWS Secrets Manager

```bash
# Create a secret with all sensitive data
aws secretsmanager create-secret \
  --name portfolio-backend-secrets \
  --description "Django portfolio backend secrets" \
  --secret-string '{
    "SECRET_KEY": "your-django-secret-key-here",
    "DB_PASSWORD": "your-rds-password-here"
  }' \
  --region $AWS_REGION

# Verify
aws secretsmanager get-secret-value \
  --secret-id portfolio-backend-secrets \
  --query SecretString \
  --output text | jq .
```

### Step 3: Collect Static Files to S3

```bash
cd backend

# Install dependencies locally
pip install -r requirements.txt

# Set environment variables for S3
export AWS_STORAGE_BUCKET_NAME=$STATIC_BUCKET
export AWS_LAMBDA_FUNCTION_NAME=test  # Trick Django into Lambda mode
export DJANGO_SETTINGS_MODULE=portfolio_backend.settings

# Collect static files to S3
python manage.py collectstatic --noinput

# Verify files uploaded
aws s3 ls s3://$STATIC_BUCKET/static/ --recursive

# Test static file access
echo "Test: https://${STATIC_BUCKET}.s3.amazonaws.com/static/admin/css/base.css"
```

### Step 4: Build Lambda Deployment Package

```bash
cd backend

# Run deployment script
./deploy-lambda.sh

# This creates: django-lambda.zip

# Check size
ls -lh django-lambda.zip
```

### Step 5: Create Lambda Function (Manual - AWS Console)

1. **Go to Lambda Console**: https://console.aws.amazon.com/lambda
2. **Create Function**:
   - Name: `portfolio-backend-lambda`
   - Runtime: `Python 3.11`
   - Architecture: `x86_64`
   - Permissions: Create new role with basic Lambda permissions

3. **Upload Code**:
   - Code source → Upload from → .zip file
   - Choose `django-lambda.zip`
   - Click "Save"

4. **Configure Function**:
   - Handler: `portfolio_backend.asgi_lambda.handler`
   - Memory: `512 MB`
   - Timeout: `30 seconds`

5. **Environment Variables** (Configuration → Environment variables):
   ```
   DJANGO_SETTINGS_MODULE=portfolio_backend.settings
   DEBUG=False
   SECRET_KEY=<get-from-secrets-manager>
   ALLOWED_HOSTS=api.carlosleon.tech,*.execute-api.us-east-2.amazonaws.com

   DB_NAME=portfolio_db
   DB_USER=portfolio_user
   DB_PASSWORD=<your-rds-password>
   DB_HOST=<your-rds-endpoint>
   DB_PORT=5432

   AWS_REGION=us-east-2
   AWS_STORAGE_BUCKET_NAME=<your-static-bucket>

   CORS_ALLOWED_ORIGINS=https://carlosleon.tech,https://www.carlosleon.tech
   CSRF_TRUSTED_ORIGINS=https://api.carlosleon.tech

   SENDGRID_API_KEY=<your-sendgrid-key>
   DEFAULT_FROM_EMAIL=noreply@carlosleon.tech
   EMAIL_BACKEND=sendgrid_backend.SendgridBackend
   SITE_URL=https://carlosleon.tech

   SLACK_WEBHOOK_URL=<your-slack-webhook>
   ```

6. **Configure VPC** (for RDS access):
   - VPC: Select your VPC (same as RDS)
   - Subnets: Select private subnets (same as RDS)
   - Security Groups: Create new or select existing
     - Must allow outbound to RDS port 5432
     - Must allow outbound HTTPS (443) for AWS services

7. **Add Permissions** (Configuration → Permissions):
   - Attach policies:
     - `AWSLambdaVPCAccessExecutionRole` (for VPC)
     - Create inline policy for S3:
       ```json
       {
         "Version": "2012-10-17",
         "Statement": [
           {
             "Effect": "Allow",
             "Action": [
               "s3:GetObject",
               "s3:PutObject",
               "s3:DeleteObject",
               "s3:ListBucket"
             ],
             "Resource": [
               "arn:aws:s3:::YOUR-BUCKET-NAME",
               "arn:aws:s3:::YOUR-BUCKET-NAME/*"
             ]
           }
         ]
       }
       ```

### Step 6: Test Lambda Function

```bash
# Create test event in Lambda console
# Test → Configure test event → New event

{
  "version": "2.0",
  "routeKey": "GET /api/health",
  "rawPath": "/api/health",
  "requestContext": {
    "http": {
      "method": "GET",
      "path": "/api/health"
    }
  }
}

# Click "Test"
# Expected response: {"status": "ok"}
```

### Step 7: Create API Gateway (HTTP API)

1. **Go to API Gateway Console**
2. **Create API** → HTTP API → Build
3. **Add Integration**:
   - Integration type: Lambda
   - Lambda function: `portfolio-backend-lambda`
   - Grant API Gateway permissions: Yes

4. **Configure Routes**:
   - Route: `ANY /{proxy+}`
   - Integration: `portfolio-backend-lambda`
   - Add another route:
     - Route: `ANY /`
     - Integration: `portfolio-backend-lambda`

5. **Configure CORS**:
   - Access-Control-Allow-Origin: `https://carlosleon.tech, https://www.carlosleon.tech`
   - Access-Control-Allow-Headers: `Content-Type, Authorization, X-Requested-With`
   - Access-Control-Allow-Methods: `GET, POST, PUT, DELETE, OPTIONS`
   - Access-Control-Allow-Credentials: `true`

6. **Deploy API**:
   - Stage name: `production`
   - Click "Deploy"
   - Note the Invoke URL (e.g., `https://abc123.execute-api.us-east-2.amazonaws.com`)

### Step 8: Test API Gateway

```bash
# Get your API Gateway URL
API_URL="https://YOUR-API-ID.execute-api.us-east-2.amazonaws.com"

# Test health endpoint
curl $API_URL/api/health
# Expected: {"status": "ok"}

# Test blog posts
curl $API_URL/api/posts/
# Expected: {"count": X, "results": [...]}
```

### Step 9: Add Custom Domain (Optional but Recommended)

1. **Certificate Requirements**:
   - You need an ACM certificate in `us-east-1` region (API Gateway requirement)
   - If your cert is in `us-east-2`, create a new one in `us-east-1`:
     ```bash
     aws acm request-certificate \
       --domain-name api.carlosleon.tech \
       --validation-method DNS \
       --region us-east-1
     ```

2. **Create Custom Domain**:
   - API Gateway → Custom domain names → Create
   - Domain name: `api.carlosleon.tech`
   - Certificate: Select your ACM certificate (us-east-1)
   - Endpoint type: Regional

3. **Add API Mapping**:
   - API: Select your HTTP API
   - Stage: `production`
   - Path: `/` (empty)

4. **Note the Target Domain**:
   - Example: `d-abc123.execute-api.us-east-2.amazonaws.com`

### Step 10: Update Route 53

1. **Go to Route 53** → Hosted zones → `carlosleon.tech`
2. **Create Record**:
   - Record name: `api`
   - Record type: `A - Routes traffic to an IPv4 address`
   - Alias: Yes
   - Route traffic to:
     - Alias to API Gateway API
     - Region: us-east-2
     - Select your API Gateway custom domain
   - Routing policy: Simple
   - Click "Create records"

3. **Wait for DNS propagation** (5-10 minutes):
   ```bash
   # Test DNS
   dig api.carlosleon.tech

   # Test endpoint
   curl https://api.carlosleon.tech/api/health
   ```

### Step 11: Update Frontend (Amplify)

1. **Go to Amplify Console**
2. **Environment Variables**:
   - Update `NEXT_PUBLIC_API_URL` to:
     - `https://api.carlosleon.tech`

3. **Redeploy**:
   - Trigger new build or push to GitHub

4. **Test frontend**:
   - Visit: https://carlosleon.tech
   - Check browser console for API calls

---

## 🔧 Database Migrations

Since Lambda doesn't run migrations automatically, you have two options:

### Option A: Run Migrations Locally

```bash
cd backend
source venv/bin/activate

# Set environment to point to production RDS
export DB_HOST=<your-rds-endpoint>
export DB_NAME=portfolio_db
export DB_USER=portfolio_user
export DB_PASSWORD=<your-password>

# Run migrations
python manage.py migrate

# Create superuser (if needed)
python manage.py createsuperuser
```

### Option B: Create Lambda Function for Management Commands

Create a separate Lambda function that runs Django management commands on-demand.

---

## 📊 Monitoring & Debugging

### View Lambda Logs

```bash
# Stream logs in real-time
sam logs --name portfolio-backend-lambda --stack-name portfolio-backend --tail

# Or use AWS CLI
aws logs tail /aws/lambda/portfolio-backend-lambda --follow
```

### CloudWatch Metrics

1. **Lambda Console** → Monitoring tab
2. View:
   - Invocations
   - Duration
   - Error count
   - Throttles
   - Concurrent executions

### Set Up Alarms

```bash
# Create alarm for Lambda errors
aws cloudwatch put-metric-alarm \
  --alarm-name portfolio-lambda-errors \
  --alarm-description "Alert on Lambda errors" \
  --metric-name Errors \
  --namespace AWS/Lambda \
  --statistic Sum \
  --period 300 \
  --threshold 5 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 1 \
  --dimensions Name=FunctionName,Value=portfolio-backend-lambda
```

---

## 🐛 Troubleshooting

### Cold Start Issues

**Problem**: First request takes 3-5 seconds

**Solutions**:
1. **Increase memory**: More memory = faster CPU = faster cold starts
   ```bash
   aws lambda update-function-configuration \
     --function-name portfolio-backend-lambda \
     --memory-size 1024
   ```

2. **Enable Provisioned Concurrency** (costs ~$10/month):
   ```bash
   aws lambda put-provisioned-concurrency-config \
     --function-name portfolio-backend-lambda \
     --provisioned-concurrent-executions 1 \
     --qualifier $LATEST
   ```

3. **Use Lambda SnapStart** (Python not supported yet)

### Database Connection Errors

**Problem**: "Too many connections" or connection timeouts

**Solutions**:
1. **Use RDS Proxy** (~$10/month but solves connection pooling):
   ```bash
   # Create RDS Proxy via AWS Console
   # RDS → Proxies → Create proxy
   # Update Lambda DB_HOST to proxy endpoint
   ```

2. **Lower CONN_MAX_AGE** (already set to 0 in settings)

3. **Increase RDS max_connections**:
   ```bash
   # Edit RDS parameter group
   # max_connections = 100 (or higher)
   ```

### Static Files Not Loading

**Problem**: 404 on static files

**Solutions**:
1. **Re-run collectstatic**:
   ```bash
   export AWS_STORAGE_BUCKET_NAME=your-bucket
   export AWS_LAMBDA_FUNCTION_NAME=test
   python manage.py collectstatic --noinput
   ```

2. **Check S3 bucket policy** (must allow public read)

3. **Verify CORS on S3 bucket**

### Lambda Timeout

**Problem**: 502 Bad Gateway or timeout errors

**Solutions**:
1. **Increase timeout**:
   ```bash
   aws lambda update-function-configuration \
     --function-name portfolio-backend-lambda \
     --timeout 60
   ```

2. **Optimize slow queries** (check Django Debug Toolbar)

3. **Add database indexes**

---

## 💰 Cost Optimization Tips

### 1. Use ARM Architecture (Graviton2)
```bash
# 20% cheaper than x86
aws lambda update-function-configuration \
  --function-name portfolio-backend-lambda \
  --architectures arm64
```

### 2. Right-Size Memory
- Start with 512MB
- Monitor actual memory usage in CloudWatch
- Reduce if consistently under 256MB

### 3. Optimize Package Size
- Remove unnecessary dependencies
- Use Lambda Layers for common packages
- Current size: ~50MB (good)

### 4. Cache API Gateway Responses
```bash
# Enable caching for GET requests (costs extra but reduces Lambda invocations)
# API Gateway → Stages → production → Settings → Cache settings
```

### 5. Use S3 Transfer Acceleration (Optional)
Only needed if you have global users uploading media files.

---

## 🔄 Updating Lambda Function

### Quick Update (Code Only)
```bash
cd backend
./deploy-lambda.sh

# Upload
aws lambda update-function-code \
  --function-name portfolio-backend-lambda \
  --zip-file fileb://django-lambda.zip \
  --region us-east-2
```

### Update via GitHub Actions (CI/CD)

Create `.github/workflows/deploy-lambda.yml`:
```yaml
name: Deploy to Lambda

on:
  push:
    branches: [main]
    paths:
      - 'backend/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'

      - name: Build Lambda package
        run: |
          cd backend
          ./deploy-lambda.sh

      - name: Deploy to Lambda
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          aws lambda update-function-code \
            --function-name portfolio-backend-lambda \
            --zip-file fileb://backend/django-lambda.zip \
            --region us-east-2
```

---

## 🎯 Next Steps After Deployment

1. **Delete Old Infrastructure**:
   - Stop ECS service
   - Delete ECS cluster
   - Delete Application Load Balancer
   - Delete Target Groups
   - Delete old ECR images

2. **Set Up Budget Alerts**:
   ```bash
   aws budgets create-budget \
     --account-id $(aws sts get-caller-identity --query Account --output text) \
     --budget file://budget.json
   ```

3. **Monitor for 1 Week**:
   - Check CloudWatch logs daily
   - Monitor Lambda duration
   - Check error rates
   - Verify static files loading

4. **Optimize**:
   - Adjust memory if needed
   - Add caching if needed
   - Consider Provisioned Concurrency if cold starts are an issue

---

## 📚 Additional Resources

- [AWS Lambda Pricing](https://aws.amazon.com/lambda/pricing/)
- [API Gateway HTTP API Pricing](https://aws.amazon.com/api-gateway/pricing/)
- [Mangum Documentation](https://mangum.io/)
- [Django on Lambda Best Practices](https://www.serverless.com/examples/aws-python-django-api)

---

## ❓ FAQ

**Q: Can I still use Docker for local development?**
A: Yes! The Lambda configuration only activates when `AWS_LAMBDA_FUNCTION_NAME` is set.

**Q: What happens to my ECS deployment?**
A: Keep it running until you've fully tested Lambda. Then shut down ECS to save costs.

**Q: How do I rollback if something breaks?**
A: Keep your ECS setup running for 1 week as a backup. Point DNS back to ALB if needed.

**Q: Will this handle traffic spikes?**
A: Yes! Lambda auto-scales. But watch for database connection limits.

**Q: What about WebSocket support?**
A: API Gateway WebSocket API is supported but requires additional configuration.

---

**Questions? Issues? Contact: noreply@carlosleon.tech**
