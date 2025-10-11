import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="flex justify-between items-center py-400 md:py-500 bg-neutral-0">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={64}
            height={64}
          />
        </Link>

        <Link
          href="#contact"
          className="bg-neutral-900 text-neutral-0 text-5 px-300 py-100 md:px-500 md:py-150 rounded-full hover:bg-brand-blue-500 transition-colors"
        >
          Free Consultation
        </Link>
      </div>
    </footer>
  );
}
