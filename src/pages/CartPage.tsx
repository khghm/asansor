import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, CheckCircle2, Package } from 'lucide-react';
import ImageWithFallback from '../components/ImageWithFallback';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity, clearCart, cartTotal, addOrder } = useStore();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const order = {
      id: 'ORD-' + Date.now(),
      customerName: 'مشتری وب‌سایت',
      customerPhone: '09120000000',
      customerAddress: 'آدرس ثبت نشده',
      items: cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      })),
      total: cartTotal,
      status: 'pending' as const,
      date: new Date().toLocaleDateString('fa-IR')
    };
    
    addOrder(order);
    clearCart();
    setIsProcessing(false);
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center animate-fade-in-up">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="text-emerald-600" size={40} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-4">سفارش شما ثبت شد!</h2>
        <p className="text-slate-500 mb-10 leading-7">به زودی برای هماهنگی ارسال با شما تماس خواهیم گرفت.</p>
        <Link 
          to="/products" 
          className="inline-flex items-center gap-2 bg-gradient-to-l from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-7 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30"
        >
          <ArrowRight size={18} />
          <span>بازگشت به فروشگاه</span>
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
          <Package className="text-slate-400" size={40} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-4">سبد خرید خالی است</h2>
        <p className="text-slate-500 mb-10">هنوز محصولی به سبد خرید اضافه نکرده‌اید.</p>
        <Link 
          to="/products" 
          className="inline-flex items-center gap-2 bg-gradient-to-l from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-7 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30"
        >
          <ShoppingBag size={18} />
          <span>مشاهده محصولات</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-8">سبد خرید</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Items */}
        <div className="divide-y divide-slate-100">
          {cart.map(item => (
            <div key={item.product.id} className="p-5 flex items-center gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                <ImageWithFallback
                  src={item.product.image}
                  alt={item.product.name}
                  category={item.product.category}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-800 text-sm md:text-base">{item.product.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{formatPrice(item.product.price)}</p>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100 rounded-xl p-1">
                <button
                  onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-lg bg-white hover:bg-slate-50 flex items-center justify-center transition-colors shadow-sm"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center font-bold text-slate-800">{item.quantity}</span>
                <button
                  onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-white hover:bg-slate-50 flex items-center justify-center transition-colors shadow-sm"
                >
                  <Plus size={14} />
                </button>
              </div>
              <div className="text-left min-w-[100px] hidden sm:block">
                <p className="font-black text-blue-600 text-sm">{formatPrice(item.product.price * item.quantity)}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="text-slate-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="bg-gradient-to-l from-slate-50 to-slate-100/50 p-6 border-t border-slate-200">
          <div className="flex items-center justify-between mb-5">
            <span className="text-slate-600 font-medium">جمع کل:</span>
            <span className="text-2xl font-black text-blue-600">{formatPrice(cartTotal)}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="flex-1 bg-gradient-to-l from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-400 disabled:to-slate-400 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>در حال ثبت سفارش...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={18} />
                  <span>ثبت سفارش</span>
                </>
              )}
            </button>
            <button
              onClick={clearCart}
              disabled={isProcessing}
              className="sm:w-auto bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-6 py-3.5 rounded-xl font-medium transition-all"
            >
              پاک کردن سبد
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
