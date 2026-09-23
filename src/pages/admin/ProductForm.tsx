import React, { useState, useEffect } from 'react';
import { Product } from '../../data/store';
import { X, Package } from 'lucide-react';

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
    image: '',
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Package className="text-white" size={20} />
            </div>
            <h3 className="text-lg font-black text-slate-900">
              {product ? 'ویرایش محصول' : 'افزودن محصول جدید'}
            </h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">نام محصول</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
              placeholder="نام محصول را وارد کنید"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">توضیحات</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm resize-none"
              placeholder="توضیحات محصول"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">قیمت (تومان)</label>
              <input
                type="number"
                required
                min="0"
                value={form.price}
                onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">موجودی</label>
              <input
                type="number"
                required
                min="0"
                value={form.stock}
                onChange={e => setForm({ ...form, stock: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                placeholder="0"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">دسته‌بندی</label>
            <select
              required
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm appearance-none bg-white"
            >
              <option value="">انتخاب دسته‌بندی</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">آدرس تصویر (URL)</label>
            <input
              type="url"
              value={form.image}
              onChange={e => setForm({ ...form, image: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={e => setForm({ ...form, featured: e.target.checked })}
              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              id="featured"
            />
            <label htmlFor="featured" className="text-sm font-medium text-slate-700">محصول ویژه (نمایش در صفحه اصلی)</label>
          </div>
          
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-l from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 shadow-lg shadow-blue-500/30"
            >
              {product ? 'بروزرسانی' : 'افزودن محصول'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-medium transition-all"
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
