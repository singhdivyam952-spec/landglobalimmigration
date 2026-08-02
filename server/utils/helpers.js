import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

export const getImageUrl = (req, filename) => {
  if (!filename) return '';
  if (filename.startsWith('http')) return filename;
  const base = `${req.protocol}://${req.get('host')}`;
  return `${base}/uploads/${filename.replace(/^\/?uploads\//, '')}`;
};
