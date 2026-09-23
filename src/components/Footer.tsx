import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">آ</span>
              </div>
              <h3 className="text-white font-bold text-lg">آسانسور آرمند</h3>
            </div>
            <p className="text-sm leading-7">
              فروشگاه لوازم یدکی آسانسور آرمند با بیش از ۱۵ سال سابقه در زمینه فروش، نصب و تعمیر انواع آسانسور در خدمت شماست.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">دسترسی سریع</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-sm hover:text-blue-400 transition-colors">محصولات</Link></li>
              <li><Link to="/services" className="text-sm hover:text-blue-400 transition-colors">خدمات نصب و تعمیر</Link></li>
              <li><Link to="/about" className="text-sm hover:text-blue-400 transition-colors">درباره ما</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-blue-400 transition-colors">تماس با ما</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-4">خدمات ما</h4>
            <ul className="space-y-2">
              <li className="text-sm">نصب آسانسور</li>
              <li className="text-sm">تعمیر و سرویس دوره‌ای</li>
              <li className="text-sm">فروش لوازم یدکی</li>
              <li className="text-sm">مشاوره فنی رایگان</li>
              <li className="text-sm">بازسازی و نوسازی</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">اطلاعات تماس</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Phone size={16} className="text-blue-400" />
                <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <MapPin size={16} className="text-blue-400" />
                <span>تهران، خیابان آزادی، پلاک ۱۲۰</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Clock size={16} className="text-blue-400" />
                <span>شنبه تا پنجشنبه ۹ تا ۱۸</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail size={16} className="text-blue-400" />
                <span>info@armand-elevator.ir</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © ۱۴۰۳ فروشگاه لوازم یدکی آسانسور آرمند. تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
