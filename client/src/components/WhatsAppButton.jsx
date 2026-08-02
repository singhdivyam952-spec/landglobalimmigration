import { useState, useEffect } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const WhatsAppButton = () => {
  const [showTip, setShowTip] = useState(false);
  const whatsapp = useSelector((state) => state.site.content?.contact?.whatsapp) || '919578700074';
  const href = `https://wa.me/${whatsapp.replace(/\D/g, '')}`;

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (!isDesktop) return undefined;
    const timer = setTimeout(() => setShowTip(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 sm:bottom-5 sm:right-5 md:right-8">
      {showTip && (
        <div className="relative hidden max-w-[200px] rounded-2xl bg-white px-3 py-2.5 text-xs font-medium text-ink shadow-xl ring-1 ring-black/5 sm:block sm:max-w-[220px] sm:px-4 sm:py-3 sm:text-sm">
          <button
            type="button"
            aria-label="Close chat tip"
            onClick={() => setShowTip(false)}
            className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-navy text-[10px] text-white"
          >
            <FaTimes />
          </button>
          Chat with us! How may I help you today?
        </div>
      )}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl text-white shadow-lg transition hover:scale-105 hover:bg-primary-dark sm:h-14 sm:w-14 sm:text-2xl"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
};

export default WhatsAppButton;
