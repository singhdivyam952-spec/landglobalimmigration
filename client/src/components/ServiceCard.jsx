import { motion } from 'framer-motion';
import { getImageSrc } from '../utils/constants';

const ServiceCard = ({ service }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -8 }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    className="group overflow-hidden rounded-2xl bg-white shadow-[0_12px_40px_-20px_rgba(27,54,120,0.35)] ring-1 ring-black/5"
  >
    <div className="relative h-44 overflow-hidden sm:h-48">
      <img
        src={
          getImageSrc(service.image) ||
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80'
        }
        alt={service.title}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/25 to-transparent opacity-80 transition group-hover:opacity-90" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <span className="inline-block rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
          Service
        </span>
      </div>
    </div>
    <div className="p-5 sm:p-6">
      <h3 className="text-lg font-bold text-ink transition group-hover:text-navy sm:text-xl">
        {service.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">{service.description}</p>
      <div className="mt-4 h-0.5 w-10 origin-left scale-x-100 bg-primary transition duration-300 group-hover:w-16" />
    </div>
  </motion.article>
);

export default ServiceCard;
