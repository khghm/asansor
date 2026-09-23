import React, { useState, useEffect } from 'react';
import { Product } from '../../data/store';
import { X } from 'lucide-react';

interface ProductFormProps {
  product?: Product | null;
  onSave: (product: Product) => void;
  onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSave, onClose }) => {
  const [form, setForm] = useState<Product>({
    id: '',
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '📦',
    stock: 0,
    featured: false
  });

  useEffect(() => {
    if (product) {
      setForm(product);
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productToSave: Product = {
      ...form,
      id: form.id || String(Date.now()),
      price: Number(form.price),
      stock: Number(form.stock)
    };
    onSave(productToSave);
    onClose();
  };

  const categories = [
    'موتور آسانسور',
    'تابلو فرمان',
    'ریلس و ریل‌براکت',
    'سیم بکسل',
    'درب آسانسور',
    'کابین و دکوراسیون',
    'قطعات الکتریکی',
    'قطعات مکانیکی',
    'سیستم ایمنی',
    'لوازم جانبی'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
          <h3 className="text-lg font-bold">{product ? 'ویرایش محصول' : 'افزودن محصول جدید'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">نام محصول *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="نام محصول را وارد کنید"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">توضیحات *</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="توضیحات محصول"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">قیمت (تومان) *</label>
              <input
                type="number"
                required
                min="0"
                value={form.price}
                onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">موجودی *</label>
              <input
                type="number"
                required
                min="0"
                value={form.stock}
                onChange={e => setForm({ ...form, stock: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="0"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">دسته‌بندی *</label>
            <select
              required
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              <option value="">انتخاب دسته‌بندی</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">آیکون (ایموجی)</label>
            <input
              type="text"
              value={form.image}
              onChange={e => setForm({ ...form, image: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="📦"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={e => setForm({ ...form, featured: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              id="featured"
            />
            <label htmlFor="featured" className="text-sm text-gray-700">محصول ویژه (نمایش در صفحه اصلی)</label>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {product ? 'بروزرسانی' : 'افزودن محصول'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-all duration-200"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
