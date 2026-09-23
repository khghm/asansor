import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { 
  ArrowLeft, Wrench, Shield, Truck, Phone, CheckCircle2, 
  Star, ShoppingCart, Zap, Award, Users, ChevronLeft,
  Building2, Cog, RefreshCw, Headphones, MessageCircle
} from 'lucide-react';

const HomePage: React.FC = () => {
  const { products, addToCart } = useStore();
  const featuredProducts = products.filter(p => p.featured).slice(0, 6);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart(product);
      setAddedToCart(productId);
      setTimeout(() => setAddedToCart(null), 2000);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-bl from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500 rounded-full blur-[100px]"></div>
        </div>
        <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 animate-fade-in">
              <Zap size={14} className="text-yellow-400" />
              <span className="text-sm font-medium">بیش از ۱۵ سال تجربه در صنعت آسانسور</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight animate-fade-in-up">
              فروشگاه لوازم یدکی
              <br />
              <span className="bg-gradient-to-l from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                آسانسور آرمند
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100/80 mb-10 leading-8 max-w-2xl animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              ارائه‌دهنده انواع لوازم یدکی آسانسور با کیفیت تضمینی و خدمات نصب و تعمیر توسط متخصصین مجرب با بیش از یک دهه تجربه
            </p>
            
            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <Link 
                to="/products" 
                className="group bg-white text-blue-700 px-7 py-3.5 rounded-xl font-bold transition-all duration-300 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105 flex items-center gap-2"
              >
                <span>مشاهده محصولات</span>
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/services" 
                className="group border-2 border-white/30 hover:border-white/60 hover:bg-white/10 backdrop-blur-sm text-white px-7 py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center gap-2"
              >
                <Wrench size={18} />
                <span>خدمات نصب و تعمیر</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-16 max-w-lg animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              {[
                { value: '+۱۵', label: 'سال تجربه' },
                { value: '+۵۰۰۰', label: 'مشتری راضی' },
                { value: '+۲۰۰', label: 'محصول متنوع' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl md:text-3xl font-black text-white">{stat.value}</p>
                  <p className="text-xs text-blue-200/70 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              { icon: <Truck size={24} />, title: 'ارسال سریع', desc: 'به سراسر کشور', color: 'from-blue-500 to-blue-600' },
              { icon: <Shield size={24} />, title: 'ضمانت اصالت', desc: 'محصولات اورجینال', color: 'from-emerald-500 to-emerald-600' },
              { icon: <Wrench size={24} />, title: 'نصب حرفه‌ای', desc: 'تیم متخصص', color: 'from-orange-500 to-orange-600' },
              { icon: <Headphones size={24} />, title: 'پشتیبانی ۲۴/۷', desc: 'مشاوره رایگان', color: 'from-purple-500 to-purple-600' },
            ].map((feature, i) => (
              <div key={i} className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm md:text-base">{feature.title}</h3>
                  <p className="text-xs text-slate-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">محصولات ویژه</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">پرفروش‌ترین محصولات</h2>
              <p className="text-slate-500 mt-2">بهترین و پرفروش‌ترین محصولات فروشگاه</p>
            </div>
            <Link 
              to="/products" 
              className="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold group"
            >
              <span>مشاهده همه</span>
              <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden card-hover border border-slate-100"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="relative h-56 bg-gradient-to-br from-slate-100 to-slate-50 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover img-zoom"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-bold rounded-full shadow-sm">
                      {product.category}
                    </span>
                  </div>
                  {product.stock < 10 && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                        موجودی محدود
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-800 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2 leading-6">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                      <p className="text-xs text-slate-400">قیمت</p>
                      <p className="font-black text-blue-600 text-lg">{formatPrice(product.price)}</p>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                        addedToCart === product.id
                          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50'
                      }`}
                    >
                      {addedToCart === product.id ? (
                        <>
                          <CheckCircle2 size={16} />
                          <span>اضافه شد</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={16} />
                          <span>افزودن</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 md:hidden">
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30"
            >
              <span>مشاهده همه محصولات</span>
              <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">خدمات تخصصی</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">خدمات حرفه‌ای ما</h2>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
              خدمات نصب، تعمیر و نگهداری آسانسور با بالاترین کیفیت و توسط متخصصین مجرب
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Building2 size={28} />,
                title: 'نصب آسانسور',
                desc: 'نصب انواع آسانسور مسکونی و تجاری با رعایت استانداردهای روز و استفاده از بهترین تجهیزات',
                features: ['آسانسور هیدرولیک', 'آسانسور کششی', 'آسانسور پانوراما'],
                color: 'from-blue-500 to-indigo-600',
                bgColor: 'bg-blue-50',
                textColor: 'text-blue-600'
              },
              {
                icon: <Cog size={28} />,
                title: 'تعمیر و سرویس',
                desc: 'تعمیرات تخصصی و سرویس دوره‌ای آسانسور توسط تکنسین‌های مجرب و دارای گواهینامه',
                features: ['سرویس ماهانه', 'تعمیرات فوری', 'تعویض قطعات'],
                color: 'from-orange-500 to-red-600',
                bgColor: 'bg-orange-50',
                textColor: 'text-orange-600'
              },
              {
                icon: <RefreshCw size={28} />,
                title: 'بازسازی و نوسازی',
                desc: 'بازسازی و نوسازی آسانسورهای قدیمی با ارتقاء سیستم ایمنی و عملکرد',
                features: ['ارتقاء ایمنی', 'تعویض موتور', 'نوسازی کابین'],
                color: 'from-emerald-500 to-teal-600',
                bgColor: 'bg-emerald-50',
                textColor: 'text-emerald-600'
              }
            ].map((service, i) => (
              <div 
                key={i} 
                className="group relative bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 card-hover overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-5 leading-7 text-sm">{service.desc}</p>
                <ul className="space-y-2.5">
                  {service.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 size={16} className={service.textColor} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/services" 
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-xl shadow-slate-900/20 hover:scale-105"
            >
              <span>درخواست خدمات</span>
              <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">نظرات مشتریان</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">رضایت مشتریان، افتخار ماست</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'مهندس احمدی', role: 'مدیر ساختمان', text: 'کیفیت محصولات عالی بود و نصب آسانسور هم بسیار حرفه‌ای انجام شد. کاملاً راضی هستم.' },
              { name: 'خانم رضایی', role: 'صاحب‌خانه', text: 'تعمیر آسانسور ما خیلی سریع و با کیفیت انجام شد. قیمت‌ها هم منصفانه بود.' },
              { name: 'مهندس کریمی', role: 'پیمانکار ساختمان', text: 'همکاری ما با فروشگاه آرمند چند ساله است. همیشه محصولات اورجینال و قیمت مناسب ارائه می‌دهند.' },
            ].map((review, i) => (
              <div 
                key={i} 
                className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 card-hover"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 mb-6 leading-7 text-sm">"{review.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{review.name}</p>
                    <p className="text-xs text-slate-500">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white rounded-full blur-[100px]"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-black mb-4">نیاز به مشاوره رایگان دارید؟</h2>
          <p className="text-blue-100 mb-10 text-lg">تیم متخصص ما آماده پاسخگویی به سوالات شماست</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="tel:02112345678" 
              className="group bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-xl flex items-center gap-3"
            >
              <Phone size={20} />
              <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
            </a>
            <Link 
              to="/contact" 
              className="group border-2 border-white/40 hover:border-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-3"
            >
              <MessageCircle size={20} />
              <span>فرم تماس</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
