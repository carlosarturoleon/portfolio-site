'use client';

import Image from 'next/image';
import Link from 'next/link';
// Newsletter subscribe UI is disabled until the flow is finished — see NewsletterSignup.js
// import { useRef } from 'react';
// import Button from './Button';
// import NewsletterSignup from './NewsletterSignup';

export default function Footer() {
  // const newsletterRef = useRef(null);

  // const handleSubscribe = () => {
  //   if (newsletterRef.current) {
  //     newsletterRef.current.submit();
  //   }
  // };

  return (
    <footer>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 py-400 md:py-500 bg-neutral-0">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={64}
            height={64}
          />
        </Link>

        {/* <div className="flex-1 w-full">
          <NewsletterSignup ref={newsletterRef} />
        </div>

        <Button variant="dark" onClick={handleSubscribe}>Subscribe</Button> */}
      </div>
    </footer>
  );
}
