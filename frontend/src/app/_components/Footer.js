import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';

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

        <Button variant="dark" />
      </div>
    </footer>
  );
}
