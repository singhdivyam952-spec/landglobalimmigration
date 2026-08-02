import { useRef, useState } from 'react';
import { FaCloudUploadAlt, FaTrash } from 'react-icons/fa';
import { getImageSrc } from '../utils/constants';
import { mediaService } from '../services';
import toast from 'react-hot-toast';

const ImageUpload = ({ value, onChange, label = 'Image' }) => {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    setUploading(true);
    try {
      const { data } = await mediaService.upload(file);
      onChange(data.data.image);
      toast.success('Image uploaded');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div>
      <label className="admin-label">{label}</label>
      <div className="rounded-xl border border-dashed border-gray-300 bg-surface p-4">
        {value ? (
          <div className="space-y-3">
            <img
              src={getImageSrc(value)}
              alt="Preview"
              className="h-40 w-full rounded-lg object-cover"
            />
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white"
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Replace'}
              </button>
              <button
                type="button"
                onClick={() => onChange('')}
                className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600"
              >
                <FaTrash /> Remove
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex w-full flex-col items-center gap-2 py-8 text-muted"
          >
            <FaCloudUploadAlt className="text-3xl text-primary" />
            <span className="text-sm font-medium">
              {uploading ? 'Uploading...' : 'Click to upload image'}
            </span>
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      </div>
      <input
        type="text"
        className="admin-input mt-2"
        placeholder="Or paste image URL"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default ImageUpload;
