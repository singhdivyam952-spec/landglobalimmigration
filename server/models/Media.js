import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, 'Image path is required'],
    },
    originalName: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Media', mediaSchema);
