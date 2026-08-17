import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FaBars,
  FaTimes,
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaStar,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import Button from './Button';
import BrandLogo from './BrandLogo';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact Us' },
];

const TestimonialStrip = ({ testimonials }) => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const items = testimonials?.length
    ? testimonials
    : [{ review: 'Professional and reliable immigration guidance', name: 'Indian Client', designation: 'Verified' }];

  useEffect(() => {
    if (items.length <= 1) return undefined;
    const timer = setInterval(() => setIndex((i) => (i + 1) % items.length), 4500);
    return () => clearInterval(timer);
  }, [items.length]);

  if (!visible) return null;

  const item = items[index % items.length];

  return (
    <div className="relative bg-bar text-white">
      <div className="container-custom flex items-center justify-center gap-2 py-2 pr-8 text-center text-xs sm:gap-3 sm:py-2.5 sm:text-sm">
        <p className="line-clamp-1 italic text-white/90">"{item.review}"</p>
        <span className="hidden items-center gap-1 text-amber-400 md:inline-flex">
          {Array.from({ length: item.rating || 5 }).map((_, i) => (
            <FaStar key={i} className="text-[11px]" />
          ))}
        </span>
        <span className="hidden text-white/70 lg:inline">
          — {item.name}
          {item.designation ? `, ${item.designation}` : ''}
        </span>
        <button
          type="button"
          aria-label="Dismiss testimonial"
          onClick={() => setVisible(false)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white sm:right-5"
        >
          <FaTimes size={12} />
        </button>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const contact = useSelector((state) => state.site.content?.contact);
  const testimonials = useSelector((state) => state.site.testimonials);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const socials = [
    {
      icon: FaFacebookF,
      href: contact?.socialLinks?.facebook || 'https://www.facebook.com/landglobalimmigration/',
    },
    {
      icon: FaInstagram,
      href: contact?.socialLinks?.instagram || 'https://www.instagram.com/landglobalimmigration',
    },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Mobile top contact strip */}
      <div className="bg-bar text-white md:hidden">
        <div className="container-custom flex items-center justify-between gap-2 py-1.5 text-[11px]">
          <a href={`tel:${contact?.phone || '+919578700074'}`} className="inline-flex items-center gap-1.5">
            <FaPhoneAlt className="text-primary" />
            <span className="truncate">{contact?.phone || '+91 95787 00074'}</span>
          </a>
          <span className="inline-flex max-w-[45%] items-center gap-1 truncate text-white/80">
            <FaMapMarkerAlt className="shrink-0 text-primary" />
            <span className="truncate">
              {contact?.address || 'SCO 376, First Floor, Sector 37D, Chandigarh'}
            </span>
          </span>
        </div>
      </div>

      {/* Desktop top utility bar */}
      <div className="hidden bg-bar text-white md:block">
        <div className="container-custom flex items-center justify-between py-2 text-sm">
          <div className="flex items-center gap-2">
            {socials.map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[11px] text-ink transition hover:bg-primary hover:text-white"
              >
                <Icon />
              </a>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-end gap-x-5 gap-y-1 text-white/90">
            <a href={`tel:${contact?.phone || '+919578700074'}`} className="inline-flex items-center gap-2 hover:text-primary">
              <FaPhoneAlt className="text-primary" />
              {contact?.phone || '+91 95787 00074'}
            </a>
            <span className="inline-flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary" />
              {contact?.address || 'SCO 376, First Floor, Sector 37D, Chandigarh'}
            </span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className={`border-b border-black/5 bg-white transition-shadow ${scrolled ? 'shadow-md' : ''}`}>
        <div className="container-custom flex items-center justify-between gap-3 py-2.5 sm:py-3">
          <Link to="/" onClick={() => setOpen(false)} aria-label="Land Global Immigration Home" className="min-w-0">
            <BrandLogo className="h-10 w-10 sm:h-12 sm:w-12 md:h-[52px] md:w-[52px]" />
          </Link>

          <nav className="hidden items-center gap-5 xl:gap-7 lg:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-[12px] font-semibold uppercase tracking-[0.08em] transition xl:text-[13px] ${
                    isActive ? 'text-primary' : 'text-ink hover:text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Button to="/contact" className="!px-5 !py-2.5 !text-xs">
              Get Started
            </Button>
          </nav>

          <button
            type="button"
            className="rounded-lg p-2 text-ink lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-black/5 bg-white lg:hidden"
            >
              <nav className="container-custom flex flex-col gap-1 py-3">
                {links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-3 text-sm font-semibold uppercase tracking-wide ${
                        isActive ? 'bg-accent-soft text-primary' : 'text-ink'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <div className="px-1 pb-2 pt-2">
                  <Button to="/contact" onClick={() => setOpen(false)} className="w-full">
                    Get Started
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <TestimonialStrip testimonials={testimonials} />
    </header>
  );
};

export default Navbar;
