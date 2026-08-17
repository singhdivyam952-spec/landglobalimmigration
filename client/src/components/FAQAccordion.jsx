import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const FAQAccordion = ({ items = [] }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mx-auto max-w-4xl space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <motion.article
            key={`${item.question}-${index}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
            >
              <span className="font-bold text-ink sm:text-lg">{item.question}</span>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
                  isOpen ? 'rotate-180 bg-primary text-white' : 'bg-secondary text-navy'
                }`}
              >
                <FaChevronDown className="text-xs" />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="border-t border-navy/10 px-5 py-5 text-sm leading-relaxed text-muted sm:px-6 sm:text-base">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.article>
        );
      })}
    </div>
  );
};

export default FAQAccordion;
