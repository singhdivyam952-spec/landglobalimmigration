import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
} from 'react-icons/fa';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';
import SectionHeading from '../components/SectionHeading';

const Contact = () => {
  const contact = useSelector((state) => state.site.content?.contact);

  return (
    <>
      <SEO
        title="Contact Us"
        description="Contact Land Global Immigration for a free consultation. Submit your enquiry and speak with our immigration experts."
        path="/contact"
      />

      <section className="page-hero">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold sm:text-4xl md:text-5xl"
          >
            Contact Us
          </motion.h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/75 sm:mt-4 sm:text-base">
            Share your goals with us and receive personalized immigration guidance from our experts.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom grid gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="lg:col-span-3">
            <SectionHeading
              align="left"
              eyebrow="Lead Form"
              title="Start Your Free Assessment"
              subtitle="Fill in the details below and our counselors will get back to you shortly."
            />
            <div className="rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-black/5 sm:rounded-3xl sm:p-6 md:p-8">
              <ContactForm />
            </div>
          </div>

          <div className="space-y-5 lg:col-span-2 lg:space-y-6">
            <div className="rounded-2xl bg-navy p-5 text-white shadow-xl sm:rounded-3xl sm:p-7">
              <h3 className="text-xl font-semibold">Office Information</h3>
              <ul className="mt-6 space-y-4 text-sm text-white/90">
                <li className="flex gap-3">
                  <FaMapMarkerAlt className="mt-1 shrink-0 text-primary" />
                  <span>
                    {contact?.address || 'SCO 376, First Floor, Sector 37D, Chandigarh, 160036'}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <FaPhoneAlt className="shrink-0 text-primary" />
                  <a href={`tel:${contact?.phone || '+919578700074'}`}>
                    {contact?.phone || '+91 95787 00074'}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <FaEnvelope className="shrink-0 text-primary" />
                  <a href={`mailto:${contact?.email || 'landglobal37@gmail.com'}`}>
                    {contact?.email || 'landglobal37@gmail.com'}
                  </a>
                </li>
              </ul>

              <a
                href={`https://wa.me/${(contact?.whatsapp || '919578700074').replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                <FaWhatsapp className="text-lg" /> Chat on WhatsApp
              </a>

              <div className="mt-6 flex gap-3">
                {[
                  {
                    href:
                      contact?.socialLinks?.facebook ||
                      'https://www.facebook.com/landglobalimmigration/',
                    Icon: FaFacebookF,
                  },
                  {
                    href:
                      contact?.socialLinks?.instagram ||
                      'https://www.instagram.com/landglobalimmigration',
                    Icon: FaInstagram,
                  },
                ].map(({ href, Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy transition hover:bg-primary hover:text-white"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl shadow-sm ring-1 ring-black/5">
              <iframe
                title="Office location map"
                src={
                  contact?.mapEmbedUrl ||
                  'https://www.google.com/maps?q=SCO+376,+Sector+37D,+Chandigarh,+160036&output=embed'
                }
                className="h-72 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
