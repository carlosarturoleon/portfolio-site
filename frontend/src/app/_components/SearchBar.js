'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

/**
 * SearchBar component - Reusable search input with debouncing
 * @param {string} value - Current search value
 * @param {function} onChange - Callback when search value changes (debounced)
 * @param {string} placeholder - Placeholder text for input
 * @param {number} debounceMs - Debounce delay in milliseconds (default: 300)
 */
export default function SearchBar({
  value = '',
  onChange,
  placeholder = 'Search...',
  debounceMs = 300
}) {
  const [localValue, setLocalValue] = useState(value);

  // Sync local value with prop value
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounce the onChange callback
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [localValue, value, onChange, debounceMs]);

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className="relative w-full mb-600">
      {/* Search Icon */}
      <div className="absolute left-300 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-neutral-400"
        >
          <path
            d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Input Field */}
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-600 pr-600 py-200 text-5 text-neutral-900 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent transition-all"
        aria-label="Search"
      />

      {/* Clear Button */}
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute right-300 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors p-050"
          aria-label="Clear search"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 5L5 15M5 5l10 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
