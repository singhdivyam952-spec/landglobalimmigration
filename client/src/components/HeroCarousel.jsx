import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const DEFAULT_SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80',
    alt: 'Airplane wing above the clouds',
  },
  {
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80',
    alt: 'Mountain landscape destination',
  },
  {
    src: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=2000&q=80',
    alt: 'World travel and airports',
  },
  {
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2000&q=80',
    alt: 'Scenic global destination',
  },
  {
    src: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=2000&q=80',
    alt: 'City skyline abroad',
  },
];

const HeroCarousel = ({ slides = DEFAULT_SLIDES, interval = 5000 }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const items = slides.length ? slides : DEFAULT_SLIDES;

  useEffect(() => {
    if (paused || items.length <= 1) return undefined;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [paused, items.length, interval]);

  const go = (dir) => {
    setIndex((prev) => (prev + dir + items.length) % items.length);
  };

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={items[index].src}
          src={items[index].src}
          alt={items[index].alt}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/65 lg:bg-gradient-to-r lg:from-black/75 lg:via-black/55 lg:to-black/30" />

      {items.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous hero image"
            onClick={() => go(-1)}
            className="absolute bottom-3 left-3 z-20 hidden h-9 w-9 items-center justify-center rounded-full bg-white/25 text-sm text-white backdrop-blur-sm transition hover:bg-primary sm:flex md:bottom-4 md:left-6"
          >
            <FaChevronLeft />
          </button>
          <button
            type="button"
            aria-label="Next hero image"
            onClick={() => go(1)}
            className="absolute bottom-3 left-14 z-20 hidden h-9 w-9 items-center justify-center rounded-full bg-white/25 text-sm text-white backdrop-blur-sm transition hover:bg-primary sm:flex md:bottom-4 md:left-16"
          >
            <FaChevronRight />
          </button>

          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 sm:bottom-4">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-6 bg-primary sm:w-7' : 'w-2 bg-white/55 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HeroCarousel;
export { DEFAULT_SLIDES };
