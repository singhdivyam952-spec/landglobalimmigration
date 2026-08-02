import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { leadService } from '../services';
import Button from './Button';

const schema = yup.object({
  name: yup.string().trim().required('Full name is required'),
  phone: yup
    .string()
    .trim()
    .required('Mobile number is required')
    .matches(/^[+\d][\d\s\-()]{6,19}$/, 'Enter a valid phone number'),
  email: yup.string().trim().email('Enter a valid email').required('Email is required'),
  countryInterested: yup.string().trim().required('Please select a country'),
  visaType: yup.string().trim().required('Please select a visa type'),
  message: yup.string().trim(),
});

const visaTypes = [
  'Permanent Residency',
  'Study Visa',
  'Work Visa',
  'Business / Investor Visa',
  'Family Sponsorship',
  'Visitor / Tourist Visa',
  'Other',
];

const ContactForm = ({ compact = false }) => {
  const navigate = useNavigate();
  const countries = useSelector((state) => state.site.countries);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      countryInterested: '',
      visaType: '',
      message: '',
    },
  });

  const onSubmit = async (values) => {
    try {
      await leadService.create(values);
      toast.success('Enquiry submitted successfully!');
      reset();
      navigate('/thank-you');
    } catch (error) {
      const message =
        error.response?.data?.errors?.[0]?.message ||
        error.response?.data?.message ||
        'Unable to submit enquiry. Please try again.';
      toast.error(message);
    }
  };

  const fieldClass = (hasError) =>
    `w-full rounded-lg border bg-white outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 ${
      compact ? 'px-3 py-2 text-sm' : 'rounded-xl px-4 py-3'
    } ${hasError ? 'border-red-400' : 'border-gray-200'}`;

  const labelClass = compact
    ? 'mb-1 block text-xs font-medium text-gray-600'
    : 'admin-label';

  const errorClass = compact ? 'mt-0.5 text-xs text-red-500' : 'mt-1 text-sm text-red-500';

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={compact ? 'space-y-2.5' : 'space-y-5'}
      noValidate
    >
      <div className={`grid ${compact ? 'gap-2.5' : 'gap-4 sm:gap-5'} grid-cols-1 sm:grid-cols-2`}>
        <div>
          <label className={labelClass}>Full Name *</label>
          <input {...register('name')} className={fieldClass(errors.name)} placeholder="Your full name" />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Mobile Number *</label>
          <input
            {...register('phone')}
            className={fieldClass(errors.phone)}
            placeholder="+91 95787 00074"
          />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass}>Email Address *</label>
        <input
          type="email"
          {...register('email')}
          className={fieldClass(errors.email)}
          placeholder="you@example.com"
        />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      <div className={`grid ${compact ? 'gap-2.5' : 'gap-4 sm:gap-5'} grid-cols-1 sm:grid-cols-2`}>
        <div>
          <label className={labelClass}>Country Interested *</label>
          <select {...register('countryInterested')} className={fieldClass(errors.countryInterested)}>
            <option value="">Select country</option>
            {countries.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
          {errors.countryInterested && (
            <p className={errorClass}>{errors.countryInterested.message}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>Visa Type *</label>
          <select {...register('visaType')} className={fieldClass(errors.visaType)}>
            <option value="">Select visa type</option>
            {visaTypes.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          {errors.visaType && <p className={errorClass}>{errors.visaType.message}</p>}
        </div>
      </div>

      {!compact && (
        <div>
          <label className={labelClass}>Message</label>
          <textarea
            rows={4}
            {...register('message')}
            className={fieldClass(errors.message)}
            placeholder="Tell us briefly about your goals..."
          />
        </div>
      )}

      {compact && (
        <div>
          <label className={labelClass}>Message</label>
          <textarea
            rows={2}
            {...register('message')}
            className={fieldClass(errors.message)}
            placeholder="Brief message (optional)"
          />
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className={`w-full ${compact ? '!py-2.5 !text-xs' : 'md:w-auto'}`}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
      </Button>
    </form>
  );
};

export default ContactForm;
