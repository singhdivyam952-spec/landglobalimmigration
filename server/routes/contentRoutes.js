import express from 'express';
import { getContent, updateContent } from '../controllers/contentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getContent);
router.put('/', protect, updateContent);

export default router;
