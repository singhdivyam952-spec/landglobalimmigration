import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaArrowRight,
  FaClipboardList,
  FaUserTie,
  FaFileAlt,
  FaPlaneDeparture,
  FaQuoteLeft,
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import SEO from '../components/SEO';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import WhyChooseCard from '../components/WhyChooseCard';
import Counter from '../components/Counter';
import TestimonialSlider from '../components/TestimonialSlider';
import ContactForm from '../components/ContactForm';
import HeroCarousel, { DEFAULT_SLIDES } from '../components/HeroCarousel';
import ServiceCard from '../components/ServiceCard';
import CountryCard from '../components/CountryCard';
import FadeIn from '../components/FadeIn';
import Loader from '../components/Loader';
import { getImageSrc } from '../utils/constants';

const PROCESS_STEPS = [
  {
    icon: FaClipboardList,
    title: 'Free Assessment',
    description: 'Share your goals and background so we can map the strongest immigration options for you.',
  },
  {
    icon: FaUserTie,
    title: 'Expert Consultation',
    description: 'Meet our consultants for a clear pathway plan tailored to your destination and timeline.',
  },
  {
    icon: FaFileAlt,
    title: 'Documentation Support',
    description: 'We guide paperwork, eligibility checks, and application preparation with precision.',
  },
  {
    icon: FaPlaneDeparture,
    title: 'Application & Beyond',
    description: 'From filing to follow-ups, we stay with you until your next chapter begins abroad.',
  },
];

const PATHWAYS = [
  'Study Visa',
  'Work Permit',
  'Permanent Residency',
  'Tourist Visa',
  'Family Sponsorship',
  'Business Immigration',
];

