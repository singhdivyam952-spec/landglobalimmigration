import express from 'express';
import {
  getMedia,
  uploadMedia,
  replaceMedia,
  deleteMedia,
} from '../controllers/mediaController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', protect, getMedia);
router.post('/', protect, upload.single('image'), uploadMedia);
router.put('/:id', protect, upload.single('image'), replaceMedia);
router.delete('/:id', protect, deleteMedia);

export default router;
