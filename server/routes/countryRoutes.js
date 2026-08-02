import express from 'express';
import { body } from 'express-validator';
import {
  getCountries,
  getCountry,
  createCountry,
  updateCountry,
  deleteCountry,
} from '../controllers/countryController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

router.get('/', getCountries);
router.get('/:id', getCountry);

router.post(
  '/',
  protect,
  [body('name').trim().notEmpty().withMessage('Country name is required')],
  validate,
  createCountry
);

router.put('/:id', protect, updateCountry);
router.delete('/:id', protect, deleteCountry);

export default router;
