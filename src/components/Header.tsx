import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ShoppingCart, Menu, X, Shield, Phone } from 'lucide-react';

const Header: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { cartCount, isAdmin } = useStore();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'صفحه اصلی' },
    { path: '/products', label: 'محصولات' },
    { path: '/services', label: 'خدمات' },
    { path: '/about', label: 'درباره ما' },
    { path: '/contact', label: 'تماس با ما' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">آ</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-800">آسانسور آرمند</h1>
              <p className="text-xs text-gray-500">لوازم یدکی و خدمات</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path) ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a href="tel:02112345678" className="hidden sm:flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600">
              <Phone size={16} />
              <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
            </a>
            
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAdmin && (
              <Link to="/admin" className="p-2 text-blue-600 hover:text-blue-800 transition-colors">
                <Shield size={22} />
              </Link>
            )}

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden p-2 text-gray-600"
            >
              {mobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden pb-4 border-t">
            <nav className="flex flex-col gap-2 pt-4">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenu(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    isActive(link.path) ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {!isAdmin && (
                <Link
                  to="/admin/login"
                  onClick={() => setMobileMenu(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  ورود ادمین
                </Link>
              )}
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenu(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50"
                >
                  پنل مدیریت
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
