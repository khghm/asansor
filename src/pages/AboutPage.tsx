import React from 'react';
import { Award, Users, Calendar, CheckCircle } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">درباره فروشگاه آرمند</h1>

      {/* About Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">داستان ما</h2>
          <p className="text-gray-600 leading-8 mb-4">
            فروشگاه لوازم یدکی آسانسور آرمند با بیش از ۱۵ سال سابقه درخشان در صنعت آسانسور، یکی از معتبرترین مراکز فروش لوازم یدکی آسانسور و ارائه خدمات نصب و تعمیر در ایران است.
          </p>
          <p className="text-gray-600 leading-8 mb-4">
            ما با تیمی متشکل از مهندسان و تکنسین‌های مجرب، همواره در تلاشیم تا بهترین محصولات و خدمات را با قیمت مناسب و کیفیت تضمین‌شده به مشتریان عزیز ارائه دهیم.
          </p>
          <p className="text-gray-600 leading-8">
            تمامی محصولات ما دارای گارانتی و ضمانت اصالت بوده و خدمات پس از فروش حرفه‌ای ارائه می‌شود.
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 md:p-8 text-white">
          <h2 className="text-xl font-bold mb-6">چرا آرمند؟</h2>
          <ul className="space-y-4">
            {[
              'بیش از ۱۵ سال تجربه در صنعت آسانسور',
              'ارائه محصولات اورجینال با ضمانت اصالت',
              'تیم فنی مجرب و دارای گواهینامه',
              'قیمت‌های رقابتی و منصفانه',
              'خدمات پس از فروش حرفه‌ای',
              'مشاوره رایگان تخصصی',
              'ارسال سریع به سراسر کشور',
              'گارانتی معتبر محصولات'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <CheckCircle size={18} className="text-blue-200 flex-shrink-0" />
                <span className="text-blue-50">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { icon: <Calendar size={28} />, value: '+۱۵', label: 'سال تجربه' },
          { icon: <Users size={28} />, value: '+۵۰۰۰', label: 'مشتری راضی' },
          { icon: <Award size={28} />, value: '+۲۰۰', label: 'محصول متنوع' },
          { icon: <CheckCircle size={28} />, value: '+۱۰۰۰', label: 'پروژه موفق' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-blue-600 flex justify-center mb-3">{stat.icon}</div>
            <p className="text-2xl md:text-3xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Team */}
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">تیم ما</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'مهندس آرمند', role: 'مدیرعامل و بنیان‌گذار', desc: '۲۰ سال تجربه در صنعت آسانسور' },
            { name: 'مهندس رضوی', role: 'مدیر فنی', desc: 'متخصص سیستم‌های الکترونیکی آسانسور' },
            { name: 'مهندس کاظمی', role: 'سرپرست نصب', desc: '۱۵ سال تجربه در نصب و راه‌اندازی' },
          ].map((member, i) => (
            <div key={i} className="text-center p-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👤</span>
              </div>
              <h3 className="font-bold text-gray-800">{member.name}</h3>
              <p className="text-sm text-blue-600 mb-2">{member.role}</p>
              <p className="text-sm text-gray-500">{member.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
