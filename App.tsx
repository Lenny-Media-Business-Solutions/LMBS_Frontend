import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loading from './components/Loading';
import { MessageCircle } from 'lucide-react';
import { AuthProvider } from './context/AuthContext';
import { ClientAuthProvider } from './context/ClientAuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';
import ProtectedClientRoute from './components/client/ProtectedClientRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import ClientLogin from './pages/ClientLogin';
import ClientRegister from './pages/ClientRegister';
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Packages = lazy(() => import('./pages/Packages'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Contact = lazy(() => import('./pages/Contact'));
const Quote = lazy(() => import('./pages/Quote'));
const OurBrands = lazy(() => import('./pages/OurBrands'));
const Careers = lazy(() => import('./pages/Careers'));
const JobApplication = lazy(() => import('./pages/JobApplication'));
const StartupPackage = lazy(() => import('./pages/StartupPackage'));
const ClientDashboard = lazy(() => import('./pages/ClientDashboard'));

// Admin Pages
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const Users = lazy(() => import('./pages/admin/Users'));
const Contacts = lazy(() => import('./pages/admin/Contacts'));
const Quotes = lazy(() => import('./pages/admin/Quotes'));
const JobsAdmin = lazy(() => import('./pages/admin/Jobs'));
const ApplicationsAdmin = lazy(() => import('./pages/admin/Applications'));
const ProjectsAdmin = lazy(() => import('./pages/admin/Projects'));
const PortfolioAdmin = lazy(() => import('./pages/admin/Portfolio'));

// Scroll to top on route change component
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    // Only scroll to top if there's no hash (anchor link)
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

// Layout for public pages
const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/254115999101"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center gap-2 group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-bold">Chat with us</span>
      </a>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <ClientAuthProvider>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen font-sans bg-white text-navy-900 selection:bg-gold-200 selection:text-navy-900">
            <Routes>
              {/* Admin Routes */}
              <Route path="/secure-admin-7090/login" element={<AdminLogin />} />

              <Route path="/secure-admin-7090" element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="dashboard/users" element={<Users />} />
                  <Route path="dashboard/contacts" element={<Contacts />} />
                  <Route path="dashboard/quotes" element={<Quotes />} />
                  <Route path="dashboard/jobs" element={<JobsAdmin />} />
                  <Route path="dashboard/applications" element={<ApplicationsAdmin />} />
                  <Route path="dashboard/projects" element={<ProjectsAdmin />} />
                  <Route path="dashboard/portfolio" element={<PortfolioAdmin />} />
                </Route>
              </Route>

              {/* Client Portal Routes */}
              <Route path="/client-login" element={<ClientLogin />} />
              <Route path="/client-register" element={<ClientRegister />} />

              <Route
                path="/client-dashboard"
                element={
                  <ProtectedClientRoute>
                    <ClientDashboard />
                  </ProtectedClientRoute>
                }
              />

              {/* Public Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/quote" element={<Quote />} />
                <Route path="/brands" element={<OurBrands />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/apply/:jobId" element={<JobApplication />} />
                <Route path="/startup-package" element={<StartupPackage />} />
              </Route>
            </Routes>
          </div>
        </ClientAuthProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;