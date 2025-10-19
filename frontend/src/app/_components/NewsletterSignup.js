'use client';

import { useState, forwardRef, useImperativeHandle } from 'react';

const NewsletterSignup = forwardRef(function NewsletterSignup(props, ref) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/newsletter/subscribe/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Thanks for subscribing! Please check your email to confirm.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.errors?.email?.[0] || data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Unable to subscribe. Please try again later.');
      console.error('Newsletter subscription error:', error);
    }
  };

  useImperativeHandle(ref, () => ({
    submit: handleSubmit,
    isLoading: status === 'loading'
  }));

  return (
    <div className="newsletter-signup w-full">
      <div className="flex items-center gap-6">
        <div className="flex-1 text-center">
          <h3 className="text-lg font-semibold mb-1">Subscribe to Newsletter</h3>
          <p className="text-sm text-neutral-600">
            Get updates on new projects, blog posts, and technical insights.
          </p>
        </div>
        <div className="flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={status === 'loading'}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      {message && (
        <div
          className={`mt-3 p-3 rounded-lg text-sm ${
            status === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
});

export default NewsletterSignup;
