import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCloudUploadAlt, FaExchangeAlt, FaTrash } from 'react-icons/fa';
import { mediaService } from '../../services';
import Loader from '../../components/Loader';
import { getImageSrc } from '../../utils/constants';

const MediaManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const uploadRef = useRef(null);
  const replaceRef = useRef(null);
  const [replaceId, setReplaceId] = useState(null);

  const load = async () => {
    try {
      const { data } = await mediaService.getAll();
      setItems(data.data);
    } catch {
      toast.error('Failed to load media');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await mediaService.upload(file);
      toast.success('Image uploaded');
      await load();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (uploadRef.current) uploadRef.current.value = '';
    }
  };

  const handleReplace = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !replaceId) return;
    setUploading(true);
    try {
      await mediaService.replace(replaceId, file);
      toast.success('Image replaced');
      await load();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Replace failed');
    } finally {
      setUploading(false);
      setReplaceId(null);
      if (replaceRef.current) replaceRef.current.value = '';
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this image?')) return;
    try {
      await mediaService.remove(id);
      toast.success('Image deleted');
      await load();
    } catch {
      toast.error('Delete failed');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Media Manager</h2>
          <p className="text-muted">Upload, preview, replace, and delete website images.</p>
        </div>
        <button
          type="button"
          disabled={uploading}
          onClick={() => uploadRef.current?.click()}
          className="btn-primary !rounded-xl"
        >
          <FaCloudUploadAlt /> {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
        <input ref={uploadRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        <input ref={replaceRef} type="file" accept="image/*" className="hidden" onChange={handleReplace} />
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center text-muted shadow-sm ring-1 ring-black/5">
          No media uploaded yet.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <article key={item._id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
              <img src={getImageSrc(item.image)} alt={item.originalName || 'Media'} className="h-44 w-full object-cover" />
              <div className="space-y-3 p-4">
                <p className="truncate text-sm text-muted">{item.originalName || item.image}</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setReplaceId(item._id);
                      replaceRef.current?.click();
                    }}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-secondary px-3 py-2 text-sm font-medium text-primary"
                  >
                    <FaExchangeAlt /> Replace
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(item._id)}
                    className="inline-flex items-center justify-center rounded-lg bg-red-50 px-3 py-2 text-red-600"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaManager;
