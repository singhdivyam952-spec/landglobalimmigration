import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {
  FaTachometerAlt,
  FaFileAlt,
  FaBriefcase,
  FaGlobe,
  FaComments,
  FaUsers,
  FaImages,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import { logout } from '../redux/authSlice';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: FaTachometerAlt, end: true },
  { to: '/admin/content', label: 'Content Manager', icon: FaFileAlt },
  { to: '/admin/services', label: 'Services', icon: FaBriefcase },
  { to: '/admin/countries', label: 'Countries', icon: FaGlobe },
  { to: '/admin/testimonials', label: 'Testimonials', icon: FaComments },
  { to: '/admin/leads', label: 'Leads', icon: FaUsers },
  { to: '/admin/media', label: 'Media', icon: FaImages },
];

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.auth.admin);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  const Sidebar = (
    <aside className="flex h-full w-72 flex-col bg-navy-dark text-white">
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-6">
        <img
          src="/logo.png"
          alt="Land Global Immigration"
          className="h-12 w-12 rounded-full bg-white object-contain p-0.5 ring-1 ring-white/20"
        />
        <div>
          <p className="text-lg font-bold">Land Global</p>
          <p className="text-xs uppercase tracking-widest text-white/70">Admin Panel</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive ? 'bg-primary text-white' : 'text-white/85 hover:bg-white/10'
              }`
            }
          >
            <Icon />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-white/10 p-4">
        <p className="mb-3 truncate text-xs text-white/70">{admin?.email}</p>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold transition hover:bg-white/20"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-surface">
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72">{Sidebar}</div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 z-10">{Sidebar}</div>
        </div>
      )}

      <div className="flex min-h-screen flex-1 flex-col lg:pl-72">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-black/5 bg-white px-4 py-4 md:px-8">
          <button
            type="button"
            className="rounded-lg p-2 text-primary lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open sidebar"
          >
            {open ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
          <h1 className="text-lg font-semibold text-ink">Administration</h1>
          <a href="/" target="_blank" rel="noreferrer" className="text-sm font-medium text-primary">
            View Website
          </a>
        </header>
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
