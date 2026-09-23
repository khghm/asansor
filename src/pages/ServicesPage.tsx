import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle, Wrench, Settings, RefreshCw, Send } from 'lucide-react';

const ServicesPage: React.FC = () => {
  const { addServiceRequest } = useStore();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    serviceType: 'repair' as 'installation' | 'repair' | 'maintenance',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    addServiceRequest({
      id: 'SRV-' + Date.now(),
      ...form,
      status: 'new',
      date: new Date().toLocaleDateString('fa-IR')
    });
    
    setSubmitted(true);
    setIsSubmitting(false);
    setForm({ name: '', phone: '', address: '', serviceType: 'repair', description: '' });
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
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
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-2 animate-fade-in">
            <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
            <span className="text-green-700">درخواست شما با موفقیت ثبت شد. به زودی با شما تماس خواهیم گرفت.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">نام و نام خانوادگی *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => handleChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="نام کامل"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">شماره تماس *</label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={e => handleChange('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="۰۹۱۲۱۲۳۴۵۶۷"
                disabled={isSubmitting}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">آدرس *</label>
            <input
              type="text"
              required
              value={form.address}
              onChange={e => handleChange('address', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="آدرس محل نصب/تعمیر"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">نوع خدمات *</label>
            <select
              value={form.serviceType}
              onChange={e => handleChange('serviceType', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              disabled={isSubmitting}
            >
              <option value="installation">نصب آسانسور</option>
              <option value="repair">تعمیر</option>
              <option value="maintenance">سرویس و نگهداری</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">توضیحات *</label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={e => handleChange('description', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="توضیحات بیشتر درباره مشکل یا درخواست..."
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>در حال ارسال...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>ثبت درخواست</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServicesPage;
