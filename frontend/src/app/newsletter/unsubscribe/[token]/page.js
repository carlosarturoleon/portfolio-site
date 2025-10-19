'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function UnsubscribePage() {
  const params = useParams();
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleUnsubscribe = async () => {
    if (!params.token) {
      setStatus('error');
      setMessage('Invalid unsubscribe link');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/newsletter/unsubscribe/${params.token}/`,
        {
          method: 'POST',
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'You have been successfully unsubscribed.');
      } else {
        setStatus('error');
        setMessage(data.error || 'This unsubscribe link is invalid or has expired.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Unable to unsubscribe. Please try again later.');
      console.error('Newsletter unsubscribe error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-0 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {status === 'idle' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">Unsubscribe from Newsletter</h1>
            <p className="text-neutral-600 mb-6">
              Are you sure you want to unsubscribe? You&apos;ll no longer receive updates about new
              projects, blog posts, and technical insights.
            </p>
            <div className="space-y-3">
              <button
                onClick={handleUnsubscribe}
                className="w-full px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                Yes, Unsubscribe
              </button>
              <Link
                href="/"
                className="block w-full px-6 py-3 border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </div>
        )}

        {status === 'loading' && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600 mb-4"></div>
            <h1 className="text-2xl font-bold mb-2">Processing...</h1>
            <p className="text-neutral-600">Please wait while we process your request.</p>
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
            <h1 className="text-2xl font-bold text-green-600 mb-2">Unsubscribed Successfully</h1>
            <p className="text-neutral-700 mb-6">{message}</p>
            <p className="text-sm text-neutral-600 mb-6">
              We&apos;re sorry to see you go. You can always resubscribe anytime.
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
            <h1 className="text-2xl font-bold text-red-600 mb-2">Unsubscribe Failed</h1>
            <p className="text-neutral-700 mb-6">{message}</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              Go to Homepage
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
