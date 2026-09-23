import React, { useState } from 'react';
import { Phone, MapPin, Clock, Mail, Send, CheckCircle } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">تماس با ما</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-bold text-gray-800 mb-4">اطلاعات تماس</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-medium text-gray-800">تلفن</p>
                  <p className="text-gray-600 text-sm">۰۲۱-۱۲۳۴۵۶۷۸</p>
                  <p className="text-gray-600 text-sm">۰۹۱۲-۱۲۳۴۵۶۷</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-medium text-gray-800">آدرس</p>
                  <p className="text-gray-600 text-sm">تهران، خیابان آزادی، بین نواب و بهبودی، پلاک ۱۲۰</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-medium text-gray-800">ساعات کاری</p>
                  <p className="text-gray-600 text-sm">شنبه تا چهارشنبه: ۹ تا ۱۸</p>
                  <p className="text-gray-600 text-sm">پنجشنبه: ۹ تا ۱۳</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-medium text-gray-800">ایمیل</p>
                  <p className="text-gray-600 text-sm">info@armand-elevator.ir</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Map placeholder */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg h-48 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={32} className="text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-blue-700">تهران، خیابان آزادی</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <h3 className="font-bold text-gray-800 mb-6 text-lg">ارسال پیام</h3>

            {submitted && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-2 animate-fade-in">
                <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                <span className="text-green-700">پیام شما با موفقیت ارسال شد. به زودی پاسخگو خواهیم بود.</span>
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
                    placeholder="نام شما"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => handleChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="example@email.com"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">موضوع *</label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={e => handleChange('subject', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="موضوع پیام"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">متن پیام *</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => handleChange('message', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="پیام خود را بنویسید..."
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
