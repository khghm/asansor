import React from 'react';
import { Award, Users, Calendar, CheckCircle2, Building2, Target, Heart } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-12">
        <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">درباره ما</span>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">فروشگاه آسانسور آرمند</h1>
        <p className="text-slate-500 mt-3 max-w-2xl leading-7">
          با بیش از ۱۵ سال تجربه در صنعت آسانسور، افتخار خدمت‌رسانی به هزاران مشتری در سراسر ایران را داریم
        </p>
      </div>

      {/* About Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-7 md:p-9">
          <h2 className="text-2xl font-black text-slate-900 mb-5">داستان ما</h2>
          <div className="space-y-4 text-slate-600 leading-8 text-sm">
            <p>
              فروشگاه لوازم یدکی آسانسور آرمند با بیش از ۱۵ سال سابقه درخشان در صنعت آسانسور، یکی از معتبرترین مراکز فروش لوازم یدکی آسانسور و ارائه خدمات نصب و تعمیر در ایران است.
            </p>
            <p>
              ما با تیمی متشکل از مهندسان و تکنسین‌های مجرب، همواره در تلاشیم تا بهترین محصولات و خدمات را با قیمت مناسب و کیفیت تضمین‌شده به مشتریان عزیز ارائه دهیم.
            </p>
            <p>
              تمامی محصولات ما دارای گارانتی و ضمانت اصالت بوده و خدمات پس از فروش حرفه‌ای ارائه می‌شود.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-7 md:p-9 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-[80px]"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-black mb-7">چرا آرمند؟</h2>
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
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={14} className="text-white" />
                  </div>
                  <span className="text-blue-50 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { icon: <Calendar size={24} />, value: '+۱۵', label: 'سال تجربه', color: 'from-blue-500 to-blue-600' },
          { icon: <Users size={24} />, value: '+۵۰۰۰', label: 'مشتری راضی', color: 'from-emerald-500 to-emerald-600' },
          { icon: <Award size={24} />, value: '+۲۰۰', label: 'محصول متنوع', color: 'from-orange-500 to-orange-600' },
          { icon: <CheckCircle2 size={24} />, value: '+۱۰۰۰', label: 'پروژه موفق', color: 'from-purple-500 to-purple-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 text-center card-hover">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mx-auto mb-4 shadow-lg`}>
              {stat.icon}
            </div>
            <p className="text-3xl font-black text-slate-900">{stat.value}</p>
            <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Values */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-7 md:p-9 mb-16">
        <h2 className="text-2xl font-black text-slate-900 mb-8 text-center">ارزش‌های ما</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Target size={28} />, title: 'کیفیت', desc: 'ارائه محصولات با بالاترین کیفیت و استانداردهای بین‌المللی', color: 'from-blue-500 to-indigo-600' },
            { icon: <Heart size={28} />, title: 'مشتری‌مداری', desc: 'رضایت مشتری اولویت اصلی ماست و همواره در تلاش برای بهبود خدمات', color: 'from-rose-500 to-pink-600' },
            { icon: <Building2 size={28} />, title: 'تخصص', desc: 'تیم ما متشکل از متخصصین با تجربه و دانش فنی بالا در صنعت آسانسور', color: 'from-emerald-500 to-teal-600' },
          ].map((value, i) => (
            <div key={i} className="text-center p-6 rounded-xl hover:bg-slate-50 transition-colors">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center text-white mx-auto mb-4 shadow-lg`}>
                {value.icon}
              </div>
              <h3 className="font-black text-slate-900 text-lg mb-2">{value.title}</h3>
              <p className="text-sm text-slate-600 leading-7">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-7 md:p-9">
        <h2 className="text-2xl font-black text-slate-900 mb-8 text-center">تیم مدیریت</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'مهندس آرمند', role: 'مدیرعامل و بنیان‌گذار', desc: '۲۰ سال تجربه در صنعت آسانسور' },
            { name: 'مهندس رضوی', role: 'مدیر فنی', desc: 'متخصص سیستم‌های الکترونیکی آسانسور' },
            { name: 'مهندس کاظمی', role: 'سرپرست نصب', desc: '۱۵ سال تجربه در نصب و راه‌اندازی' },
          ].map((member, i) => (
            <div key={i} className="text-center p-6 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
                <Users size={32} className="text-white" />
              </div>
              <h3 className="font-black text-slate-900">{member.name}</h3>
              <p className="text-sm text-blue-600 font-medium mb-2">{member.role}</p>
              <p className="text-sm text-slate-500">{member.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
