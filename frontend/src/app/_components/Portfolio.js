'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const slides = [
  { id: 2, image: '/images/image-slide-2.jpg', alt: 'Design work slide 2' },
  { id: 3, image: '/images/image-slide-3.jpg', alt: 'Design work slide 3' },
  { id: 4, image: '/images/image-slide-4.jpg', alt: 'Design work slide 4' },
  { id: 5, image: '/images/image-slide-5.jpg', alt: 'Design work slide 5' },
];

export default function Portfolio() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerView = 3;
  const maxSlide = slides.length - itemsPerView;

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="-mx-200 md:-mx-400 lg:-mx-1600">
      <div className="text-center mb-500 px-200 md:px-400">
        <Link href="/projects" className="text-2 text-neutral-900 hover:text-brand-blue-500 transition-colors inline-block">
          My Work
        </Link>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Slides Container */}
        <div className="overflow-hidden">
          <div
            className="flex items-stretch transition-transform ease-in-out"
            style={{ transform: `translateX(-${currentSlide * (100 / itemsPerView)}%)`, transitionDuration: '500ms' }}
          >
            {slides.map((slide, index) => {
              const isCenter = index === currentSlide + 1;
              return (
                <div
                  key={slide.id}
                  className={`px-100 md:px-150 lg:px-300 ${isCenter ? 'min-w-[60%] md:min-w-[60%] lg:min-w-[40%]' : 'min-w-[25%] md:min-w-[25%] lg:min-w-[30%]'} self-stretch flex items-center`}
                >
                  <div className={`relative rounded-10 w-full ${isCenter ? 'aspect-[4/3]' : 'aspect-auto h-full lg:aspect-square'}`}>
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      className="object-cover rounded-10"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-200 mt-400 md:mt-500">
          <button
            onClick={prevSlide}
            className="bg-neutral-900 rounded-full flex items-center justify-center hover:bg-brand-blue-500 transition-colors"
            style={{ width: '64px', height: '64px' }}
            aria-label="Previous slide"
          >
            <Image
              src="/images/icon-arrow-left.svg"
              alt=""
              width={15}
              height={16}
            />
          </button>
          <button
            onClick={nextSlide}
            className="bg-neutral-900 rounded-full flex items-center justify-center hover:bg-brand-blue-500 transition-colors"
            style={{ width: '64px', height: '64px' }}
            aria-label="Next slide"
          >
            <Image
              src="/images/icon-arrow-right.svg"
              alt=""
              width={15}
              height={16}
            />
          </button>
        </div>
      </div>
    </section>
  );
}