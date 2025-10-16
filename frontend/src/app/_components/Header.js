'use client';

import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header>
      <div className="relative flex justify-between items-center py-200 md:py-300">
        <div className="flex items-center gap-400">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={64}
              height={64}
              priority
            />
          </Link>
          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden flex flex-col gap-100 w-[32px] h-[24px] justify-center z-50"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-[3px] w-full bg-neutral-900 transition-transform duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-[9px]' : ''
              }`}
            />
            <span
              className={`block h-[3px] w-full bg-neutral-900 transition-opacity duration-300 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-[3px] w-full bg-neutral-900 transition-transform duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''
              }`}
            />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-400 absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="text-3 text-neutral-900 hover:text-brand-blue-500 transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-3 text-neutral-900 hover:text-brand-blue-500 transition-colors">
            About
          </Link>
          <Link href="/projects" className="text-3 text-neutral-900 hover:text-brand-blue-500 transition-colors">
            My Work
          </Link>
          <Link href="/blog" className="text-3 text-neutral-900 hover:text-brand-blue-500 transition-colors">
            Blog
          </Link>
        </nav>

        {/* Get Started Button */}
        <Button variant="dark" />

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-neutral-900/50 z-40"
            onClick={toggleMenu}
          />
        )}

        {/* Mobile Menu Drawer */}
        <nav
          className={`lg:hidden fixed top-0 right-0 h-full w-[280px] bg-neutral-0 shadow-lg transform transition-transform duration-300 z-40 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col gap-400 p-400 mt-800">
            <Link
              href="/"
              className="text-3 text-neutral-900 hover:text-brand-blue-500 transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-3 text-neutral-900 hover:text-brand-blue-500 transition-colors"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              href="/projects"
              className="text-3 text-neutral-900 hover:text-brand-blue-500 transition-colors"
              onClick={toggleMenu}
            >
              Projects
            </Link>
            <Link
              href="/blog"
              className="text-3 text-neutral-900 hover:text-brand-blue-500 transition-colors"
              onClick={toggleMenu}
            >
              Blog
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
