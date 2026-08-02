import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import ServiceCarousel from '../components/ServiceCarousel';
import CountryCard from '../components/CountryCard';
import Loader from '../components/Loader';
import Button from '../components/Button';

const Services = () => {
  const { services, countries, loading } = useSelector((state) => state.site);

  if (loading && !services.length) return <Loader />;

  return (
    <>
      <SEO
        title="Services"
        description="Explore immigration services and destination countries supported by Land Global Immigration."
        path="/services"
      />

      <section className="page-hero">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold sm:text-4xl md:text-5xl"
          >
            Our Immigration Services
          </motion.h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/75 sm:mt-4 sm:text-base">
            Comprehensive pathways for study, work, business, family reunification, and permanent
            residency.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            eyebrow="What We Offer"
            title="Professional Services"
            subtitle="Tailored immigration solutions designed around your profile and destination goals."
          />
          <ServiceCarousel services={services} />
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Global Reach"
            title="Countries We Serve"
            subtitle="Expert guidance across leading immigration destinations worldwide."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {countries.map((country) => (
              <CountryCard key={country._id} country={country} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button to="/contact">Discuss Your Destination</Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
