import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <div className="flex justify-between items-center py-200 md:py-300">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={64}
            height={64}
            priority
          />
        </Link>

        <Link
          href="#contact"
          className="bg-neutral-900 text-neutral-0 text-5 px-300 py-100 md:px-500 md:py-150 rounded-full hover:bg-brand-blue-500 transition-colors"
        >
          Free Consultation
        </Link>
      </div>
    </header>
  );
}
