import {
  FaCertificate,
  FaUserCheck,
  FaHandshake,
  FaGlobeAmericas,
  FaTrophy,
  FaComments,
  FaShieldAlt,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const iconMap = {
  FaCertificate,
  FaUserCheck,
  FaHandshake,
  FaGlobeAmericas,
  FaTrophy,
  FaComments,
  FaShieldAlt,
};

const WhyChooseCard = ({ item, index }) => {
  const Icon = iconMap[item.icon] || FaShieldAlt;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group rounded-2xl bg-white p-6 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.28)] ring-1 ring-black/5 transition hover:shadow-[0_18px_40px_-18px_rgba(27,54,120,0.35)] sm:p-7"
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-2xl text-navy transition duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-105">
        <Icon />
      </div>
      <h3 className="text-lg font-bold text-ink">{item.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
    </motion.article>
  );
};

export default WhyChooseCard;
