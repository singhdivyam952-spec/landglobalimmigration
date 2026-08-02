import { AnimatePresence, motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ open, onClose, title, children, wide = false }) => (
  <AnimatePresence>
    {open && (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          className={`relative max-h-[90vh] w-full overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl ${
            wide ? 'max-w-3xl' : 'max-w-lg'
          }`}
        >
          <div className="mb-5 flex items-center justify-between gap-4">
            <h3 className="text-xl font-semibold text-ink">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-muted hover:bg-surface"
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
          </div>
          {children}
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export default Modal;
