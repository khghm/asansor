import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../../data/store';
import { X, Package, Upload, ImageIcon, Trash2 } from 'lucide-react';

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

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
    featured: false,
    lowStockThreshold: undefined
  });

  useEffect(() => {
    if (product) {
      setForm(product);
    }
  }, [product]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageError, setImageError] = useState<string>('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // اجازه می‌دهیم دوباره همان فایل انتخاب شود
    e.target.value = '';
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setImageError('فقط فایل‌های تصویری مجاز هستند (jpg, png, webp, ...)');
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setImageError('حجم تصویر باید کمتر از ۲ مگابایت باشد');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageError('');
      setForm(prev => ({ ...prev, image: String(reader.result) }));
    };
    reader.onerror = () => {
      setImageError('خواندن فایل ناموفق بود، لطفاً دوباره تلاش کنید');
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImageError('');
    setForm(prev => ({ ...prev, image: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productToSave: Product = {
      ...form,
      id: form.id || String(Date.now()),
      price: Number(form.price),
      stock: Number(form.stock),
      lowStockThreshold: form.lowStockThreshold === undefined || isNaN(Number(form.lowStockThreshold))
        ? undefined
        : Number(form.lowStockThreshold)
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
            <label className="block text-sm font-bold text-slate-700 mb-2">آستانه هشدار موجودی کم (اختیاری)</label>
            <input
              type="number"
              min="0"
              value={form.lowStockThreshold ?? ''}
              onChange={e => setForm({ ...form, lowStockThreshold: e.target.value === '' ? undefined : Number(e.target.value) })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
              placeholder="خالی = استفاده از آستانه سراسری تنظیمات سایت"
            />
            <p className="text-xs text-slate-400 mt-1.5">
              اگر این عدد پر شود، فقط برای همین محصول اعمال می‌شود؛ در غیر این صورت آستانه سراسری از «تنظیمات سایت» استفاده می‌گردد.
            </p>
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
            <label className="block text-sm font-bold text-slate-700 mb-2">تصویر محصول</label>

            {form.image ? (
              <div className="relative w-full h-44 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 mb-3">
                <img
                  src={form.image}
                  alt="پیش‌نمایش تصویر محصول"
                  className="w-full h-full object-contain"
                />
                <button
                  type="button"
                  onClick={clearImage}
                  title="حذف تصویر"
                  className="absolute top-2 left-2 p-2 rounded-lg bg-white/90 text-red-600 shadow hover:bg-red-50 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : (
              <div className="w-full h-28 rounded-xl border border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center gap-1 text-slate-400 mb-3">
                <ImageIcon size={24} />
                <span className="text-xs font-medium">هنوز تصویری انتخاب نشده است</span>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              <Upload size={18} />
              {form.image ? 'انتخاب تصویر دیگر از روی هارد' : 'بارگذاری تصویر از روی هارد'}
            </button>
            {imageError && (
              <p className="mt-2 text-xs font-medium text-red-600">{imageError}</p>
            )}

            <details className="mt-3">
              <summary className="text-xs font-bold text-slate-500 cursor-pointer hover:text-slate-700 select-none">
                یا وارد کردن آدرس تصویر (URL)
              </summary>
              <input
                type="url"
                value={form.image.startsWith('data:') ? '' : form.image}
                onChange={e => setForm({ ...form, image: e.target.value })}
                className="mt-2 w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                placeholder="https://example.com/image.jpg"
              />
            </details>
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
