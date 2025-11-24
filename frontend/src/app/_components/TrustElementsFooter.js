import Image from 'next/image';
import Link from 'next/link';

export default function TrustElementsFooter({ spacing }) {
  return (
    <section className={`${spacing} border-t border-neutral-200`}>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-600 md:gap-800 items-center">
          {/* Professional Headshot */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-[280px] h-[280px]">
              <Image
                src="/images/profile.png"
                alt="Carlos Leon - Data Engineer & Developer"
                fill
                className="rounded-full object-cover"
                sizes="280px"
              />
            </div>
          </div>

          {/* Trust Elements & Info */}
          <div className="text-center md:text-left">
            <h3 className="text-3 text-neutral-900 mb-300">
              Let&apos;s Work Together
            </h3>

            {/* Availability & Timezone */}
            <div className="mb-400">
              <p className="text-4 text-neutral-400 mb-150">
                <span className="text-brand-blue-500">📍</span> Based in Bogotá,
                Colombia
              </p>
              <p className="text-4 text-neutral-400 mb-150">
                <span className="text-brand-blue-500">🌍</span> Working with
                clients globally
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-400 justify-center md:justify-start items-center">
              <Link
                href="https://www.linkedin.com/in/carlosarturoleon"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[48px] h-[48px] rounded-full bg-neutral-900 hover:bg-brand-blue-500 transition-colors flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <svg className="w-[24px] h-[24px] fill-neutral-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
              <Link
                href="https://github.com/carlosarturoleon"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[48px] h-[48px] rounded-full bg-neutral-900 hover:bg-brand-blue-500 transition-colors flex items-center justify-center"
                aria-label="GitHub"
              >
                <svg className="w-[24px] h-[24px] fill-neutral-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </Link>
              <Link
                href="/projects"
                className="w-[48px] h-[48px] rounded-full bg-brand-blue-500 hover:bg-brand-purple-500 transition-colors flex items-center justify-center"
                aria-label="Portfolio"
              >
                <svg className="w-[24px] h-[24px] fill-neutral-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
