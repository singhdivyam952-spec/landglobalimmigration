import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Admin from '../models/Admin.js';

dotenv.config();

const ensureAdmin = async () => {
  try {
    await connectDB();

    const email = (process.env.ADMIN_EMAIL || 'admin@landglobalimmigration.com').toLowerCase();
    const password = process.env.ADMIN_PASSWORD || 'Admin@12345';

    const existing = await Admin.findOne({ email }).select('+password');

    if (existing) {
      existing.password = password;
      await existing.save();
      console.log(`Admin updated: ${email}`);
    } else {
      await Admin.create({ email, password });
      console.log(`Admin created: ${email}`);
    }

    console.log('Login credentials ready in Atlas DB.');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Failed to create admin:', error.message);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  }
};

ensureAdmin();
