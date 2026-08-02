import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    countryInterested: {
      type: String,
      required: [true, 'Country interested is required'],
      trim: true,
    },
    visaType: {
      type: String,
      required: [true, 'Visa type is required'],
      trim: true,
    },
    message: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Lead', leadSchema);
