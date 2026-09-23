import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle, Wrench, Settings, RefreshCw } from 'lucide-react';

const ServicesPage: React.FC = () => {
  const { addServiceRequest } = useStore();
  const [form, setForm] = useState({
    name: '', phone: '', address: '', serviceType: 'repair' as 'installation' | 'repair' | 'maintenance', description: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addServiceRequest({
      id: 'SRV-' + Date.now(),
      ...form,
      status: 'new',
      date: new Date().toLocaleDateString('fa-IR')
    });
    setSubmitted(true);
    setForm({ name: '', phone: '', address: '', serviceType: 'repair', description: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">خدمات نصب و تعمیر آسانسور</h1>
      <p className="text-gray-600 mb-10 leading-7">
        فروشگاه آرمند با تیم متخصص و مجرب خود، خدمات نصب، تعمیر و نگهداری انواع آسانسور را با بالاترین کیفیت ارائه می‌دهد.
      </p>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          {
            icon: <Wrench size={32} />,
            title: 'نصب آسانسور',
            desc: 'نصب انواع آسانسور مسکونی، تجاری و بیمارستانی با رعایت استانداردهای ملی و بین‌المللی',
            items: ['آسانسور کششی', 'آسانسور هیدرولیک', 'آسانسور پانوراما', 'بالابر و پلتفرم']
          },
          {
            icon: <Settings size={32} />,
            title: 'تعمیرات تخصصی',
            desc: 'رفع عیب و تعمیر انواع خرابی‌های آسانسور با قطعات اورجینال و ضمانت',
            items: ['تعمیر موتور', 'تعویض تابلو فرمان', 'تعمیر درب', 'رفع خرابی‌های برقی']
          },
          {
            icon: <RefreshCw size={32} />,
            title: 'سرویس و نگهداری',
            desc: 'سرویس دوره‌ای و نگهداری پیشگیرانه برای افزایش عمر مفید آسانسور',
            items: ['سرویس ماهانه', 'بازدید دوره‌ای', 'روغن‌کاری و تنظیم', 'تست ایمنی']
          }
        ].map((service, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
            <div className="text-blue-600 mb-4">{service.icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
            <p className="text-gray-600 mb-4 leading-7">{service.desc}</p>
            <ul className="space-y-2">
              {service.items.map((item, j) => (
                <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Request Form */}
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-6">درخواست خدمات</h2>
        
        {submitted && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-2">
            <CheckCircle className="text-green-500" />
            <span className="text-green-700">درخواست شما با موفقیت ثبت شد. به زودی با شما تماس خواهیم گرفت.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">نام و نام خانوادگی</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="input-field"
                placeholder="نام کامل"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">شماره تماس</label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                className="input-field"
                placeholder="۰۹۱۲۱۲۳۴۵۶۷"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">آدرس</label>
            <input
              type="text"
              required
              value={form.address}
              onChange={e => setForm({ ...form, address: e.target.value })}
              className="input-field"
              placeholder="آدرس محل نصب/تعمیر"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">نوع خدمات</label>
            <select
              value={form.serviceType}
              onChange={e => setForm({ ...form, serviceType: e.target.value as any })}
              className="input-field"
            >
              <option value="installation">نصب آسانسور</option>
              <option value="repair">تعمیر</option>
              <option value="maintenance">سرویس و نگهداری</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">توضیحات</label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="input-field"
              placeholder="توضیحات بیشتر درباره مشکل یا درخواست..."
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            ثبت درخواست
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServicesPage;
