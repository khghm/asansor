import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { 
  ChevronLeft, ChevronRight, ArrowLeft, Wrench, Zap, 
  ShoppingCart, CheckCircle2, Eye
} from 'lucide-react';

const HeroCarousel: React.FC = () => {
  const { products, addToCart } = useStore();
  const featuredProducts = products.filter(p => p.featured);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredProducts.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart(product);
      setAddedToCart(productId);
      setTimeout(() => setAddedToCart(null), 2000);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  if (featuredProducts.length === 0) return null;

  const currentProduct = featuredProducts[currentIndex];

  return (
    <section className="relative bg-gradient-to-bl from-slate-900 via-orange-950 to-amber-950 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500 rounded-full blur-[100px]"></div>
      </div>
      <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
        {/* Top Badge */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <Zap size={14} className="text-yellow-400" />
            <span className="text-xs sm:text-sm font-medium">مهندسی سعید آرمند - بیش از ۱۵ سال تجربه</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-right order-2 lg:order-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 leading-tight">
              فروشگاه لوازم یدکی
              <br />
              <span className="bg-gradient-to-l from-orange-300 via-amber-300 to-orange-400 bg-clip-text text-transparent">
                آسانسور آرمند
              </span>
            </h1>
            
            <p className="text-sm sm:text-base lg:text-lg text-orange-100/80 mb-4 sm:mb-6 leading-6 sm:leading-7 max-w-xl mx-auto lg:mx-0 lg:mr-0">
              ارائه‌دهنده انواع لوازم یدکی آسانسور با کیفیت تضمینی و خدمات نصب و تعمیر توسط متخصصین مجرب
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6 max-w-md mx-auto lg:mx-0 lg:mr-0">
              {[
                { value: '+۱۵', label: 'سال تجربه' },
                { value: '+۵۰۰۰', label: 'مشتری راضی' },
                { value: '+۲۲', label: 'محصول' },
              ].map((stat, i) => (
                <div key={i} className="text-center bg-white/5 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-white/10">
                  <p className="text-lg sm:text-xl lg:text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-orange-200/70 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
              <Link 
                to="/products" 
                className="group bg-gradient-to-l from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 flex items-center gap-2 relative overflow-hidden"
              >
                <span className="relative z-10">مشاهده محصولات</span>
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform relative z-10" />
                <div className="absolute inset-0 shimmer"></div>
              </Link>
              <Link 
                to="/services" 
                className="group border-2 border-white/30 hover:border-white/60 hover:bg-white/10 backdrop-blur-sm text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center gap-2"
              >
                <Wrench size={16} />
                <span>خدمات</span>
              </Link>
            </div>
          </div>

          {/* Right: Product Carousel */}
          <div className="order-1 lg:order-2">
            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
              {/* Product Image */}
              <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
                <img 
                  src={currentProduct.image} 
                  alt={currentProduct.name}
                  className="w-full h-full object-cover transition-all duration-700"
                  key={currentProduct.id}
                />
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                  <span className="px-2 sm:px-3 py-1 bg-orange-500/90 backdrop-blur-sm text-white text-[10px] sm:text-xs font-bold rounded-full shadow-sm">
                    {currentProduct.category}
                  </span>
                </div>
                {currentProduct.stock < 10 && (
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                    <span className="px-2 sm:px-3 py-1 bg-red-500 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-lg">
                      موجودی محدود
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-3 sm:p-4 lg:p-5">
                <h3 className="text-base sm:text-lg lg:text-xl font-black text-white mb-1 sm:mb-2 line-clamp-1">
                  {currentProduct.name}
                </h3>
                <p className="text-orange-100/70 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-5 sm:leading-6">
                  {currentProduct.description}
                </p>
                
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[10px] sm:text-xs text-orange-200/60">قیمت</p>
                    <p className="text-base sm:text-lg lg:text-xl font-black text-orange-300">{formatPrice(currentProduct.price)}</p>
                  </div>
                  <div className="flex gap-1.5 sm:gap-2">
                    <Link 
                      to={`/product/${currentProduct.id}`}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 sm:p-2.5 rounded-xl transition-all border border-white/20"
                      title="مشاهده جزییات"
                    >
                      <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </Link>
                    <button
                      onClick={() => handleAddToCart(currentProduct.id)}
                      className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-1.5 sm:gap-2 ${
                        addedToCart === currentProduct.id
                          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                          : 'bg-gradient-to-l from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-lg shadow-orange-500/30'
                      }`}
                    >
                      {addedToCart === currentProduct.id ? (
                        <>
                          <CheckCircle2 size={14} className="sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">اضافه شد</span>
                          <span className="sm:hidden">✓</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={14} className="sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">افزودن</span>
                          <span className="sm:hidden">🛒</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <button
                onClick={prevSlide}
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all border border-white/30"
                aria-label="قبلی"
              >
                <ChevronRight size={18} className="sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all border border-white/30"
                aria-label="بعدی"
              >
                <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-1.5">
                {featuredProducts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-1.5 sm:h-2 rounded-full transition-all ${
                      index === currentIndex 
                        ? 'w-5 sm:w-6 bg-orange-400' 
                        : 'w-1.5 sm:w-2 bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`اسلاید ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
