"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[2/1] bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-gray-400">No images available</div>
      </div>
    );
  }

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Layout for 1 image
  if (images.length === 1) {
    return (
      <>
        <div className="relative aspect-[2/1] rounded-lg overflow-hidden cursor-pointer group">
          <Image
            src={images[0]}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onClick={() => openModal(0)}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
        </div>
        {showModal && (
          <ImageModal
            images={images}
            currentIndex={currentImageIndex}
            onClose={closeModal}
            onNext={nextImage}
            onPrev={prevImage}
            onImageSelect={setCurrentImageIndex}
            title={title}
          />
        )}
      </>
    );
  }

  // Layout for 2+ images
  return (
    <>
      {/* Mobile layout - Single image with dots indicator */}
      <div className="sm:hidden">
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src={images[currentImageIndex]}
            alt={`${title} - Image ${currentImageIndex + 1}`}
            fill
            className="object-cover"
            priority
          />

          {/* Navigation buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-lg transition-all hover:bg-white"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-lg transition-all hover:bg-white"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Dots indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
              {images.slice(0, Math.min(images.length, 8)).map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
              {images.length > 8 && (
                <span className="text-white text-xs ml-2">
                  +{images.length - 8}
                </span>
              )}
            </div>
          )}

          {/* Tap to view all */}
          <button
            onClick={() => openModal(currentImageIndex)}
            className="absolute top-3 right-3 bg-white/80 rounded-lg px-3 py-1 text-xs font-medium text-gray-700 hover:bg-white transition-colors"
          >
            View all
          </button>
        </div>
      </div>

      {/* Desktop layout - Grid */}
      <div className="hidden sm:block relative">
        <div className="grid grid-cols-4 grid-rows-2 gap-1 sm:gap-2 h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden">
          {/* Main large image */}
          <div
            className="col-span-2 row-span-2 relative cursor-pointer group"
            onClick={() => openModal(0)}
          >
            <Image
              src={images[0]}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
          </div>

          {/* Thumbnail grid */}
          {images.slice(1, 5).map((image, index) => (
            <div
              key={index + 1}
              className="relative cursor-pointer group overflow-hidden"
              onClick={() => openModal(index + 1)}
            >
              <Image
                src={image}
                alt={`${title} - Image ${index + 2}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />

              {/* Show more overlay on last image if there are more images */}
              {index === 3 && images.length > 5 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm sm:text-base lg:text-lg">
                    +{images.length - 5} more
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Show all photos button */}
        <button
          onClick={() => openModal(0)}
          className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-all hover:scale-105 flex items-center space-x-1 sm:space-x-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          <span>Show all photos</span>
        </button>
      </div>

      {showModal && (
        <ImageModal
          images={images}
          currentIndex={currentImageIndex}
          onClose={closeModal}
          onNext={nextImage}
          onPrev={prevImage}
          onImageSelect={setCurrentImageIndex}
          title={title}
        />
      )}
    </>
  );
}

// Full-screen image modal
interface ImageModalProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onImageSelect: (index: number) => void;
  title: string;
}

function ImageModal({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  onImageSelect,
  title,
}: ImageModalProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Handle touch events for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && images.length > 1) {
      onNext();
    }
    if (isRightSwipe && images.length > 1) {
      onPrev();
    }
    
    // Reset touch positions
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (images.length > 1) onPrev();
          break;
        case 'ArrowRight':
          if (images.length > 1) onNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev, images.length]);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center animate-[fadeIn_0.3s_ease-out] backdrop-blur-sm"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={(e) => {
        // Close modal when clicking outside the image
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 p-2 rounded-full hover:bg-white/10 transition-all duration-200 hover:scale-110 active:scale-95"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Image counter */}
      <div className="absolute top-4 left-4 text-white text-sm z-10 bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm animate-[fadeIn_0.5s_ease-out]">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 p-3 rounded-full hover:bg-white/10 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 p-3 rounded-full hover:bg-white/10 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Main image */}
      <div className="relative max-w-4xl max-h-[80vh] w-full h-full flex items-center justify-center px-16">
        <div className="relative w-full h-full animate-[fadeIn_0.4s_ease-out] transition-all duration-300">
          <Image
            src={images[currentIndex]}
            alt={`${title} - Image ${currentIndex + 1}`}
            width={1200}
            height={800}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            key={currentIndex} // Force re-render for smooth transitions
          />
        </div>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-full overflow-x-auto px-4 scrollbar-hide animate-[fadeIn_0.6s_ease-out]">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => onImageSelect(index)}
              className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-110 ${
                index === currentIndex
                  ? "border-white opacity-100 scale-110 shadow-lg"
                  : "border-transparent opacity-60 hover:opacity-80"
              }`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                width={64}
                height={64}
                className="w-full h-full object-cover transition-transform duration-300"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
