import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ArrowLeft, Wrench, Shield, Truck, Star, Phone, CheckCircle } from 'lucide-react';

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
      <section className="relative bg-gradient-to-bl from-blue-700 via-blue-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              فروشگاه لوازم یدکی آسانسور آرمند
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-8">
              ارائه‌دهنده انواع لوازم یدکی آسانسور با کیفیت تضمینی و خدمات نصب و تعمیر توسط متخصصین مجرب
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="bg-white hover:bg-blue-50 text-blue-700 px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
                <span>مشاهده محصولات</span>
                <ArrowLeft size={18} />
              </Link>
              <Link to="/services" className="border-2 border-white hover:bg-white/10 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200">
                خدمات نصب و تعمیر
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Truck size={28} />, title: 'ارسال سریع', desc: 'ارسال به سراسر کشور' },
              { icon: <Shield size={28} />, title: 'ضمانت اصالت', desc: 'تمامی محصولات اورجینال' },
              { icon: <Wrench size={28} />, title: 'نصب حرفه‌ای', desc: 'تیم متخصص و مجرب' },
              { icon: <Phone size={28} />, title: 'پشتیبانی ۲۴/۷', desc: 'مشاوره رایگان تلفنی' },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50 transition-colors">
                <div className="text-blue-600">{feature.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-800">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">محصولات پرفروش</h2>
              <p className="text-gray-500 mt-2">بهترین و پرفروش‌ترین محصولات فروشگاه</p>
            </div>
            <Link to="/products" className="hidden sm:flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium">
              <span>مشاهده همه</span>
              <ArrowLeft size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="h-48 bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                  {product.image}
                </div>
                <div className="p-5">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{product.category}</span>
                  <h3 className="font-bold text-gray-800 mt-3 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-600">{formatPrice(product.price)}</span>
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        addedToCart === product.id
                          ? 'bg-green-500 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {addedToCart === product.id ? '✓ اضافه شد' : 'افزودن به سبد'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link to="/products" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg inline-flex items-center gap-2">
              <span>مشاهده همه محصولات</span>
              <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">خدمات ما</h2>
            <p className="text-gray-500 mt-2">خدمات حرفه‌ای نصب، تعمیر و نگهداری آسانسور</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🏗️',
                title: 'نصب آسانسور',
                desc: 'نصب انواع آسانسور مسکونی و تجاری با رعایت استانداردهای روز و استفاده از بهترین تجهیزات',
                features: ['آسانسور هیدرولیک', 'آسانسور کششی', 'آسانسور پانوراما']
              },
              {
                icon: '🔧',
                title: 'تعمیر و سرویس',
                desc: 'تعمیرات تخصصی و سرویس دوره‌ای آسانسور توسط تکنسین‌های مجرب و دارای گواهینامه',
                features: ['سرویس ماهانه', 'تعمیرات فوری', 'تعویض قطعات']
              },
              {
                icon: '🔄',
                title: 'بازسازی و نوسازی',
                desc: 'بازسازی و نوسازی آسانسورهای قدیمی با ارتقاء سیستم ایمنی و عملکرد',
                features: ['ارتقاء ایمنی', 'تعویض موتور', 'نوسازی کابین']
              }
            ].map((service, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4 leading-7">{service.desc}</p>
                <ul className="space-y-2">
                  {service.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/services" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg inline-flex items-center gap-2">
              <span>درخواست خدمات</span>
              <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">نظرات مشتریان</h2>
            <p className="text-gray-500 mt-2">رضایت مشتریان افتخار ماست</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'مهندس احمدی', role: 'مدیر ساختمان', text: 'کیفیت محصولات عالی بود و نصب آسانسور هم بسیار حرفه‌ای انجام شد. کاملاً راضی هستم.' },
              { name: 'خانم رضایی', role: 'صاحب‌خانه', text: 'تعمیر آسانسور ما خیلی سریع و با کیفیت انجام شد. قیمت‌ها هم منصفانه بود.' },
              { name: 'مهندس کریمی', role: 'پیمانکار ساختمان', text: 'همکاری ما با فروشگاه آرمند چند ساله است. همیشه محصولات اورجینال و قیمت مناسب ارائه می‌دهند.' },
            ].map((review, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 leading-7">"{review.text}"</p>
                <div>
                  <p className="font-bold text-gray-800">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">نیاز به مشاوره رایگان دارید؟</h2>
          <p className="text-blue-100 mb-8 text-lg">تیم متخصص ما آماده پاسخگویی به سوالات شماست</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:02112345678" className="bg-white text-blue-700 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors">
              📞 ۰۲۱-۱۲۳۴۵۶۷۸
            </a>
            <Link to="/contact" className="border-2 border-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors">
              فرم تماس
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
