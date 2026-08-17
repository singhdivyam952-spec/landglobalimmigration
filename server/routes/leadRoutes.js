import express from 'express';
import { body } from 'express-validator';
import {
  createLead,
  getLeads,
  deleteLead,
  getDashboardStats,
} from '../controllers/leadController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { leadLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post(
  '/',
  leadLimiter,
  [
    body('name').trim().notEmpty().withMessage('Full name is required'),
    body('phone')
      .trim()
      .notEmpty()
      .withMessage('Phone number is required')
      .matches(/^[+\d][\d\s\-()]{8,19}$/)
      .withMessage('Please provide a valid phone number')
      .custom((value) => {
        const digits = String(value).replace(/\D/g, '');
        if (digits.length < 10 || digits.length > 15) {
          throw new Error('Phone number must contain 10–15 digits');
        }
        return true;
      }),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(),
    body('countryInterested').trim().notEmpty().withMessage('Country interested is required'),
    body('visaType').trim().notEmpty().withMessage('Visa type is required'),
    body('message').optional().trim(),
  ],
  validate,
  createLead
);

router.get('/', protect, getLeads);
router.get('/stats/dashboard', protect, getDashboardStats);
router.delete('/:id', protect, deleteLead);

export default router;