const Home = () => {
  const { content, testimonials, services, countries, loading } = useSelector((state) => state.site);
  const home = content?.home;

  if (loading && !home) return <Loader />;

  const customHero = getImageSrc(home?.heroImage);
  const heroSlides = customHero
    ? [
        { src: customHero, alt: 'Land Global Immigration hero' },
        ...DEFAULT_SLIDES.filter((slide) => slide.src !== customHero).slice(0, 4),
      ]
    : DEFAULT_SLIDES;

  const featuredServices = (services || []).filter((s) => s.isActive !== false).slice(0, 6);
  const featuredCountries = (countries || []).filter((c) => c.isActive !== false).slice(0, 4);

  return (
    <>
      <SEO
        title="Land Global Immigration | Premium Immigration Consultancy"
        description="Expert immigration consultancy for visas, permanent residency, study abroad, and global relocation pathways."
        path="/"
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <HeroCarousel slides={heroSlides} />

        <div className="container-custom relative z-10 grid items-center gap-5 py-8 sm:gap-6 sm:py-10 md:py-12 lg:grid-cols-2 lg:gap-8 lg:py-14">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center text-white lg:text-left"
          >
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.45 }}
              className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs md:text-sm"
            >
              Land Global Immigration
            </motion.p>
            <h1 className="mx-auto max-w-xl text-[1.7rem] font-bold leading-tight sm:text-3xl md:text-4xl lg:mx-0 lg:text-[2.6rem]">
              {home?.heading || 'Your Trusted Partner for Global Immigration Success'}
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/85 sm:text-base lg:mx-0">
              {home?.subHeading ||
                'Expert guidance for visas, permanent residency, and relocation pathways across leading destinations worldwide.'}
            </p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.45 }}
              className="mt-5 flex flex-wrap justify-center gap-3 lg:justify-start"
            >
              <Button to={home?.ctaLink || '/contact'} className="!px-5 !py-2.5 !text-xs">
                {home?.ctaText || 'Get Started'} <FaArrowRight />
              </Button>
              <Button to="/services" variant="outline" className="!px-5 !py-2.5 !text-xs">
                Explore Services
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-md rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-black/5 sm:p-5 lg:mx-0 lg:max-w-none"
          >
            <h2 className="text-base font-bold text-ink sm:text-lg md:text-xl">
              Your Immigration Process Starts Here!
            </h2>
            <p className="mt-1 text-xs text-muted sm:text-sm">
              Share a few details and our consultants will guide you forward.
            </p>
            <div className="mt-3">
              <ContactForm compact />
            </div>
          </motion.div>
        </div>

        <div className="wave-bottom z-10 text-white">
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="h-[28px] w-full sm:h-[36px] md:h-[48px]">
            <path
              fill="currentColor"
              d="M0,64 C240,110 480,10 720,40 C960,70 1200,110 1440,40 L1440,90 L0,90 Z"
            />
          </svg>
        </div>
      </section>

      {/* Pathway marquee strip */}
      <section className="overflow-hidden border-b border-black/5 bg-surface py-3.5">
        <div className="pathway-marquee flex w-max gap-8 whitespace-nowrap">
          {[...PATHWAYS, ...PATHWAYS].map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="inline-flex items-center gap-8 text-xs font-bold uppercase tracking-[0.16em] text-navy"
            >
              {label}
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
          ))}
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container-custom grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <FadeIn>
            <SectionHeading
              align="left"
              eyebrow="Who We Are"
              title={home?.introduction?.title || 'About Land Global Immigration'}
              subtitle={home?.introduction?.description}
            />
            <Button to="/about">
              See More <FaArrowRight />
            </Button>
          </FadeIn>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <FadeIn delay={0.08}>
              <img
                src={
                  getImageSrc(home?.introduction?.image) ||
                  'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80'
                }
                alt="Consultation"
                className="h-40 w-full rounded-2xl object-cover shadow-lg sm:h-56 md:h-72"
              />
            </FadeIn>
            <FadeIn delay={0.16}>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Team collaboration"
                className="mt-4 h-40 w-full rounded-2xl object-cover shadow-lg sm:mt-8 sm:h-56 md:h-72"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      {featuredServices.length > 0 && (
        <section className="section-padding relative overflow-hidden bg-surface">
          <div className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-navy/5 blur-3xl" />
          <div className="container-custom relative">
            <SectionHeading
              eyebrow="What We Offer"
              title="Immigration Services Built Around Your Goals"
              subtitle="From study and work pathways to permanent residency — practical guidance at every step."
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {featuredServices.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
            <FadeIn className="mt-10 text-center" delay={0.1}>
              <Button to="/services" variant="navy">
                View All Services <FaArrowRight />
              </Button>
            </FadeIn>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Simple Process"
            title="How We Guide Your Journey"
            subtitle="A clear, consultant-led process designed to keep your application moving with confidence."
          />
          <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="pointer-events-none absolute left-[12%] right-[12%] top-10 hidden h-px bg-gradient-to-r from-transparent via-navy/20 to-transparent lg:block" />
            {PROCESS_STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <FadeIn key={step.title} delay={index * 0.08}>
                  <article className="relative rounded-2xl bg-surface p-6 text-center ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-[0_16px_40px_-24px_rgba(27,54,120,0.45)] sm:p-7">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-navy text-xl text-white shadow-lg shadow-navy/25">
                      <Icon />
                    </div>
                    <span className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                      Step {index + 1}
                    </span>
                    <h3 className="text-lg font-bold text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                  </article>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Our Advantage"
            title={home?.whyChooseUs?.title || 'Why Choose Us'}
            subtitle={home?.whyChooseUs?.subtitle}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {(home?.whyChooseUs?.items || []).map((item, index) => (
              <WhyChooseCard key={`${item.title}-${index}`} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Countries */}
      {featuredCountries.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <SectionHeading
              eyebrow="Destinations"
              title="Countries We Help You Reach"
              subtitle="Explore immigration pathways across trusted destinations with experienced local insight."
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featuredCountries.map((country) => (
                <CountryCard key={country._id} country={country} />
              ))}
            </div>
            <FadeIn className="mt-10 text-center" delay={0.1}>
              <Button to="/services">
                Explore Destinations <FaArrowRight />
              </Button>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Statistics */}
      <section className="relative overflow-hidden bg-navy py-16 text-white md:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -left-10 top-0 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        </div>
        <div className="container-custom relative grid grid-cols-2 gap-10 md:grid-cols-4">
          {(home?.statistics || []).map((stat) => (
            <Counter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              light
            />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute left-6 top-16 text-7xl text-primary/10 sm:left-10 sm:text-8xl">
          <FaQuoteLeft />
        </div>
        <div className="container-custom relative">
          <SectionHeading
            eyebrow="Success Stories"
            title="Our Happy Clients Are On Their Way"
            subtitle="Real experiences from people who trusted us with their immigration journey."
          />
          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section>

      {/* Promise band */}
      <section className="border-y border-black/5 bg-surface py-12 md:py-14">
        <div className="container-custom grid gap-8 md:grid-cols-3 md:gap-6">
          {[
            {
              title: 'Transparent Guidance',
              text: 'Clear eligibility advice and honest timelines — no guesswork, no pressure.',
            },
            {
              title: 'End-to-End Support',
              text: 'From first consultation to application follow-up, we stay accountable with you.',
            },
            {
              title: 'Global Perspective',
              text: 'Pathways across study, work, family, and residency with destination-aware planning.',
            },
          ].map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.08} className="text-center md:text-left">
              <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-primary md:mx-0" />
              <h3 className="text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative overflow-hidden bg-navy">
        <motion.div
          aria-hidden
          animate={{ opacity: [0.12, 0.22, 0.12], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary blur-3xl"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(227,30,36,0.18),transparent_50%)]" />
        <div className="container-custom relative py-16 text-center md:py-20">
          <FadeIn>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Free Consultation
            </p>
            <h2 className="mx-auto max-w-3xl text-3xl font-bold text-white md:text-4xl">
              {home?.contactCta?.title || 'Ready to Begin Your Immigration Journey?'}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/80 md:text-lg">
              {home?.contactCta?.description ||
                'Speak with our consultants today and receive a clear roadmap tailored to your goals.'}
            </p>
            <div className="mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition hover:bg-primary-dark hover:shadow-xl"
              >
                {home?.contactCta?.buttonText || 'Get Free Assessment'} <FaArrowRight />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
};

export default Home;
