import { motion } from 'framer-motion';

const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
}) => {
  const alignment = align === 'left' ? 'text-left items-start' : 'text-center items-center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      className={`mb-8 flex flex-col gap-2 sm:mb-10 sm:gap-3 md:mb-12 ${alignment}`}
    >
      {eyebrow && (
        <span
          className={`text-[11px] font-bold uppercase tracking-[0.18em] sm:text-xs sm:tracking-[0.2em] ${
            light ? 'text-white/80' : 'text-primary'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`max-w-3xl text-2xl font-bold leading-tight sm:text-3xl md:text-4xl ${
          light ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`max-w-2xl text-sm sm:text-base md:text-lg ${light ? 'text-white/80' : 'text-muted'}`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-1 h-1 w-14 rounded-full ${light ? 'bg-white' : 'bg-primary'}`} />
    </motion.div>
  );
};

export default SectionHeading;
