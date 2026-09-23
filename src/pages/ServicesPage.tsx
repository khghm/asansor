import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, Wrench, Settings, RefreshCw, Send, Building2, Cog } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-12">
        <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">خدمات تخصصی</span>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">خدمات نصب و تعمیر آسانسور</h1>
        <p className="text-slate-500 mt-3 max-w-2xl leading-7">
          فروشگاه آرمند با تیم متخصص و مجرب خود، خدمات نصب، تعمیر و نگهداری انواع آسانسور را با بالاترین کیفیت ارائه می‌دهد.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          {
            icon: <Building2 size={28} />,
            title: 'نصب آسانسور',
            desc: 'نصب انواع آسانسور مسکونی، تجاری و بیمارستانی با رعایت استانداردهای ملی و بین‌المللی',
            items: ['آسانسور کششی', 'آسانسور هیدرولیک', 'آسانسور پانوراما', 'بالابر و پلتفرم'],
            color: 'from-blue-500 to-indigo-600',
            textColor: 'text-blue-600'
          },
          {
            icon: <Cog size={28} />,
            title: 'تعمیرات تخصصی',
            desc: 'رفع عیب و تعمیر انواع خرابی‌های آسانسور با قطعات اورجینال و ضمانت',
            items: ['تعمیر موتور', 'تعویض تابلو فرمان', 'تعمیر درب', 'رفع خرابی‌های برقی'],
            color: 'from-orange-500 to-red-600',
            textColor: 'text-orange-600'
          },
          {
            icon: <RefreshCw size={28} />,
            title: 'سرویس و نگهداری',
            desc: 'سرویس دوره‌ای و نگهداری پیشگیرانه برای افزایش عمر مفید آسانسور',
            items: ['سرویس ماهانه', 'بازدید دوره‌ای', 'روغن‌کاری و تنظیم', 'تست ایمنی'],
            color: 'from-emerald-500 to-teal-600',
            textColor: 'text-emerald-600'
          }
        ].map((service, i) => (
          <div 
            key={i} 
            className="group bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 card-hover"
          >
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg mb-5 group-hover:scale-110 transition-transform duration-300`}>
              {service.icon}
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-3">{service.title}</h3>
            <p className="text-slate-600 mb-5 leading-7 text-sm">{service.desc}</p>
            <ul className="space-y-2.5">
              {service.items.map((item, j) => (
                <li key={j} className="flex items-center gap-2.5 text-sm text-slate-600">
                  <CheckCircle2 size={16} className={service.textColor} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Request Form */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-7 md:p-9">
          <div className="mb-7">
            <h2 className="text-2xl font-black text-slate-900">درخواست خدمات</h2>
            <p className="text-slate-500 text-sm mt-2">فرم زیر را تکمیل کنید تا کارشناسان ما با شما تماس بگیرند</p>
          </div>
          
          {submitted && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 flex items-center gap-3 animate-scale-in">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="text-white" size={20} />
              </div>
              <div>
                <p className="font-bold text-emerald-800 text-sm">درخواست شما با موفقیت ثبت شد</p>
                <p className="text-emerald-600 text-xs mt-0.5">به زودی با شما تماس خواهیم گرفت</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">نام و نام خانوادگی</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => handleChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                  placeholder="نام کامل"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">شماره تماس</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={e => handleChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                  placeholder="۰۹۱۲۱۲۳۴۵۶۷"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">آدرس</label>
              <input
                type="text"
                required
                value={form.address}
                onChange={e => handleChange('address', e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                placeholder="آدرس محل نصب/تعمیر"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">نوع خدمات</label>
              <select
                value={form.serviceType}
                onChange={e => handleChange('serviceType', e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm appearance-none bg-white"
                disabled={isSubmitting}
              >
                <option value="installation">نصب آسانسور</option>
                <option value="repair">تعمیر</option>
                <option value="maintenance">سرویس و نگهداری</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">توضیحات</label>
              <textarea
                required
                rows={4}
                value={form.description}
                onChange={e => handleChange('description', e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm resize-none"
                placeholder="توضیحات بیشتر درباره مشکل یا درخواست..."
                disabled={isSubmitting}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-l from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-400 disabled:to-slate-400 text-white px-6 py-3.5 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 flex items-center justify-center gap-2"
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
    </div>
  );
};

export default ServicesPage;
