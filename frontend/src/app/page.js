'use client';

import { useEffect, useState } from 'react';
import api from '@/app/_lib/api';

export default function Home() {
  const [health, setHealth] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const data = await api.get('/api/health');
        setHealth(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setHealth(null);
      } finally {
        setLoading(false);
      }
    };

    checkBackend();
  }, []);

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-1 text-neutral-900 mb-300">
          Carlos Leon Portfolio
        </h1>

        <div className="bg-neutral-200 rounded-16 p-300 mb-300">
          <h2 className="text-3 text-neutral-900 mb-150">
            Backend API Status
          </h2>

          {loading && (
            <p className="text-4 text-neutral-400">Checking backend...</p>
          )}

          {error && (
            <div className="bg-brand-red-500 bg-opacity-10 border-2 border-brand-red-500 rounded-8 p-200">
              <p className="text-5 text-brand-red-500">
                ❌ Backend Error: {error}
              </p>
              <p className="text-neutral-400 mt-100 text-sm">
                Make sure Django backend is running on http://localhost:8000
              </p>
            </div>
          )}

          {health && (
            <div className="bg-brand-cyan-500 bg-opacity-10 border-2 border-brand-cyan-500 rounded-8 p-200">
              <p className="text-5 text-brand-cyan-500">
                ✓ Backend Connected Successfully
              </p>
              <pre className="mt-150 text-sm text-neutral-900 bg-neutral-0 p-150 rounded-8 overflow-x-auto">
                {JSON.stringify(health, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-200">
          <div className="bg-brand-blue-500 rounded-16 p-300">
            <h3 className="text-3 text-neutral-0">Design Tokens</h3>
            <p className="text-4 text-neutral-0 mt-100">
              Configured and ready
            </p>
          </div>

          <div className="bg-brand-yellow-500 rounded-16 p-300">
            <h3 className="text-3 text-neutral-900">API Integration</h3>
            <p className="text-4 text-neutral-900 mt-100">
              {health ? 'Connected' : 'Not connected'}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}