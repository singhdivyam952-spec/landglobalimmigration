import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import Loader from '../components/Loader';
import { getImageSrc } from '../utils/constants';

const About = () => {
  const { content, loading } = useSelector((state) => state.site);
  const about = content?.about;

  if (loading && !about) return <Loader />;

  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Land Global Immigration — our story, founder, mission, vision, values, and expert team."
        path="/about"
      />

      <section className="page-hero">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold sm:text-4xl md:text-5xl"
          >
            About Land Global Immigration
          </motion.h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/75 sm:mt-4 sm:text-base">
            Building trust through expertise, integrity, and personalized immigration guidance.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-2">
          <img
            src={
              getImageSrc(about?.companyStory?.image) ||
              'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
            }
            alt="Company story"
            className="h-[380px] w-full rounded-3xl object-cover shadow-xl"
          />
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our Journey"
              title={about?.companyStory?.title || 'Our Story'}
              subtitle={about?.companyStory?.description}
            />
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section-padding bg-surface">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <SectionHeading
              align="left"
              eyebrow="Leadership"
              title={about?.founder?.name || 'Founder'}
              subtitle={about?.founder?.bio}
            />
            <p className="font-semibold text-primary">{about?.founder?.title}</p>
          </div>
          <img
            src={
              getImageSrc(about?.founder?.image) ||
              'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80'
            }
            alt={about?.founder?.name || 'Founder'}
            className="order-1 h-[420px] w-full rounded-3xl object-cover shadow-xl lg:order-2"
          />
        </div>
      </section>

      {/* Mission Vision */}
      <section className="section-padding bg-white">
        <div className="container-custom grid gap-6 md:grid-cols-2">
          {[about?.mission, about?.vision].map((item, i) => (
            <motion.div
              key={item?.title || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl bg-surface p-8 shadow-sm ring-1 ring-black/5 md:p-10"
            >
              <h3 className="text-2xl font-bold text-navy">{item?.title}</h3>
              <p className="mt-4 leading-relaxed text-muted">{item?.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <SectionHeading
            eyebrow="What Guides Us"
            title="Company Values"
            subtitle="Principles that shape every consultation and every client relationship."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(about?.values || []).map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-secondary font-bold text-navy">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm text-muted">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Milestones"
            title="Our Timeline"
            subtitle="Key moments that shaped Land Global Immigration."
          />
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-secondary md:left-1/2" />
            {(about?.timeline || []).map((item, index) => (
              <motion.div
                key={`${item.year}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative mb-10 pl-12 md:w-1/2 md:pl-0 ${
                  index % 2 === 0 ? 'md:pr-10 md:text-right' : 'md:ml-auto md:pl-10'
                }`}
              >
                <div
                  className={`absolute left-2.5 top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-primary shadow md:left-1/2 md:-ml-1.5 ${
                    index % 2 === 0 ? '' : ''
                  }`}
                />
                <span className="text-sm font-bold text-accent">{item.year}</span>
                <h3 className="mt-1 text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Our People"
            title="Meet the Team"
            subtitle="Experienced counselors dedicated to your immigration success."
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {(about?.team || []).map((member) => (
              <motion.article
                key={member._id || member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5"
              >
                <img
                  src={
                    getImageSrc(member.image) ||
                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
                  }
                  alt={member.name}
                  className="h-64 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium text-primary">{member.role}</p>
                  <p className="mt-3 text-sm text-muted">{member.bio}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
