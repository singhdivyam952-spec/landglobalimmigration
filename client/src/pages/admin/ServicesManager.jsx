import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { serviceService } from '../../services';
import Modal from '../../components/Modal';
import ImageUpload from '../../components/ImageUpload';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';
import { getImageSrc } from '../../utils/constants';

const emptyForm = { title: '', description: '', image: '', status: 'active' };

const ServicesManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 6;

  const load = async () => {
    try {
      const { data } = await serviceService.getAll();
      setItems(data.data);
    } catch {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({
      title: item.title,
      description: item.description,
      image: item.image || '',
      status: item.status,
    });
    setOpen(true);
  };

  const save = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      toast.error('Title and description are required');
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        await serviceService.update(editing._id, form);
        toast.success('Service updated');
      } else {
        await serviceService.create(form);
        toast.success('Service created');
      }
      setOpen(false);
      await load();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await serviceService.remove(id);
      toast.success('Service deleted');
      await load();
    } catch {
      toast.error('Delete failed');
    }
  };

  if (loading) return <Loader />;

  const totalPages = Math.ceil(items.length / perPage) || 1;
  const paged = items.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Services Manager</h2>
          <p className="text-muted">Create and manage immigration services.</p>
        </div>
        <button type="button" onClick={openCreate} className="btn-primary !rounded-xl">
          <FaPlus /> Add Service
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {paged.map((item) => (
          <article key={item._id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
            <img
              src={getImageSrc(item.image) || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80'}
              alt={item.title}
              className="h-40 w-full object-cover"
            />
            <div className="p-5">
              <div className="mb-2 flex items-center justify-between gap-2">
                <h3 className="font-semibold">{item.title}</h3>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    item.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <p className="line-clamp-3 text-sm text-muted">{item.description}</p>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(item)}
                  className="inline-flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-sm font-medium text-primary"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => remove(item._id)}
                  className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit Service' : 'Add Service'}>
        <form onSubmit={save} className="space-y-4">
          <div>
            <label className="admin-label">Title</label>
            <input
              className="admin-input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="admin-label">Description</label>
            <textarea
              className="admin-input"
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>
          <ImageUpload value={form.image} onChange={(image) => setForm({ ...form, image })} />
          <div>
            <label className="admin-label">Status</label>
            <select
              className="admin-input"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <button type="submit" disabled={saving} className="btn-primary w-full !rounded-xl">
            {saving ? 'Saving...' : 'Save Service'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ServicesManager;
