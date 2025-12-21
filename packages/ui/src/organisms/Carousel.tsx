// import components
import React, { useState } from 'react';
// import types
export interface CarouselProps {
  items: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
}

/**
 * Carousel component for sliding content.
 * @param {CarouselProps} props Component props
 * @returns {React.JSX.Element} Carousel element
 */
export function Carousel({
  items,
  autoPlay = false,
  interval = 3000,
}: CarouselProps): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, items.length]);

  const goToPrevious = (): void => {
    setCurrentIndex(prev => (prev - 1 + items.length) % items.length);
  };

  const goToNext = (): void => {
    setCurrentIndex(prev => (prev + 1) % items.length);
  };

  return (
    <div className="relative w-full overflow-hidden bg-gray-100 rounded-lg">
      <div className="relative aspect-video">{items[currentIndex]}</div>
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
      >
        ←
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
      >
        →
      </button>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
