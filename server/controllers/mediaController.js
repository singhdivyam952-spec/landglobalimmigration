import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Media from '../models/Media.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getMedia = async (_req, res, next) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 });
    res.json({ success: true, count: media.length, data: media });
  } catch (error) {
    next(error);
  }
};

export const uploadMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload an image file' });
    }

    const imagePath = `/uploads/${req.file.filename}`;
    const media = await Media.create({
      image: imagePath,
      originalName: req.file.originalname,
    });

    res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      data: media,
    });
  } catch (error) {
    next(error);
  }
};

export const replaceMedia = async (req, res, next) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ success: false, message: 'Media not found' });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload an image file' });
    }

    const oldFilename = media.image.replace(/^\/?uploads\//, '');
    const oldPath = path.join(__dirname, '..', 'uploads', oldFilename);
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }

    media.image = `/uploads/${req.file.filename}`;
    media.originalName = req.file.originalname;
    await media.save();

    res.json({ success: true, message: 'Image replaced successfully', data: media });
  } catch (error) {
    next(error);
  }
};

export const deleteMedia = async (req, res, next) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ success: false, message: 'Media not found' });
    }

    const filename = media.image.replace(/^\/?uploads\//, '');
    const filePath = path.join(__dirname, '..', 'uploads', filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await media.deleteOne();
    res.json({ success: true, message: 'Media deleted successfully' });
  } catch (error) {
    next(error);
  }
};
