import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { countryService } from '../../services';
import Modal from '../../components/Modal';
import ImageUpload from '../../components/ImageUpload';
import Loader from '../../components/Loader';
import { getImageSrc } from '../../utils/constants';

const emptyForm = { name: '', image: '', status: 'active' };

const CountriesManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const { data } = await countryService.getAll();
      setItems(data.data);
    } catch {
      toast.error('Failed to load countries');
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
    setForm({ name: item.name, image: item.image || '', status: item.status });
    setOpen(true);
  };

  const save = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error('Country name is required');
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        await countryService.update(editing._id, form);
        toast.success('Country updated');
      } else {
        await countryService.create(form);
        toast.success('Country created');
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
    if (!window.confirm('Delete this country?')) return;
    try {
      await countryService.remove(id);
      toast.success('Country deleted');
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
          <h2 className="text-2xl font-bold">Countries Manager</h2>
          <p className="text-muted">Manage destination countries shown on the website.</p>
        </div>
        <button type="button" onClick={openCreate} className="btn-primary !rounded-xl">
          <FaPlus /> Add Country
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article key={item._id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
            <img
              src={getImageSrc(item.image) || 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=800&q=80'}
              alt={item.name}
              className="h-44 w-full object-cover"
            />
            <div className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-xs capitalize text-muted">{item.status}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => openEdit(item)} className="rounded-lg bg-secondary p-2 text-primary">
                  <FaEdit />
                </button>
                <button type="button" onClick={() => remove(item._id)} className="rounded-lg bg-red-50 p-2 text-red-600">
                  <FaTrash />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit Country' : 'Add Country'}>
        <form onSubmit={save} className="space-y-4">
          <div>
            <label className="admin-label">Country Name</label>
            <input
              className="admin-input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
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
            {saving ? 'Saving...' : 'Save Country'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default CountriesManager;
