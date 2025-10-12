import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';

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

        <Button variant="dark" />
      </div>
    </header>
  );
}
