import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ServiceCard from './ServiceCard';

const getVisibleCount = (width) => {
  if (width < 640) return 1;
  if (width < 1024) return 2;
  return 3;
};

const ServiceCarousel = ({ services = [] }) => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(3);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  useEffect(() => {
    const update = () => setVisible(getVisibleCount(window.innerWidth));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const maxIndex = Math.max(0, services.length - visible);

  useEffect(() => {
    setIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (paused || services.length <= visible) return undefined;
    const timer = setInterval(() => {
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [paused, maxIndex, services.length, visible]);

  if (!services.length) {
    return (
      <div className="rounded-2xl bg-surface p-10 text-center text-muted">
        Services will appear here soon.
      </div>
    );
  }

  const go = (dir) => {
    setIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return maxIndex;
      if (next > maxIndex) return 0;
      return next;
    });
  };

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    setPaused(true);
  };

  const onTouchMove = (e) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const onTouchEnd = () => {
    if (touchDeltaX.current < -50) go(1);
    if (touchDeltaX.current > 50) go(-1);
    setPaused(false);
  };

  const gap = 28;
  const slidePercent = 100 / visible;

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <motion.div
          className="flex"
          style={{ gap: `${gap}px` }}
          animate={{ x: `calc(-${index * slidePercent}% - ${index * (gap / visible)}px)` }}
          transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        >
          {services.map((service) => (
            <div
              key={service._id}
              className="shrink-0"
              style={{ width: `calc(${slidePercent}% - ${(gap * (visible - 1)) / visible}px)` }}
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </motion.div>
      </div>

      {services.length > visible && (
        <>
          <button
            type="button"
            aria-label="Previous services"
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-sm text-primary shadow-lg ring-1 ring-black/10 transition hover:bg-primary hover:text-white sm:left-3 sm:h-11 sm:w-11"
          >
            <FaChevronLeft />
          </button>
          <button
            type="button"
            aria-label="Next services"
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-sm text-primary shadow-lg ring-1 ring-black/10 transition hover:bg-primary hover:text-white sm:right-3 sm:h-11 sm:w-11"
          >
            <FaChevronRight />
          </button>

          <div className="mt-6 flex items-center justify-center gap-2 sm:mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all sm:h-2.5 ${
                  i === index ? 'w-6 bg-primary sm:w-8' : 'w-2 bg-primary/25 sm:w-2.5'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceCarousel;
