import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUsers,
  FaBriefcase,
  FaGlobe,
  FaComments,
  FaImages,
  FaArrowRight,
} from 'react-icons/fa';
import { leadService } from '../../services';
import Loader from '../../components/Loader';

const DashboardCard = ({ title, value, icon: Icon, to, color }) => (
  <Link
    to={to}
    className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-md"
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-muted">{title}</p>
        <p className="mt-2 text-3xl font-bold text-ink">{value}</p>
      </div>
      <div className={`rounded-xl p-3 text-white ${color}`}>
        <Icon />
      </div>
    </div>
    <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary opacity-0 transition group-hover:opacity-100">
      Manage <FaArrowRight />
    </p>
  </Link>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await leadService.getDashboardStats();
        setStats(data.data);
      } catch {
        setStats({
          counts: { leads: 0, services: 0, countries: 0, testimonials: 0, media: 0 },
          recentLeads: [],
        });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loader />;

  const counts = stats?.counts || {};

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-ink">Dashboard</h2>
        <p className="mt-1 text-muted">Overview of website content and leads.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        <DashboardCard title="Leads" value={counts.leads || 0} icon={FaUsers} to="/admin/leads" color="bg-primary" />
        <DashboardCard title="Services" value={counts.services || 0} icon={FaBriefcase} to="/admin/services" color="bg-primary-light" />
        <DashboardCard title="Countries" value={counts.countries || 0} icon={FaGlobe} to="/admin/countries" color="bg-[#0e7490]" />
        <DashboardCard title="Testimonials" value={counts.testimonials || 0} icon={FaComments} to="/admin/testimonials" color="bg-accent" />
        <DashboardCard title="Media" value={counts.media || 0} icon={FaImages} to="/admin/media" color="bg-[#7c3aed]" />
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Recent Leads</h3>
          <Link to="/admin/leads" className="text-sm font-medium text-primary">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b text-muted">
              <tr>
                <th className="px-3 py-3 font-medium">Name</th>
                <th className="px-3 py-3 font-medium">Email</th>
                <th className="px-3 py-3 font-medium">Country</th>
                <th className="px-3 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {(stats?.recentLeads || []).length === 0 && (
                <tr>
                  <td colSpan={4} className="px-3 py-8 text-center text-muted">
                    No leads yet.
                  </td>
                </tr>
              )}
              {(stats?.recentLeads || []).map((lead) => (
                <tr key={lead._id} className="border-b border-black/5">
                  <td className="px-3 py-3 font-medium">{lead.name}</td>
                  <td className="px-3 py-3">{lead.email}</td>
                  <td className="px-3 py-3">{lead.countryInterested}</td>
                  <td className="px-3 py-3 text-muted">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
