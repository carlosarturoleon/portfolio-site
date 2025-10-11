'use client';

import Image from 'next/image';
import { useState } from 'react';

const slides = [
  { id: 1, image: '/images/image-slide-1.jpg', alt: 'Design work slide 1' },
  { id: 2, image: '/images/image-slide-2.jpg', alt: 'Design work slide 2' },
  { id: 3, image: '/images/image-slide-3.jpg', alt: 'Design work slide 3' },
  { id: 4, image: '/images/image-slide-4.jpg', alt: 'Design work slide 4' },
  { id: 5, image: '/images/image-slide-5.jpg', alt: 'Design work slide 5' },
];

export default function Portfolio() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="py-800 md:py-1000">
      <div className="text-center mb-500 px-200 md:px-400">
        <h2 className="text-2 text-neutral-900">My Work</h2>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Slides Container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)`, transitionDuration: '500ms' }}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="min-w-full flex justify-center px-200 md:px-400"
                style={{ paddingLeft: '165px', paddingRight: '165px' }}
              >
                <div className="relative w-full rounded-10" style={{ maxWidth: '540px', height: '360px' }}>
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    className="object-cover rounded-10"
                    sizes="(max-width: 768px) 100vw, 540px"
                  />
                </div>
              </div>
            ))}
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