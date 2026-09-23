import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, CheckCircle } from 'lucide-react';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity, clearCart, cartTotal, addOrder } = useStore();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    // Simulate API call
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
      <div className="max-w-2xl mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="text-7xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">سفارش شما ثبت شد!</h2>
        <p className="text-gray-600 mb-8 leading-7">به زودی برای هماهنگی ارسال با شما تماس خواهیم گرفت.</p>
        <Link to="/products" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg inline-flex items-center gap-2">
          <ArrowRight size={18} />
          <span>بازگشت به فروشگاه</span>
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="text-7xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">سبد خرید خالی است</h2>
        <p className="text-gray-600 mb-8">هنوز محصولی به سبد خرید اضافه نکرده‌اید.</p>
        <Link to="/products" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg inline-flex items-center gap-2">
          <ShoppingBag size={18} />
          <span>مشاهده محصولات</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">سبد خرید</h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Items */}
        <div className="divide-y">
          {cart.map(item => (
            <div key={item.product.id} className="p-4 md:p-6 flex items-center gap-4 hover:bg-gray-50 transition-colors">
              <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                {item.product.image}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-800 text-sm md:text-base">{item.product.name}</h3>
                <p className="text-sm text-gray-500">{formatPrice(item.product.price)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  title="کاهش تعداد"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center font-bold text-gray-800">{item.quantity}</span>
                <button
                  onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  title="افزایش تعداد"
                >
                  <Plus size={14} />
                </button>
              </div>
              <div className="text-left min-w-[100px] hidden sm:block">
                <p className="font-bold text-blue-600 text-sm">{formatPrice(item.product.price * item.quantity)}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                title="حذف از سبد"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="bg-gray-50 p-4 md:p-6 border-t">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600 font-medium">جمع کل:</span>
            <span className="text-xl font-bold text-blue-600">{formatPrice(cartTotal)}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>در حال ثبت سفارش...</span>
                </>
              ) : (
                <>
                  <CheckCircle size={18} />
                  <span>ثبت سفارش</span>
                </>
              )}
            </button>
            <button
              onClick={clearCart}
              disabled={isProcessing}
              className="flex-1 sm:flex-none bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-800 px-6 py-3 rounded-lg font-medium transition-all duration-200"
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
