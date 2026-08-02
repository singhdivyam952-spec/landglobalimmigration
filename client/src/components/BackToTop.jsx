import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-[4.5rem] right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm text-white shadow-lg transition hover:bg-navy-dark sm:bottom-24 sm:right-5 sm:h-12 sm:w-12 sm:text-base md:right-8"
    >
      <FaArrowUp />
    </button>
  );
};

export default BackToTop;
