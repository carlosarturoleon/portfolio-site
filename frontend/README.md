This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Local Development Setup

### Prerequisites

1. **Django Backend** - Must be running on `http://localhost:8000`
   ```bash
   cd ../backend
   source venv/bin/activate
   python manage.py runserver
   ```

2. **Environment Variables** - Create `.env.local` file:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### API Proxy Configuration

The Next.js development server proxies API requests from `/api/*` to the Django backend at `http://localhost:8000/api/*`. This avoids CORS issues during local development.

**Example:**
```javascript
// Request to /api/users will be proxied to http://localhost:8000/api/users
import api from '@/app/_lib/api';
const users = await api.get('/api/users');
```

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment

This frontend is deployed on **AWS Amplify** with automatic builds connected to GitHub.

### Deployment Process
1. Push changes to the GitHub repository
2. AWS Amplify automatically detects changes and triggers a build
3. Build configuration is defined in [amplify.yml](../amplify.yml) at the project root
4. Environment variables are configured in the Amplify console:
   - `NEXT_PUBLIC_API_URL` - Backend API endpoint (e.g., `https://api.carlosleon.tech`)

### Manual Deployment Testing
To test a production build locally:
```bash
npm run build
npm start
```

For more deployment details, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
