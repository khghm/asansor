import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Mail, Building2, Instagram, Send, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Building2 className="text-white" size={22} />
              </div>
              <div>
                <h3 className="text-white font-extrabold text-lg">آسانسور آرمند</h3>
                <p className="text-xs text-slate-400">از ۱۳۸۸ در خدمت شما</p>
              </div>
            </div>
            <p className="text-sm leading-7 text-slate-400">
              فروشگاه لوازم یدکی آسانسور آرمند با بیش از ۱۵ سال سابقه در زمینه فروش، نصب و تعمیر انواع آسانسور در خدمت شماست.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-500 flex items-center justify-center transition-all duration-300">
                <Send size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-green-600 flex items-center justify-center transition-all duration-300">
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">دسترسی سریع</h4>
            <ul className="space-y-3">
              {[
                { to: '/products', label: 'محصولات' },
                { to: '/services', label: 'خدمات نصب و تعمیر' },
                { to: '/about', label: 'درباره ما' },
                { to: '/contact', label: 'تماس با ما' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-slate-400 hover:text-white hover:pr-1 transition-all duration-200 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">خدمات ما</h4>
            <ul className="space-y-3">
              {['نصب آسانسور', 'تعمیر و سرویس دوره‌ای', 'فروش لوازم یدکی', 'مشاوره فنی رایگان', 'بازسازی و نوسازی'].map((item, i) => (
                <li key={i} className="text-sm text-slate-400 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">اطلاعات تماس</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone size={14} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">تلفن تماس</p>
                  <p className="text-sm text-slate-300">۰۲۱-۱۲۳۴۵۶۷۸</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={14} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">آدرس</p>
                  <p className="text-sm text-slate-300">تهران، خیابان آزادی، پلاک ۱۲۰</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock size={14} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">ساعات کاری</p>
                  <p className="text-sm text-slate-300">شنبه تا پنجشنبه ۹ تا ۱۸</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail size={14} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">ایمیل</p>
                  <p className="text-sm text-slate-300">info@armand-elevator.ir</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © ۱۴۰۳ فروشگاه لوازم یدکی آسانسور آرمند. تمامی حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <a href="#" className="hover:text-slate-300 transition-colors">قوانین و مقررات</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300 transition-colors">حریم خصوصی</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300 transition-colors">پشتیبانی</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
