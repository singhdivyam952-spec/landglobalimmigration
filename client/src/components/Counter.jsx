import { useEffect, useRef, useState } from 'react';
import { useInView, motion } from 'framer-motion';

const Counter = ({ value = 0, suffix = '+', label, light = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return undefined;
    let start = 0;
    const duration = 1600;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * value);
      setCount(start);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    return undefined;
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className={`text-4xl font-bold md:text-5xl ${light ? 'text-white' : 'text-primary'}`}>
        {count}
        {suffix}
      </div>
      <p className={`mt-2 text-sm font-medium md:text-base ${light ? 'text-white/80' : 'text-muted'}`}>
        {label}
      </p>
    </motion.div>
  );
};

export default Counter;
