import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { clearAuthError, loginAdmin } from '../../redux/authSlice';
import SEO from '../../components/SEO';

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/admin', { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAuthError());
    }
  }, [error, dispatch]);

  const onSubmit = async (values) => {
    const result = await dispatch(loginAdmin(values));
    if (loginAdmin.fulfilled.match(result)) {
      toast.success('Welcome back!');
      navigate('/admin');
    }
  };

  return (
    <>
      <SEO title="Admin Login" description="Secure admin login for Land Global Immigration." path="/admin/login" />
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-navy-dark via-navy to-navy-light p-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <img
              src="/logo.png"
              alt="Land Global Immigration"
              className="mx-auto mb-4 h-20 w-20 rounded-full bg-white object-contain p-1 shadow-md ring-1 ring-black/10"
            />
            <h1 className="text-2xl font-bold text-ink">Admin Login</h1>
            <p className="mt-2 text-sm text-muted">Sign in to manage Land Global Immigration</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="admin-label">Email</label>
              <div className="relative">
                <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-sm text-muted" />
                <input
                  type="email"
                  {...register('email', { required: true })}
                  className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  placeholder="admin@landglobalimmigration.com"
                />
              </div>
            </div>
            <div>
              <label className="admin-label">Password</label>
              <div className="relative">
                <FaLock className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-sm text-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { required: true })}
                  className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-16 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-primary"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full !rounded-xl"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
