import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ShoppingCart, Menu, X, Shield, Phone, ChevronDown, Building2 } from 'lucide-react';

const Header: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount, isAdmin } = useStore();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'صفحه اصلی' },
    { path: '/products', label: 'محصولات' },
    { path: '/services', label: 'خدمات' },
    { path: '/about', label: 'درباره ما' },
    { path: '/contact', label: 'تماس با ما' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-200/50' 
        : 'bg-white shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300">
                <Building2 className="text-white" size={22} />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-extrabold bg-gradient-to-l from-slate-800 to-slate-600 bg-clip-text text-transparent">
                آسانسور آرمند
              </h1>
              <p className="text-[11px] text-slate-500 font-medium -mt-0.5">لوازم یدکی و خدمات تخصصی</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path) 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a 
              href="tel:02112345678" 
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
            >
              <Phone size={16} />
              <span className="font-medium">۰۲۱-۱۲۳۴۵۶۷۸</span>
            </a>
            
            <Link 
              to="/cart" 
              className="relative p-2.5 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-red-500 to-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30 animate-scale-in">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAdmin ? (
              <Link 
                to="/admin" 
                className="hidden sm:flex p-2.5 rounded-xl text-blue-600 hover:bg-blue-50 transition-all duration-200"
              >
                <Shield size={20} />
              </Link>
            ) : (
              <Link 
                to="/admin/login" 
                className="hidden sm:flex p-2.5 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
              >
                <Shield size={20} />
              </Link>
            )}

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-all"
            >
              {mobileMenu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="lg:hidden pb-4 border-t border-slate-100 animate-fade-in">
            <nav className="flex flex-col gap-1 pt-4">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenu(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive(link.path) 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {!isAdmin && (
                <Link
                  to="/admin/login"
                  onClick={() => setMobileMenu(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 flex items-center gap-2"
                >
                  <Shield size={16} />
                  <span>ورود ادمین</span>
                </Link>
              )}
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenu(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-blue-600 hover:bg-blue-50 flex items-center gap-2"
                >
                  <Shield size={16} />
                  <span>پنل مدیریت</span>
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
