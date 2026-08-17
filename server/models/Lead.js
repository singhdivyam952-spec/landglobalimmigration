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
      default: '',
      trim: true,
      validate: {
        validator(value) {
          if (!value) return true;
          const digits = String(value).replace(/\D/g, '');
          return digits.length >= 10 && digits.length <= 15;
        },
        message: 'Phone number must contain 10–15 digits',
      },
    },
    email: {
      type: String,
      default: '',
      lowercase: true,
      trim: true,
      validate: {
        validator(value) {
          if (!value) return true;
          return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
        },
        message: 'Please provide a valid email address',
      },
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

leadSchema.pre('validate', function ensureContactMethod(next) {
  if (!this.phone && !this.email) {
    this.invalidate('email', 'Either a phone number or an email address is required');
  }
  next();
});

export default mongoose.model('Lead', leadSchema);
