import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { Product, Order, ServiceRequest } from '../../data/store';
import ProductForm from './ProductForm';
import ConfirmModal from './ConfirmModal';
import {
  LayoutDashboard, Package, ShoppingCart, Wrench, LogOut,
  DollarSign, AlertCircle, Plus, Edit, Trash2, Menu,
  Building2, TrendingUp, CheckCircle2, X
} from 'lucide-react';

type Tab = 'dashboard' | 'products' | 'orders' | 'services';

interface DeleteConfirm {
  type: 'product' | 'order' | 'service';
  id: string;
  name: string;
}

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const {
    products, orders, serviceRequests,
    addProduct, updateProduct, deleteProduct,
    updateOrderStatus, deleteOrder,
    updateServiceStatus, deleteServiceRequest,
    setAdmin
  } = useStore();

  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<DeleteConfirm | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const formatPrice = (price: number) => new Intl.NumberFormat('fa-IR').format(price);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const tabs = [
    { id: 'dashboard' as Tab, label: 'داشبورد', icon: <LayoutDashboard size={20} /> },
    { id: 'products' as Tab, label: 'محصولات', icon: <Package size={20} /> },
    { id: 'orders' as Tab, label: 'سفارشات', icon: <ShoppingCart size={20} /> },
    { id: 'services' as Tab, label: 'درخواست خدمات', icon: <Wrench size={20} /> },
  ];

  const stats = [
    { label: 'کل محصولات', value: products.length, icon: <Package size={24} />, color: 'from-blue-500 to-blue-600' },
    { label: 'سفارشات جدید', value: orders.filter(o => o.status === 'pending').length, icon: <ShoppingCart size={24} />, color: 'from-orange-500 to-orange-600' },
    { label: 'درخواست خدمات', value: serviceRequests.filter(s => s.status === 'new').length, icon: <Wrench size={24} />, color: 'from-emerald-500 to-emerald-600' },
    { label: 'درآمد کل', value: formatPrice(orders.reduce((sum, o) => sum + o.total, 0)) + ' ت', icon: <DollarSign size={24} />, color: 'from-purple-500 to-purple-600' },
  ];

  const statusLabels: Record<string, string> = {
    pending: 'در انتظار',
    processing: 'در حال پردازش',
    shipped: 'ارسال شده',
    delivered: 'تحویل شده',
    cancelled: 'لغو شده',
    new: 'جدید',
    'in-progress': 'در حال انجام',
    completed: 'تکمیل شده'
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-indigo-100 text-indigo-700',
    delivered: 'bg-emerald-100 text-emerald-700',
    cancelled: 'bg-red-100 text-red-700',
    new: 'bg-orange-100 text-orange-700',
    'in-progress': 'bg-blue-100 text-blue-700',
    completed: 'bg-emerald-100 text-emerald-700'
  };

  const handleLogout = () => {
    setAdmin(false);
    navigate('/');
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  const handleSaveProduct = (product: Product) => {
    if (editingProduct) {
      updateProduct(product);
      showToast('محصول با موفقیت بروزرسانی شد');
    } else {
      addProduct(product);
      showToast('محصول جدید با موفقیت اضافه شد');
    }
  };

  const handleCloseProductModal = () => {
    setShowProductModal(false);
    setEditingProduct(null);
  };

  const handleDeleteClick = (type: 'product' | 'order' | 'service', id: string, name: string) => {
    setDeleteConfirm({ type, id, name });
  };

  const handleConfirmDelete = () => {
    if (!deleteConfirm) return;
    switch (deleteConfirm.type) {
      case 'product':
        deleteProduct(deleteConfirm.id);
        showToast('محصول با موفقیت حذف شد');
        break;
      case 'order':
        deleteOrder(deleteConfirm.id);
        showToast('سفارش با موفقیت حذف شد');
        break;
      case 'service':
        deleteServiceRequest(deleteConfirm.id);
        showToast('درخواست خدمات با موفقیت حذف شد');
        break;
    }
    setDeleteConfirm(null);
  };

  const handleOrderStatusChange = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus);
    showToast('وضعیت سفارش بروزرسانی شد');
  };

  const handleServiceStatusChange = (serviceId: string, newStatus: ServiceRequest['status']) => {
    updateServiceStatus(serviceId, newStatus);
    showToast('وضعیت درخواست خدمات بروزرسانی شد');
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 left-4 z-50 px-5 py-3 rounded-xl shadow-xl text-white font-medium animate-slide-in-left flex items-center gap-2 ${
          toast.type === 'success' ? 'bg-emerald-500' : toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        }`}>
          <CheckCircle2 size={18} />
          <span className="text-sm">{toast.message}</span>
        </div>
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 right-0 z-40 w-72 bg-gradient-to-b from-slate-900 to-slate-950 text-white transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Building2 className="text-white" size={22} />
            </div>
            <div>
              <h2 className="font-black">پنل مدیریت</h2>
              <p className="text-xs text-slate-400">آسانسور آرمند</p>
            </div>
          </div>

          <nav className="space-y-1 flex-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-l from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={20} />
            <span>خروج از پنل</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Top Bar */}
        <div className="bg-white border-b border-slate-200 px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-600 hover:text-slate-800 transition-colors">
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-black text-slate-900">
              {tabs.find(t => t.id === activeTab)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500 hidden sm:block">خوش آمدید، ادمین</span>
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-blue-500/30">
              A
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="animate-fade-in space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                        <p className="text-2xl font-black text-slate-900 mt-1">{stat.value}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
                  <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                    <ShoppingCart size={18} className="text-blue-600" />
                    آخرین سفارشات
                  </h3>
                  <div className="space-y-3">
                    {orders.slice(0, 5).map(order => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                        <div>
                          <p className="text-sm font-bold text-slate-800">{order.customerName}</p>
                          <p className="text-xs text-slate-500">{order.id} - {order.date}</p>
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[order.status]}`}>
                          {statusLabels[order.status]}
                        </span>
                      </div>
                    ))}
                    {orders.length === 0 && (
                      <p className="text-sm text-slate-500 text-center py-4">سفارشی ثبت نشده است</p>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
                  <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                    <Wrench size={18} className="text-emerald-600" />
                    آخرین درخواست‌های خدمات
                  </h3>
                  <div className="space-y-3">
                    {serviceRequests.slice(0, 5).map(req => (
                      <div key={req.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                        <div>
                          <p className="text-sm font-bold text-slate-800">{req.name}</p>
                          <p className="text-xs text-slate-500">{req.id} - {req.date}</p>
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[req.status]}`}>
                          {statusLabels[req.status]}
                        </span>
                      </div>
                    ))}
                    {serviceRequests.length === 0 && (
                      <p className="text-sm text-slate-500 text-center py-4">درخواستی ثبت نشده است</p>
                    )}
                  </div>
                </div>
              </div>

              {products.filter(p => p.stock < 10).length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
                  <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                    <AlertCircle size={18} className="text-orange-500" />
                    هشدار موجودی کم
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {products.filter(p => p.stock < 10).map(p => (
                      <div key={p.id} className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100">
                        <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="%2394a3b8" stroke-width="2"%3E%3Cpath d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"%3E%3C/path%3E%3C/svg%3E'; }} />
                        <div>
                          <p className="text-sm font-bold text-slate-800">{p.name}</p>
                          <p className="text-xs text-orange-600 font-medium">فقط {p.stock} عدد</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-slate-500 font-medium">
                  <span className="text-slate-900 font-bold">{products.length}</span> محصول
                </p>
                <button
                  onClick={handleAddProduct}
                  className="bg-gradient-to-l from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2.5 rounded-xl font-bold transition-all duration-200 shadow-lg shadow-blue-500/30 flex items-center gap-2 text-sm"
                >
                  <Plus size={18} />
                  <span>افزودن محصول</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="text-right px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">محصول</th>
                        <th className="text-right px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">دسته‌بندی</th>
                        <th className="text-right px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">قیمت</th>
                        <th className="text-right px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">موجودی</th>
                        <th className="text-right px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">عملیات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {products.map(product => (
                        <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="%2394a3b8" stroke-width="2"%3E%3Cpath d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"%3E%3C/path%3E%3C/svg%3E'; }} />
                              <div>
                                <p className="text-sm font-bold text-slate-800">{product.name}</p>
                                {product.featured && <span className="text-xs text-blue-600 font-medium">⭐ ویژه</span>}
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-sm text-slate-600 hidden md:table-cell">{product.category}</td>
                          <td className="px-5 py-4 text-sm text-slate-800 font-bold">{formatPrice(product.price)} ت</td>
                          <td className="px-5 py-4">
                            <span className={`text-sm font-bold ${product.stock < 10 ? 'text-orange-600' : 'text-slate-600'}`}>
                              {product.stock}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleEditProduct(product)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="ویرایش"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteClick('product', product.id, product.name)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="حذف"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {products.length === 0 && (
                  <div className="text-center py-12">
                    <Package size={48} className="mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-500">محصولی ثبت نشده است</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="animate-fade-in">
              <p className="text-sm text-slate-500 font-medium mb-6">
                <span className="text-slate-900 font-bold">{orders.length}</span> سفارش
              </p>

              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-black text-slate-900">{order.id}</h3>
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[order.status]}`}>
                            {statusLabels[order.status]}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500 mt-1">{order.customerName} | {order.customerPhone}</p>
                        <p className="text-xs text-slate-400">{order.date}</p>
                      </div>
                      <div className="text-left">
                        <p className="text-xl font-black text-blue-600">{formatPrice(order.total)} تومان</p>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-4">
                      <div className="space-y-2 mb-4">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center justify-between text-sm">
                            <span className="text-slate-600">{item.productName} × {item.quantity}</span>
                            <span className="text-slate-800 font-medium">{formatPrice(item.price * item.quantity)} ت</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <select
                          value={order.status}
                          onChange={e => handleOrderStatusChange(order.id, e.target.value as Order['status'])}
                          className="text-sm border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                        >
                          <option value="pending">در انتظار</option>
                          <option value="processing">در حال پردازش</option>
                          <option value="shipped">ارسال شده</option>
                          <option value="delivered">تحویل شده</option>
                          <option value="cancelled">لغو شده</option>
                        </select>
                        <button
                          onClick={() => handleDeleteClick('order', order.id, order.customerName)}
                          className="text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 font-medium"
                        >
                          <Trash2 size={14} />
                          <span>حذف</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {orders.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
                    <ShoppingCart size={48} className="mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-500">سفارشی ثبت نشده است</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="animate-fade-in">
              <p className="text-sm text-slate-500 font-medium mb-6">
                <span className="text-slate-900 font-bold">{serviceRequests.length}</span> درخواست خدمات
              </p>

              <div className="space-y-4">
                {serviceRequests.map(req => (
                  <div key={req.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-black text-slate-900">{req.id}</h3>
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[req.status]}`}>
                            {statusLabels[req.status]}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500 mt-1">{req.name} | {req.phone}</p>
                        <p className="text-xs text-slate-400">{req.address}</p>
                      </div>
                      <div className="text-left">
                        <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">
                          {req.serviceType === 'installation' ? 'نصب' : req.serviceType === 'repair' ? 'تعمیر' : 'سرویس'}
                        </span>
                        <p className="text-xs text-slate-400 mt-1">{req.date}</p>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-4">
                      <p className="text-sm text-slate-600 mb-4">{req.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <select
                          value={req.status}
                          onChange={e => handleServiceStatusChange(req.id, e.target.value as ServiceRequest['status'])}
                          className="text-sm border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                        >
                          <option value="new">جدید</option>
                          <option value="in-progress">در حال انجام</option>
                          <option value="completed">تکمیل شده</option>
                        </select>
                        <button
                          onClick={() => handleDeleteClick('service', req.id, req.name)}
                          className="text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 font-medium"
                        >
                          <Trash2 size={14} />
                          <span>حذف</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {serviceRequests.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
                    <Wrench size={48} className="mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-500">درخواست خدماتی ثبت نشده است</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Product Modal */}
      {showProductModal && (
        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={handleCloseProductModal}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirm !== null}
        title="تأیید حذف"
        message={`آیا از حذف "${deleteConfirm?.name}" مطمئن هستید؟ این عمل قابل بازگشت نیست.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirm(null)}
        confirmText="حذف"
        cancelText="انصراف"
        type="danger"
      />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
};

export default AdminPanel;
