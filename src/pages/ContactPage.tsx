import React, { useState } from 'react';
import { Phone, MapPin, Clock, Mail, Send, CheckCircle2, MessageCircle } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmitted(true);
    setIsSubmitting(false);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-12">
        <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">ارتباط با ما</span>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">تماس با ما</h1>
        <p className="text-slate-500 mt-3">ما آماده پاسخگویی به سوالات و نیازهای شما هستیم</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-black text-slate-900 mb-6">اطلاعات تماس</h3>
            <ul className="space-y-5">
              {[
                { icon: <Phone size={18} />, label: 'تلفن تماس', value: '۰۲۱-۱۲۳۴۵۶۷۸', color: 'bg-blue-50 text-blue-600' },
                { icon: <MapPin size={18} />, label: 'آدرس', value: 'تهران، خیابان آزادی، پلاک ۱۲۰', color: 'bg-emerald-50 text-emerald-600' },
                { icon: <Clock size={18} />, label: 'ساعات کاری', value: 'شنبه تا پنجشنبه ۹ تا ۱۸', color: 'bg-orange-50 text-orange-600' },
                { icon: <Mail size={18} />, label: 'ایمیل', value: 'info@armand-elevator.ir', color: 'bg-purple-50 text-purple-600' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">{item.label}</p>
                    <p className="text-sm font-medium text-slate-800">{item.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Map placeholder */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl h-48 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-30" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59,130,246,0.3) 1px, transparent 0)', backgroundSize: '20px 20px'}}></div>
              <div className="text-center relative z-10">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-500/30">
                  <MapPin size={24} className="text-white" />
                </div>
                <p className="text-sm font-bold text-slate-700">تهران، خیابان آزادی</p>
                <p className="text-xs text-slate-500 mt-1">پلاک ۱۲۰</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-7 md:p-9">
            <div className="mb-7">
              <h3 className="text-2xl font-black text-slate-900">ارسال پیام</h3>
              <p className="text-slate-500 text-sm mt-2">پیام خود را برای ما ارسال کنید</p>
            </div>

            {submitted && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 flex items-center gap-3 animate-scale-in">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-bold text-emerald-800 text-sm">پیام شما با موفقیت ارسال شد</p>
                  <p className="text-emerald-600 text-xs mt-0.5">به زودی پاسخگو خواهیم بود</p>
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
                    placeholder="نام شما"
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
                <label className="block text-sm font-bold text-slate-700 mb-2">ایمیل</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => handleChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                  placeholder="example@email.com"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">موضوع</label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={e => handleChange('subject', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                  placeholder="موضوع پیام"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">متن پیام</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => handleChange('message', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm resize-none"
                  placeholder="پیام خود را بنویسید..."
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
                    <span>ارسال پیام</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
