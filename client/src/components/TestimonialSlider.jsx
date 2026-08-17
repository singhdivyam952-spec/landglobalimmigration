import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
import { getImageSrc } from '../utils/constants';

const TestimonialSlider = ({ testimonials = [] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length <= 1) return undefined;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (!testimonials.length) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center text-muted shadow-sm ring-1 ring-black/5">
        Indian client stories will appear here soon.
      </div>
    );
  }

  const item = testimonials[index];

  const go = (dir) => {
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative mx-auto max-w-4xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={item._id || index}
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl bg-gradient-to-br from-white to-secondary/40 p-8 shadow-[0_20px_50px_-24px_rgba(27,54,120,0.4)] ring-1 ring-navy/10 md:p-12"
        >
          <div className="mb-5 flex gap-1 text-amber-400">
            {Array.from({ length: item.rating || 5 }).map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
          <p className="text-lg leading-relaxed text-ink md:text-xl">"{item.review}"</p>
          <div className="mt-8 flex items-center gap-4">
            <img
              src={
                getImageSrc(item.image) ||
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
              }
              alt={item.name}
              className="h-14 w-14 rounded-full object-cover ring-2 ring-primary/40"
            />
            <div>
              <h4 className="font-semibold text-ink">{item.name}</h4>
              <p className="text-sm text-muted">{item.designation}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => go(-1)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-white transition hover:bg-primary"
        >
          <FaChevronLeft />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? 'w-8 bg-primary' : 'w-2.5 bg-navy/20'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => go(1)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-white transition hover:bg-primary"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
