import { motion } from 'framer-motion';
import { getImageSrc } from '../utils/constants';

const CountryCard = ({ country }) => (
  <motion.article
    initial={{ opacity: 0, scale: 0.96 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    whileHover={{ y: -8 }}
    transition={{ duration: 0.35 }}
    className="group relative h-56 overflow-hidden rounded-2xl shadow-[0_14px_40px_-18px_rgba(27,54,120,0.45)] sm:h-64"
  >
    <img
      src={
        getImageSrc(country.image) ||
        'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=1200&q=80'
      }
      alt={country.name}
      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
      loading="lazy"
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src =
          'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=1200&q=80';
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/40 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 p-5">
      <h3 className="text-xl font-bold text-white">{country.name}</h3>
      <p className="mt-1 translate-y-1 text-sm text-white/80 opacity-90 transition group-hover:translate-y-0">
        Immigration Pathways Available
      </p>
      <div className="mt-3 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-14" />
    </div>
  </motion.article>
);

export default CountryCard;
