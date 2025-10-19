'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ConfirmSubscription() {
  const params = useParams();
  const router = useRouter();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const confirmSubscription = async () => {
      if (!params.token) {
        setStatus('error');
        setMessage('Invalid confirmation link');
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/newsletter/confirm/${params.token}/`
        );

        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage(data.message || 'Your subscription has been confirmed successfully!');
        } else {
          setStatus('error');
          setMessage(data.error || 'This confirmation link is invalid or has expired.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Unable to confirm subscription. Please try again later.');
        console.error('Newsletter confirmation error:', error);
      }
    };

    confirmSubscription();
  }, [params.token]);

  return (
    <div className="min-h-screen bg-neutral-0 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {status === 'loading' && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600 mb-4"></div>
            <h1 className="text-2xl font-bold mb-2">Confirming...</h1>
            <p className="text-neutral-600">Please wait while we confirm your subscription.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-green-600 mb-2">Welcome!</h1>
            <p className="text-neutral-700 mb-6">{message}</p>
            <p className="text-sm text-neutral-600 mb-6">
              You&apos;ll receive updates on new projects, blog posts, and technical insights.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              Go to Homepage
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-red-600 mb-2">Confirmation Failed</h1>
            <p className="text-neutral-700 mb-6">{message}</p>
            <div className="space-y-3">
              <Link
                href="/"
                className="block px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
              >
                Go to Homepage
              </Link>
              <Link
                href="/#newsletter"
                className="block px-6 py-3 border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Try Subscribing Again
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
