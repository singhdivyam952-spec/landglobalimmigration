import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader';
import { fetchPublicData } from './redux/siteSlice';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const ThankYou = lazy(() => import('./pages/ThankYou'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const ContentManager = lazy(() => import('./pages/admin/ContentManager'));
const ServicesManager = lazy(() => import('./pages/admin/ServicesManager'));
const CountriesManager = lazy(() => import('./pages/admin/CountriesManager'));
const TestimonialsManager = lazy(() => import('./pages/admin/TestimonialsManager'));
const LeadsManager = lazy(() => import('./pages/admin/LeadsManager'));
const MediaManager = lazy(() => import('./pages/admin/MediaManager'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPublicData());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
      <Suspense fallback={<Loader fullScreen />}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="contact" element={<Contact />} />
            <Route path="thank-you" element={<ThankYou />} />
          </Route>

          <Route path="admin/login" element={<AdminLogin />} />

          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="content" element={<ContentManager />} />
            <Route path="services" element={<ServicesManager />} />
            <Route path="countries" element={<CountriesManager />} />
            <Route path="testimonials" element={<TestimonialsManager />} />
            <Route path="leads" element={<LeadsManager />} />
            <Route path="media" element={<MediaManager />} />
          </Route>

          <Route
            path="*"
            element={
              <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
                <h1 className="text-4xl font-bold text-primary">404</h1>
                <p className="text-muted">The page you are looking for does not exist.</p>
                <a href="/" className="btn-primary">
                  Go Home
                </a>
              </div>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
