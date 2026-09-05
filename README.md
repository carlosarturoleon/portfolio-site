# Carlos Leon — Portfolio Site

Production portfolio site at [carlosleon.tech](https://carlosleon.tech) — a decoupled Next.js frontend and Django REST API, deployed independently and talking over HTTPS.

## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router, Turbopack) · React 19 · Tailwind CSS 4 |
| Backend | Django 5.2 · Django REST Framework · Gunicorn |
| Database | PostgreSQL (Neon serverless in production) |
| Hosting | Vercel (frontend) · Railway (backend, Docker) |
| Email / Notifications | SendGrid · Slack webhooks |
| DNS | Cloudflare |

## Features

- **Blog** — Markdown content via `django-markdownx`, categories/tags, full-text search (Postgres GIN index), view counts
- **Newsletter** — double opt-in subscription flow with UUID confirmation tokens
- **Contact** — structured lead-capture form with automatic high-value lead detection, Slack + email notifications
- **Rate limiting** — per-endpoint DRF throttling in production
- Independent CI/CD: pushing to `main` auto-deploys the frontend (Vercel) and backend (Railway) separately

See [architecture-enhanced.md](architecture-enhanced.md) for a full architecture diagram and technical writeup.

## Project Structure

```
portfolio-site/
├── frontend/    # Next.js app (App Router)
├── backend/     # Django REST API (blog, newsletter, contact apps)
└── docker-compose.yml   # Local Postgres + Django
```

## Local Development

**Backend**
```bash
cd backend
source venv/bin/activate
python manage.py migrate
python manage.py runserver   # http://localhost:8000
```

**Frontend**
```bash
cd frontend
npm install
npm run dev                  # http://localhost:3000
```

Or run the full stack (Postgres + Django) with Docker:
```bash
docker-compose up
```

Copy `backend/.env.production.example` to `backend/.env` (or a root `.env`) and fill in real values for local configuration — `SECRET_KEY`, database credentials, and any third-party API keys are required, not optional.
