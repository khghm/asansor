import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider, useStore } from './context/StoreContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ServicesPage from './pages/ServicesPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminPanel from './pages/admin/AdminPanel';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin } = useStore();
  if (!isAdmin) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="min-h-screen">{children}</div>;
};

const App: React.FC = () => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/products" element={<Layout><ProductsPage /></Layout>} />
          <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
          <Route path="/cart" element={<Layout><CartPage /></Layout>} />
          <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
          <Route path="/about" element={<Layout><AboutPage /></Layout>} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLayout><AdminLogin /></AdminLayout>} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout><AdminPanel /></AdminLayout>
            </ProtectedRoute>
          } />
          
          {/* 404 */}
          <Route path="*" element={
            <Layout>
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">صفحه یافت نشد</h2>
                  <p className="text-gray-500">صفحه مورد نظر وجود ندارد</p>
                </div>
              </div>
            </Layout>
          } />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
};

export default App;
