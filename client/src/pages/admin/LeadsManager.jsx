import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';
import { leadService } from '../../services';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';

const LeadsManager = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 10;

  const load = async () => {
    try {
      const { data } = await leadService.getAll();
      setLeads(data.data);
    } catch {
      toast.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    if (!window.confirm('Delete this lead?')) return;
    try {
      await leadService.remove(id);
      toast.success('Lead deleted');
      await load();
    } catch {
      toast.error('Delete failed');
    }
  };

  if (loading) return <Loader />;

  const totalPages = Math.ceil(leads.length / perPage) || 1;
  const paged = leads.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Lead Manager</h2>
        <p className="text-muted">View and manage enquiry submissions from the contact form.</p>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-surface text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Country</th>
                <th className="px-4 py-3 font-medium">Visa Type</th>
                <th className="px-4 py-3 font-medium">Message</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-muted">
                    No leads submitted yet.
                  </td>
                </tr>
              )}
              {paged.map((lead) => (
                <tr key={lead._id} className="border-t border-black/5 align-top">
                  <td className="px-4 py-3 font-medium">{lead.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{lead.phone}</td>
                  <td className="px-4 py-3">{lead.email}</td>
                  <td className="px-4 py-3">{lead.countryInterested}</td>
                  <td className="px-4 py-3">{lead.visaType}</td>
                  <td className="max-w-xs px-4 py-3 text-muted">{lead.message || '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-muted">
                    {new Date(lead.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => remove(lead._id)}
                      className="rounded-lg bg-red-50 p-2 text-red-600"
                      aria-label="Delete lead"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
};

export default LeadsManager;
