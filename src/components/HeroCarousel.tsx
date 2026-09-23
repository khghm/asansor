import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroCarousel: React.FC = () => {
  const { products } = useStore();
  const featuredProducts = products.filter(p => p.featured);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredProducts.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  if (featuredProducts.length === 0) return null;

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-12">
      <div className="relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(${currentIndex * 100}%)` }}
        >
          {featuredProducts.map((product, index) => (
            <div key={product.id} className="w-full flex-shrink-0">
              <div className="flex flex-col md:flex-row items-center p-8 md:p-12">
                <div className="w-full md:w-1/2 mb-6 md:mb-0">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-xl"
                  />
                </div>
                <div className="w-full md:w-1/2 md:pr-8 text-white">
                  <span className="inline-block px-4 py-1 bg-orange-500/20 border border-orange-400/30 text-orange-200 text-xs font-bold rounded-full mb-4">
                    {product.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black mb-4">{product.name}</h3>
                  <p className="text-blue-100/80 mb-6 leading-7 line-clamp-3">{product.description}</p>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-xs text-blue-200/60">قیمت</p>
                      <p className="text-2xl font-black text-orange-300">{formatPrice(product.price)}</p>
                    </div>
                  </div>
                  <Link 
                    to={`/product/${product.id}`}
                    className="inline-flex items-center gap-2 bg-gradient-to-l from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-orange-500/30 relative overflow-hidden"
                  >
                    <span className="relative z-10">مشاهده جزییات</span>
                    <div className="absolute inset-0 shimmer"></div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all border border-white/30"
        >
          <ChevronRight size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all border border-white/30"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {featuredProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'w-8 bg-orange-400' 
                  : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
