# Portfolio Site - Carlos Leon

A production-ready, full-stack portfolio website built with Next.js and Django, deployed on AWS.

🌐 **Live Site**: [carlosleon.tech](https://carlosleon.tech)

## Tech Stack

### Frontend
- **Framework**: Next.js 15.5.4 (App Router)
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS 4
- **Deployment**: AWS Amplify (automated deployments via GitHub)

### Backend
- **Framework**: Django 5.2.6
- **API**: Django REST Framework
- **Database**: PostgreSQL 17 (local) / RDS PostgreSQL (production)
- **Web Server**: AWS Lambda (Mangum ASGI adapter)
- **Deployment**: Serverless via AWS Lambda + API Gateway

### AWS Infrastructure
- **Frontend Hosting**: AWS Amplify
- **Backend**: AWS Lambda + API Gateway (Serverless)
- **Database**: RDS PostgreSQL
- **Static Files**: S3
- **Email**: SendGrid (via API)
- **DNS & SSL**: Route 53 + ACM Certificate
- **Secrets Management**: AWS Secrets Manager

## Features

- 📝 **Blog System**: Full-featured blog with categories, tags, and Markdown support
- 📧 **Newsletter**: Email subscription with double opt-in confirmation
- 💬 **Contact Form**: Direct contact with Slack & email notifications
- 🔍 **SEO Optimized**: Dynamic sitemaps, robots.txt, and meta tags
- 🎨 **Responsive Design**: Mobile-first design with Tailwind CSS
- 🔒 **Secure**: CSRF protection, CORS configuration, rate limiting
- ⚡ **Performance**: Static file compression, API caching, CDN delivery

## Project Structure

```
portfolio-site/
├── frontend/              # Next.js application
│   ├── src/app/          # App Router pages and components
│   ├── public/           # Static assets
│   └── package.json      # Frontend dependencies
├── backend/              # Django REST API
│   ├── portfolio_backend/  # Django project settings
│   ├── blog/             # Blog app
│   ├── newsletter/       # Newsletter app
│   ├── contact/          # Contact form app
│   ├── deploy-lambda.sh  # Lambda deployment script
│   ├── template.yaml     # AWS SAM CloudFormation template
│   └── requirements.txt  # Python dependencies
├── amplify.yml           # AWS Amplify build config
└── docker-compose.yml    # Local development setup
```

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- PostgreSQL 17 (or use Docker)
- Docker & Docker Compose (optional, for containerized development)

### Option 1: Local Development (Manual Setup)

#### 1. Start the Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Set up database
createdb portfolio_db
psql portfolio_db -c "CREATE USER portfolio_user WITH PASSWORD 'password';"
psql portfolio_db -c "GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;"

# Run migrations and start server
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

#### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```

Visit:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Django Admin**: http://localhost:8000/secure-admin-panel/

### Option 2: Docker Development (Recommended)

```bash
# Create .env file with database credentials
cp .env.example .env  # Edit with your values

# Start both backend and database
docker-compose up

# In another terminal, start frontend
cd frontend
npm install
npm run dev
```

## Environment Variables

### Frontend (`.env.local`)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (`.env` or `.env.production`)
```bash
# Django
DEBUG=True  # False in production
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DB_NAME=portfolio_db
DB_USER=portfolio_user
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432

# AWS (Production only)
AWS_REGION=us-east-2
AWS_SES_REGION_NAME=us-east-2
DEFAULT_FROM_EMAIL=noreply@carlosleon.tech

# Optional
SLACK_WEBHOOK_URL=your-slack-webhook-url
```

See [backend/.env.production.example](backend/.env.production.example) for complete production configuration.

## Development

### Frontend Development
```bash
cd frontend
npm run dev         # Start dev server with Turbopack
npm run build       # Build for production
npm run lint        # Run ESLint
```

### Backend Development
```bash
cd backend
source venv/bin/activate
python manage.py runserver        # Start dev server
python manage.py migrate          # Run migrations
python manage.py createsuperuser  # Create admin user
python manage.py create_sample_data  # Generate sample blog posts
```

### Database Management
```bash
# Using Docker Compose
docker-compose exec db psql -U portfolio_user -d portfolio_db

# Reset database
docker-compose down -v  # Deletes all data
docker-compose up
```

## Deployment

### Frontend (Automatic via AWS Amplify)
1. Push changes to GitHub
2. Amplify automatically builds and deploys
3. Build configuration in [amplify.yml](amplify.yml)

### Backend (AWS Lambda)

The backend is deployed as a serverless function using AWS Lambda + API Gateway.

#### Deployment Process
```bash
cd backend
./deploy-lambda.sh
```

This creates `django-lambda.zip` with all dependencies and uploads to Lambda.

#### Infrastructure
- **Function**: `portfolio-backend-lambda`
- **Handler**: `portfolio_backend.asgi_lambda.handler`
- **Runtime**: Python 3.11
- **Memory**: 512 MB
- **Timeout**: 30 seconds
- **API Gateway**: HTTP API with custom domain `api.carlosleon.tech`

#### Cost Savings
Lambda deployment saves ~$26-32/month compared to previous ECS setup:
- ALB: $16-18/month → $0
- ECS Fargate: $30/month → $0
- Lambda: ~$0-2/month
- API Gateway: ~$1-3/month

See [backend/LAMBDA_DEPLOYMENT.md](backend/LAMBDA_DEPLOYMENT.md) for detailed instructions.

## API Documentation

### Blog Endpoints
- `GET /api/posts/` - List all blog posts (paginated)
- `GET /api/posts/<slug>/` - Get single post by slug
- `GET /api/categories/` - List all categories
- `GET /api/tags/` - List all tags

### Newsletter Endpoints
- `POST /api/newsletter/subscribe/` - Subscribe to newsletter
- `GET /api/newsletter/confirm/<token>/` - Confirm subscription
- `POST /api/newsletter/unsubscribe/` - Unsubscribe

### Contact Endpoint
- `POST /api/contact/` - Submit contact form

### Utility Endpoints
- `GET /api/health` - Health check endpoint
- `GET /sitemap.xml` - Dynamic sitemap
- `GET /robots.txt` - Robots file

## Testing

### Frontend
```bash
cd frontend
npm test
```

### Backend
```bash
cd backend
python manage.py test
```

## Documentation

For detailed setup, configuration, and deployment instructions, see [CLAUDE.md](CLAUDE.md).

## License

Private project - All rights reserved.

## Author

**Carlos Leon**
- Website: [carlosleon.tech](https://carlosleon.tech)
- GitHub: [@carlosarturoleon](https://github.com/carlosarturoleon)
