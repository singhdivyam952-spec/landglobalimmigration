import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import BrandLogo from './BrandLogo';

const Footer = () => {
  const contact = useSelector((state) => state.site.content?.contact);

  return (
    <footer className="bg-navy-dark text-white">
      <div className="container-custom grid gap-8 py-10 sm:gap-10 sm:py-12 md:grid-cols-2 md:py-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <BrandLogo className="h-14 w-14" inverted />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
            Premium immigration consultancy helping clients navigate visas, residency, and global
            relocation with confidence and clarity.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              {
                icon: FaFacebookF,
                href:
                  contact?.socialLinks?.facebook ||
                  'https://www.facebook.com/landglobalimmigration/',
              },
              {
                icon: FaInstagram,
                href:
                  contact?.socialLinks?.instagram ||
                  'https://www.instagram.com/landglobalimmigration',
              },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-primary hover:bg-primary"
              >
                <Icon className="text-sm" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="mb-5 text-sm font-bold uppercase tracking-[0.14em] text-primary">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm text-white/75">
            {[
              ['/', 'Home'],
              ['/about', 'About Us'],
              ['/services', 'Services'],
              ['/contact', 'Contact Us'],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="transition hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="mb-5 text-sm font-bold uppercase tracking-[0.14em] text-primary">
            Services
          </h4>
          <ul className="space-y-3 text-sm text-white/75">
            <li>Permanent Residency</li>
            <li>Study Visa Assistance</li>
            <li>Work & Skilled Migration</li>
            <li>Family Sponsorship</li>
            <li>Business & Investor Visas</li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="mb-5 text-sm font-bold uppercase tracking-[0.14em] text-primary">
            Contact Us
          </h4>
          <ul className="space-y-4 text-sm text-white/75">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-primary">
                <FaMapMarkerAlt className="text-xs" />
              </span>
              <span className="pt-1.5">
                {contact?.address || 'SCO 376, First Floor, Sector 37D, Chandigarh, 160036'}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-primary">
                <FaPhoneAlt className="text-xs" />
              </span>
              <a href={`tel:${contact?.phone || '+919578700074'}`} className="hover:text-white">
                {contact?.phone || '+91 95787 00074'}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-primary">
                <FaEnvelope className="text-xs" />
              </span>
              <a
                href={`mailto:${contact?.email || 'landglobal37@gmail.com'}`}
                className="break-all hover:text-white"
              >
                {contact?.email || 'landglobal37@gmail.com'}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-custom flex flex-col items-center justify-between gap-3 py-6 text-sm text-white/50 md:flex-row">
          <p>© {new Date().getFullYear()} Land Global Immigration. All rights reserved.</p>
          <p>Professional Immigration Consultancy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
