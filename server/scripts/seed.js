import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Admin from '../models/Admin.js';
import Content from '../models/Content.js';
import Service from '../models/Service.js';
import Country from '../models/Country.js';
import Testimonial from '../models/Testimonial.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    console.log('Clearing existing data...');
    await Promise.all([
      Admin.deleteMany(),
      Content.deleteMany(),
      Service.deleteMany(),
      Country.deleteMany(),
      Testimonial.deleteMany(),
    ]);

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@landglobalimmigration.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@12345';

    await Admin.create({ email: adminEmail, password: adminPassword });
    console.log(`Admin created: ${adminEmail}`);

    await Content.create({
      home: {
        heading: 'Your Trusted Partner for Global Immigration Success',
        subHeading:
          'Expert guidance for visas, permanent residency, and relocation pathways across leading destinations worldwide.',
        heroImage:
          'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80',
        ctaText: 'Book Free Consultation',
        ctaLink: '/contact',
        introduction: {
          title: 'About Land Global Immigration',
          description:
            'Land Global Immigration is a premium consultancy dedicated to helping individuals and families achieve their international aspirations. With deep expertise across study, work, business, and permanent residency pathways, we deliver personalized strategies backed by transparent processes and proven results.',
          image:
            'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
        },
        whyChooseUs: {
          title: 'Why Choose Land Global',
          subtitle: 'We combine expertise, integrity, and personalized care at every step of your journey.',
          items: [
            {
              title: 'Licensed Experts',
              description: 'Work with seasoned immigration professionals who understand complex visa frameworks.',
              icon: 'FaCertificate',
            },
            {
              title: 'Personalized Strategy',
              description: 'Every profile is assessed carefully to recommend the strongest pathway for success.',
              icon: 'FaUserCheck',
            },
            {
              title: 'Transparent Process',
              description: 'Clear timelines, honest guidance, and full visibility into your application progress.',
              icon: 'FaHandshake',
            },
            {
              title: 'End-to-End Support',
              description: 'From documentation to interview preparation, we stay with you until the outcome.',
              icon: 'FaGlobeAmericas',
            },
            {
              title: 'High Success Rate',
              description: 'A track record of successful outcomes across major immigration destinations.',
              icon: 'FaTrophy',
            },
            {
              title: 'Dedicated Counselors',
              description: 'A single point of contact ensures consistent communication and faster resolutions.',
              icon: 'FaComments',
            },
          ],
        },
        statistics: [
          { label: 'Successful Clients', value: 5000, suffix: '+' },
          { label: 'Countries Covered', value: 12, suffix: '+' },
          { label: 'Years of Experience', value: 15, suffix: '+' },
          { label: 'Visa Categories', value: 40, suffix: '+' },
        ],
        contactCta: {
          title: 'Ready to Begin Your Immigration Journey?',
          description: 'Speak with our consultants today and receive a clear roadmap tailored to your goals.',
          buttonText: 'Get Free Assessment',
        },
      },
      about: {
        companyStory: {
          title: 'Our Story',
          description:
            'Founded with a vision to make international migration accessible and reliable, Land Global Immigration has grown into a trusted consultancy serving clients across continents. We believe every successful immigration journey starts with the right advice, careful planning, and unwavering commitment.',
          image:
            'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        },
        founder: {
          name: 'Divyam Sharma',
          title: 'Founder & Principal Consultant',
          bio: 'With over a decade of experience in global mobility and immigration strategy, Divyam founded Land Global Immigration to deliver ethical, results-driven consultancy. His leadership is rooted in client-first values and continuous regulatory expertise.',
          image:
            'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
        },
        mission: {
          title: 'Our Mission',
          description:
            'To empower individuals and families with accurate immigration guidance, ethical representation, and personalized pathways that turn global aspirations into lasting outcomes.',
        },
        vision: {
          title: 'Our Vision',
          description:
            'To be the most trusted international immigration consultancy recognized for integrity, excellence, and transformative client success across the world.',
        },
        values: [
          {
            title: 'Integrity',
            description: 'We prioritize honesty and compliance in every recommendation we make.',
          },
          {
            title: 'Excellence',
            description: 'We pursue the highest standards in documentation, strategy, and service delivery.',
          },
          {
            title: 'Client Focus',
            description: 'Your goals guide our process — we listen carefully and act decisively.',
          },
          {
            title: 'Accountability',
            description: 'We take ownership of outcomes and communicate clearly at every milestone.',
          },
        ],
        team: [
          {
            name: 'Aisha Khan',
            role: 'Senior Visa Counselor',
            bio: 'Specializes in skilled migration and permanent residency pathways.',
            image:
              'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
          },
          {
            name: 'Rohit Mehta',
            role: 'Study Abroad Advisor',
            bio: 'Guides students through admissions, visas, and destination planning.',
            image:
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
          },
          {
            name: 'Sophia Fernandes',
            role: 'Business Immigration Lead',
            bio: 'Helps entrepreneurs and investors navigate business visa programs.',
            image:
              'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
          },
        ],
        timeline: [
          {
            year: '2010',
            title: 'Foundation',
            description: 'Land Global Immigration was established with a focus on ethical visa consultancy.',
          },
          {
            year: '2015',
            title: 'Expanded Destinations',
            description: 'Added multi-country expertise covering Canada, Australia, UK, and Europe.',
          },
          {
            year: '2019',
            title: 'Corporate Growth',
            description: 'Opened dedicated desks for business immigration and family sponsorship.',
          },
          {
            year: '2024',
            title: 'Digital Transformation',
            description: 'Launched modern client systems for faster assessments and transparent tracking.',
          },
        ],
      },
      contact: {
        address: 'SCO 376, First Floor, Sector 37D, Chandigarh, 160036',
        phone: '+91 95787 00074',
        email: 'landglobal37@gmail.com',
        whatsapp: '919578700074',
        mapEmbedUrl:
          'https://www.google.com/maps?q=SCO+376,+Sector+37D,+Chandigarh,+160036&output=embed',
        socialLinks: {
          facebook: 'https://www.facebook.com/landglobalimmigration/',
          instagram: 'https://www.instagram.com/landglobalimmigration',
        },
      },
    });
    console.log('Content seeded');

    await Service.insertMany([
      {
        title: 'Permanent Residency',
        description:
          'Strategic guidance for PR pathways including express entry, points-based systems, and provincial nominations.',
        image:
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
        status: 'active',
      },
      {
        title: 'Study Visa Assistance',
        description:
          'End-to-end support for university selection, admission documentation, and student visa applications.',
        image:
          'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
        status: 'active',
      },
      {
        title: 'Work & Skilled Migration',
        description:
          'Career-focused immigration planning for skilled professionals seeking employment-based visas.',
        image:
          'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
        status: 'active',
      },
      {
        title: 'Family Sponsorship',
        description:
          'Reunite with loved ones through carefully prepared sponsorship and dependent visa applications.',
        image:
          'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
        status: 'active',
      },
      {
        title: 'Business & Investor Visas',
        description:
          'Advisory for entrepreneurs and investors exploring business immigration and startup pathways.',
        image:
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        status: 'active',
      },
      {
        title: 'Visitor & Tourist Visas',
        description:
          'Efficient preparation for visitor visas, temporary stays, and short-term travel documentation.',
        image:
          'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=800&q=80',
        status: 'active',
      },
    ]);
    console.log('Services seeded');

    await Country.insertMany([
      {
        name: 'Canada',
        image:
          'https://images.unsplash.com/photo-1519832979-6fa011b87667?auto=format&fit=crop&w=800&q=80',
        status: 'active',
      },
      {
        name: 'Australia',
        image:
          'https://images.unsplash.com/photo-1523482580671-b37b7aa8786d?auto=format&fit=crop&w=800&q=80',
        status: 'active',
      },
      {
        name: 'United Kingdom',
        image:
          'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
        status: 'active',
      },
      {
        name: 'United States',
        image:
          'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=800&q=80',
        status: 'active',
      },
      {
        name: 'New Zealand',
        image:
          'https://images.unsplash.com/photo-1469521669194-babb389a3325?auto=format&fit=crop&w=800&q=80',
        status: 'active',
      },
      {
        name: 'Germany',
        image:
          'https://images.unsplash.com/photo-1467260202944-bd555884cca4?auto=format&fit=crop&w=800&q=80',
        status: 'active',
      },
    ]);
    console.log('Countries seeded');

    await Testimonial.insertMany([
      {
        name: 'Priya Nair',
        designation: 'Software Engineer · Canada PR',
        review:
          'Land Global Immigration made my PR journey seamless. Their counselors were proactive, detail-oriented, and always available when I needed clarity.',
        rating: 5,
        image:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
        status: 'active',
      },
      {
        name: 'James Okonkwo',
        designation: 'MBA Student · United Kingdom',
        review:
          'From university shortlisting to visa approval, the team provided outstanding support. I felt confident throughout the entire process.',
        rating: 5,
        image:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        status: 'active',
      },
      {
        name: 'Maria Santos',
        designation: 'Entrepreneur · Australia',
        review:
          'Their business immigration expertise is exceptional. They crafted a strategy that matched my investment goals and timeline perfectly.',
        rating: 5,
        image:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
        status: 'active',
      },
      {
        name: 'Arjun Patel',
        designation: 'Healthcare Professional · New Zealand',
        review:
          'Professional, transparent, and highly knowledgeable. I recommend Land Global Immigration to anyone serious about relocating abroad.',
        rating: 5,
        image:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        status: 'active',
      },
    ]);
    console.log('Testimonials seeded');

    console.log('\nSeed completed successfully!');
    console.log(`Login with: ${adminEmail} / ${adminPassword}`);
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

seedData();
