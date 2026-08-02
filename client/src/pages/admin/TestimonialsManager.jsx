import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEdit, FaPlus, FaStar, FaTrash } from 'react-icons/fa';
import { testimonialService } from '../../services';
import Modal from '../../components/Modal';
import ImageUpload from '../../components/ImageUpload';
import Loader from '../../components/Loader';
import { getImageSrc } from '../../utils/constants';

const emptyForm = {
  name: '',
  designation: '',
  review: '',
  rating: 5,
  image: '',
  status: 'active',
};

const TestimonialsManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const { data } = await testimonialService.getAll();
      setItems(data.data);
    } catch {
      toast.error('Failed to load testimonials');
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
      name: item.name,
      designation: item.designation || '',
      review: item.review,
      rating: item.rating || 5,
      image: item.image || '',
      status: item.status || 'active',
    });
    setOpen(true);
  };

  const save = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.review.trim()) {
      toast.error('Name and review are required');
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        await testimonialService.update(editing._id, form);
        toast.success('Testimonial updated');
      } else {
        await testimonialService.create(form);
        toast.success('Testimonial created');
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
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await testimonialService.remove(id);
      toast.success('Testimonial deleted');
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
          <h2 className="text-2xl font-bold">Testimonials Manager</h2>
          <p className="text-muted">Manage client reviews displayed on the homepage.</p>
        </div>
        <button type="button" onClick={openCreate} className="btn-primary !rounded-xl">
          <FaPlus /> Add Testimonial
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {items.map((item) => (
          <article key={item._id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <div className="flex items-start gap-4">
              <img
                src={getImageSrc(item.image) || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'}
                alt={item.name}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted">{item.designation}</p>
                  </div>
                  <div className="flex text-accent">
                    {Array.from({ length: item.rating || 5 }).map((_, i) => (
                      <FaStar key={i} className="text-xs" />
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-sm text-ink/80">"{item.review}"</p>
                <div className="mt-4 flex gap-2">
                  <button type="button" onClick={() => openEdit(item)} className="rounded-lg bg-secondary px-3 py-2 text-sm text-primary">
                    <FaEdit className="inline" /> Edit
                  </button>
                  <button type="button" onClick={() => remove(item._id)} className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                    <FaTrash className="inline" /> Delete
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit Testimonial' : 'Add Testimonial'} wide>
        <form onSubmit={save} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="admin-label">Client Name</label>
              <input
                className="admin-input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="admin-label">Designation</label>
              <input
                className="admin-input"
                value={form.designation}
                onChange={(e) => setForm({ ...form, designation: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="admin-label">Review</label>
            <textarea
              className="admin-input"
              rows={4}
              value={form.review}
              onChange={(e) => setForm({ ...form, review: e.target.value })}
              required
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="admin-label">Rating</label>
              <select
                className="admin-input"
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} Stars
                  </option>
                ))}
              </select>
            </div>
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
          </div>
          <ImageUpload value={form.image} onChange={(image) => setForm({ ...form, image })} />
          <button type="submit" disabled={saving} className="btn-primary w-full !rounded-xl">
            {saving ? 'Saving...' : 'Save Testimonial'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default TestimonialsManager;
