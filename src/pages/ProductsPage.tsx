import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, Filter, ShoppingCart, Check, Package } from 'lucide-react';
import { categories } from '../data/store';

const ProductsPage: React.FC = () => {
  const { products, addToCart } = useStore();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('default');
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

  let filtered = products.filter(p => {
    const matchSearch = p.name.includes(search) || p.description.includes(search);
    const matchCategory = !selectedCategory || p.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  if (sortBy === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sortBy === 'name') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name, 'fa'));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">فروشگاه</span>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">محصولات فروشگاه</h1>
        <p className="text-slate-500 mt-2">تمامی لوازم یدکی آسانسور با ضمانت اصالت و کیفیت</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="جستجوی محصول..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-4 py-3 pr-11 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
            />
          </div>
          <div className="relative">
            <Filter size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 pr-11 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none text-sm bg-white"
            >
              <option value="">همه دسته‌بندی‌ها</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none text-sm bg-white"
          >
            <option value="default">مرتب‌سازی پیش‌فرض</option>
            <option value="price-asc">ارزان‌ترین</option>
            <option value="price-desc">گران‌ترین</option>
            <option value="name">نام محصول</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500 font-medium">
          <span className="text-slate-900 font-bold">{filtered.length}</span> محصول یافت شد
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
          <Package size={64} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500 text-lg font-medium">محصولی یافت نشد</p>
          <p className="text-slate-400 text-sm mt-2">لطفاً فیلترها را تغییر دهید</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product, index) => (
            <div 
              key={product.id} 
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-slate-100 card-hover"
            >
              <div className="relative h-52 bg-gradient-to-br from-slate-100 to-slate-50 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover img-zoom"
                />
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-bold rounded-full shadow-sm">
                    {product.category}
                  </span>
                </div>
                {product.stock < 10 && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                      موجودی محدود
                    </span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-6">
                  {product.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">قیمت</p>
                    <p className="font-black text-blue-600">{formatPrice(product.price)}</p>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className={`p-2.5 rounded-xl transition-all duration-300 ${
                      addedToCart === product.id
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50'
                    }`}
                    title="افزودن به سبد خرید"
                  >
                    {addedToCart === product.id ? <Check size={16} /> : <ShoppingCart size={16} />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
