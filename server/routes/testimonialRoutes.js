import express from 'express';
import { body } from 'express-validator';
import {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

router.get('/', getTestimonials);
router.get('/:id', getTestimonial);

router.post(
  '/',
  protect,
  [
    body('name').trim().notEmpty().withMessage('Client name is required'),
    body('review').trim().notEmpty().withMessage('Review is required'),
    body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be 1-5'),
  ],
  validate,
  createTestimonial
);

router.put('/:id', protect, updateTestimonial);
router.delete('/:id', protect, deleteTestimonial);

export default router;
