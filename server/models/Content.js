import mongoose from 'mongoose';

const whyChooseUsSchema = new mongoose.Schema(
  {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    icon: { type: String, default: 'FaShieldAlt' },
  },
  { _id: false }
);

const statisticSchema = new mongoose.Schema(
  {
    label: { type: String, default: '' },
    value: { type: Number, default: 0 },
    suffix: { type: String, default: '+' },
  },
  { _id: false }
);

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' },
    role: { type: String, default: '' },
    image: { type: String, default: '' },
    bio: { type: String, default: '' },
  },
  { _id: true }
);

const valueSchema = new mongoose.Schema(
  {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  { _id: false }
);

const timelineSchema = new mongoose.Schema(
  {
    year: { type: String, default: '' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  { _id: false }
);

const contentSchema = new mongoose.Schema(
  {
    home: {
      heading: { type: String, default: '' },
      subHeading: { type: String, default: '' },
      heroImage: { type: String, default: '' },
      ctaText: { type: String, default: 'Book Free Consultation' },
      ctaLink: { type: String, default: '/contact' },
      introduction: {
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        image: { type: String, default: '' },
      },
      whyChooseUs: {
        title: { type: String, default: 'Why Choose Us' },
        subtitle: { type: String, default: '' },
        items: [whyChooseUsSchema],
      },
      statistics: [statisticSchema],
      contactCta: {
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        buttonText: { type: String, default: 'Contact Us' },
      },
    },
    about: {
      companyStory: {
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        image: { type: String, default: '' },
      },
      founder: {
        name: { type: String, default: '' },
        title: { type: String, default: '' },
        bio: { type: String, default: '' },
        image: { type: String, default: '' },
      },
      mission: {
        title: { type: String, default: 'Our Mission' },
        description: { type: String, default: '' },
      },
      vision: {
        title: { type: String, default: 'Our Vision' },
        description: { type: String, default: '' },
      },
      values: [valueSchema],
      team: [teamMemberSchema],
      timeline: [timelineSchema],
    },
    contact: {
      address: { type: String, default: '' },
      phone: { type: String, default: '' },
      email: { type: String, default: '' },
      whatsapp: { type: String, default: '' },
      mapEmbedUrl: { type: String, default: '' },
      socialLinks: {
        facebook: { type: String, default: '' },
        instagram: { type: String, default: '' },
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model('Content', contentSchema);
