import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { 
  ArrowRight, ShoppingCart, CheckCircle2, Package, 
  Shield, Truck, Award, Star, Minus, Plus, Heart,
  Share2, ChevronLeft
} from 'lucide-react';
import ImageWithFallback from '../components/ImageWithFallback';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <Package size={64} className="mx-auto text-slate-300 mb-4" />
        <h2 className="text-2xl font-black text-slate-900 mb-2">محصول یافت نشد</h2>
        <p className="text-slate-500 mb-6">محصول مورد نظر وجود ندارد یا حذف شده است</p>
        <Link 
          to="/products" 
          className="inline-flex items-center gap-2 bg-gradient-to-l from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold"
        >
          <ArrowRight size={18} />
          <span>بازگشت به محصولات</span>
        </Link>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link to="/" className="hover:text-blue-600 transition-colors">خانه</Link>
        <ChevronLeft size={14} />
        <Link to="/products" className="hover:text-blue-600 transition-colors">محصولات</Link>
        <ChevronLeft size={14} />
        <span className="text-slate-900 font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl overflow-hidden aspect-square relative group">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {product.stock < 10 && (
              <div className="absolute top-4 left-4">
                <span className="px-4 py-2 bg-orange-500 text-white text-sm font-bold rounded-xl shadow-lg">
                  موجودی محدود
                </span>
              </div>
            )}
            {product.featured && (
              <div className="absolute top-4 right-4">
                <span className="px-4 py-2 bg-gradient-to-l from-amber-500 to-orange-500 text-white text-sm font-bold rounded-xl shadow-lg flex items-center gap-1">
                  <Star size={14} className="fill-white" />
                  <span>ویژه</span>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-3">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-sm text-slate-500">(۱۲۸ نظر)</span>
            </div>
          </div>

          <div className="border-t border-b border-slate-200 py-6">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-sm text-slate-500">قیمت:</span>
              <span className="text-3xl font-black text-blue-600">{formatPrice(product.price)}</span>
            </div>
            <p className="text-xs text-emerald-600 font-medium">✓ موجود در انبار ({product.stock} عدد)</p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-3">توضیحات محصول</h3>
            <p className="text-slate-600 leading-8 text-sm">
              {product.description}
            </p>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-700">تعداد:</span>
              <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg bg-white hover:bg-slate-50 flex items-center justify-center transition-colors shadow-sm"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-bold text-slate-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 rounded-lg bg-white hover:bg-slate-50 flex items-center justify-center transition-colors shadow-sm"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                  addedToCart
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                    : 'bg-gradient-to-l from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50'
                }`}
              >
                {addedToCart ? (
                  <>
                    <CheckCircle2 size={20} />
                    <span>به سبد اضافه شد</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    <span>افزودن به سبد خرید</span>
                  </>
                )}
              </button>
              <button className="p-4 rounded-xl border-2 border-slate-200 hover:border-red-300 hover:bg-red-50 text-slate-600 hover:text-red-500 transition-all">
                <Heart size={20} />
              </button>
              <button className="p-4 rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-600 hover:text-blue-500 transition-all">
                <Share2 size={20} />
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
            {[
              { icon: <Shield size={20} />, title: 'گارانتی اصالت', color: 'text-blue-600' },
              { icon: <Truck size={20} />, title: 'ارسال سریع', color: 'text-emerald-600' },
              { icon: <Award size={20} />, title: 'کیفیت تضمینی', color: 'text-orange-600' },
            ].map((feature, i) => (
              <div key={i} className="text-center">
                <div className={`${feature.color} flex justify-center mb-2`}>
                  {feature.icon}
                </div>
                <p className="text-xs font-bold text-slate-700">{feature.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-slate-200 pt-12">
          <h2 className="text-2xl font-black text-slate-900 mb-8">محصولات مرتبط</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relProduct => (
              <Link
                key={relProduct.id}
                to={`/product/${relProduct.id}`}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-slate-100 card-hover"
              >
                <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-50 overflow-hidden">
                  <ImageWithFallback
                    src={relProduct.image}
                    alt={relProduct.name}
                    className="w-full h-full object-cover img-zoom"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-800 text-sm mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {relProduct.name}
                  </h3>
                  <p className="font-black text-blue-600">{formatPrice(relProduct.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
