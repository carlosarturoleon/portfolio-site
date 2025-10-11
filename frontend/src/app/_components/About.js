import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <section className="py-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1000 md:gap-1600 items-center">
        {/* Profile Image */}
        <div className="relative flex justify-center md:justify-start">
          <div className="relative w-full aspect-square">
            <Image
              src="/images/image-amy.webp"
              alt="Amy - Designer"
              fill
              className="rounded-full object-cover"
              sizes="(max-width: 768px) 100vw, 445px"
            />
          </div>
        </div>

        {/* About Text */}
        <div className="text-center md:text-left max-w-[540px]">
          <h2 className="text-2 text-neutral-900 mb-300 md:mb-400">
            I'm Amy, and I'd love to work on your next project
          </h2>
          <p className="text-4 text-neutral-400 mb-300 md:mb-400">
            I love working with others to create beautiful design solutions. I've designed everything from brand illustrations to complete mobile apps. I'm also handy with a camera!
          </p>
          <Link
            href="#contact"
            className="inline-block bg-brand-red-500 text-neutral-0 text-5 px-500 py-150 rounded-full hover:bg-brand-yellow-500 transition-colors"
          >
            Free Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}