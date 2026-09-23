import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, Filter, ShoppingCart } from 'lucide-react';
import { categories } from '../data/store';

const ProductsPage: React.FC = () => {
  const { products, addToCart } = useStore();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  let filtered = products.filter(p => {
    const matchSearch = p.name.includes(search) || p.description.includes(search);
    const matchCategory = !selectedCategory || p.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  if (sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  else if (sortBy === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name, 'fa'));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">محصولات فروشگاه</h1>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="جستجوی محصول..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pr-10"
            />
          </div>
          <div className="relative">
            <Filter size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="input-field pr-10 appearance-none"
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
            className="input-field appearance-none"
          >
            <option value="default">مرتب‌سازی پیش‌فرض</option>
            <option value="price-asc">ارزان‌ترین</option>
            <option value="price-desc">گران‌ترین</option>
            <option value="name">نام محصول</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <p className="text-sm text-gray-500 mb-4">{filtered.length} محصول یافت شد</p>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-500 text-lg">محصولی یافت نشد</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(product => (
            <div key={product.id} className="card group">
              <div className="h-40 bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300">
                {product.image}
              </div>
              <div className="p-4">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{product.category}</span>
                <h3 className="font-bold text-gray-800 mt-2 mb-1 text-sm">{product.name}</h3>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-600 text-sm">{formatPrice(product.price)}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                    title="افزودن به سبد خرید"
                  >
                    <ShoppingCart size={16} />
                  </button>
                </div>
                {product.stock < 10 && (
                  <p className="text-xs text-orange-500 mt-2">فقط {product.stock} عدد باقی‌مانده</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
