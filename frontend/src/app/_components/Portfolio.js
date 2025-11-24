'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useProjectImages } from '@/lib/hooks/useProjectImages';

export default function Portfolio() {
  const { projects, loading, error } = useProjectImages();
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerView = 3;

  // Use dynamic projects or fallback to empty array
  const slides = projects.length > 0 ? projects : [];
  const maxSlide = Math.max(0, slides.length - itemsPerView);

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

      {/* Loading State */}
      {loading && (
        <div className="text-center py-800">
          <div className="inline-flex items-center gap-200 text-5 text-neutral-600">
            <div className="w-[20px] h-[20px] border-2 border-brand-blue-500 border-t-transparent rounded-full animate-spin" />
            Loading projects...
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-800 px-200 md:px-400">
          <p className="text-5 text-red-600">Failed to load projects. Please try again later.</p>
        </div>
      )}

      {/* Carousel */}
      {!loading && !error && slides.length > 0 && (
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
                    <Link
                      href={`/blog/${slide.slug}`}
                      className={`relative rounded-10 w-full ${isCenter ? 'aspect-[4/3]' : 'aspect-auto h-full lg:aspect-square'} group`}
                    >
                      <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        className="object-cover rounded-10 transition-transform group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      {/* Optional overlay on hover */}
                      <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/20 rounded-10 transition-colors" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-200 mt-400 md:mt-500">
            <button
              onClick={prevSlide}
              className="bg-neutral-900 rounded-full flex items-center justify-center hover:bg-brand-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ width: '64px', height: '64px' }}
              aria-label="Previous slide"
              disabled={currentSlide === 0}
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
              className="bg-neutral-900 rounded-full flex items-center justify-center hover:bg-brand-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ width: '64px', height: '64px' }}
              aria-label="Next slide"
              disabled={currentSlide >= maxSlide}
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
      )}

      {/* Empty State */}
      {!loading && !error && slides.length === 0 && (
        <div className="text-center py-800 px-200 md:px-400">
          <p className="text-5 text-neutral-600">No projects available yet. Check back soon!</p>
        </div>
      )}
    </section>
  );
}