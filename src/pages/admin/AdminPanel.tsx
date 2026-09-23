import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { Product, Order, ServiceRequest } from '../../data/store';
import ProductForm from './ProductForm';
import ConfirmModal from './ConfirmModal';
import {
  LayoutDashboard, Package, ShoppingCart, Wrench, LogOut,
  DollarSign, AlertCircle, Plus, Edit, Trash2, X, Menu,
  TrendingUp, Users, CheckCircle, Clock, Eye
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

  // Toast notification
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Tabs
  const tabs = [
    { id: 'dashboard' as Tab, label: 'داشبورد', icon: <LayoutDashboard size={20} /> },
    { id: 'products' as Tab, label: 'محصولات', icon: <Package size={20} /> },
    { id: 'orders' as Tab, label: 'سفارشات', icon: <ShoppingCart size={20} /> },
    { id: 'services' as Tab, label: 'درخواست خدمات', icon: <Wrench size={20} /> },
  ];

  // Stats
  const stats = [
    { label: 'کل محصولات', value: products.length, icon: <Package size={24} />, color: 'bg-blue-500' },
    { label: 'سفارشات جدید', value: orders.filter(o => o.status === 'pending').length, icon: <ShoppingCart size={24} />, color: 'bg-orange-500' },
    { label: 'درخواست خدمات', value: serviceRequests.filter(s => s.status === 'new').length, icon: <Wrench size={24} />, color: 'bg-green-500' },
    { label: 'درآمد کل', value: formatPrice(orders.reduce((sum, o) => sum + o.total, 0)) + ' ت', icon: <DollarSign size={24} />, color: 'bg-purple-500' },
  ];

  // Status labels & colors
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
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-indigo-100 text-indigo-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
    new: 'bg-orange-100 text-orange-700',
    'in-progress': 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700'
  };

  // Handlers
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
    <div className="min-h-screen bg-gray-100 flex">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 left-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium animate-slide-in ${
          toast.type === 'success' ? 'bg-green-500' : toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        }`}>
          {toast.message}
        </div>
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 right-0 z-40 w-64 bg-gray-900 text-white transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">آ</span>
            </div>
            <div>
              <h2 className="font-bold">پنل مدیریت</h2>
              <p className="text-xs text-gray-400">آسانسور آرمند</p>
            </div>
          </div>

          <nav className="space-y-1 flex-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-gray-800 transition-colors"
          >
            <LogOut size={20} />
            <span>خروج از پنل</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Top Bar */}
        <div className="bg-white shadow-sm px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600 hover:text-gray-800 transition-colors">
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-bold text-gray-800">
              {tabs.find(t => t.id === activeTab)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 hidden sm:block">خوش آمدید، ادمین</span>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
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
                  <div key={i} className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                      </div>
                      <div className={`${stat.color} text-white p-3 rounded-lg`}>
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-5">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <ShoppingCart size={18} className="text-blue-600" />
                    آخرین سفارشات
                  </h3>
                  <div className="space-y-3">
                    {orders.slice(0, 5).map(order => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div>
                          <p className="text-sm font-medium text-gray-800">{order.customerName}</p>
                          <p className="text-xs text-gray-500">{order.id} - {order.date}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[order.status]}`}>
                          {statusLabels[order.status]}
                        </span>
                      </div>
                    ))}
                    {orders.length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-4">سفارشی ثبت نشده است</p>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-5">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Wrench size={18} className="text-green-600" />
                    آخرین درخواست‌های خدمات
                  </h3>
                  <div className="space-y-3">
                    {serviceRequests.slice(0, 5).map(req => (
                      <div key={req.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div>
                          <p className="text-sm font-medium text-gray-800">{req.name}</p>
                          <p className="text-xs text-gray-500">{req.id} - {req.date}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[req.status]}`}>
                          {statusLabels[req.status]}
                        </span>
                      </div>
                    ))}
                    {serviceRequests.length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-4">درخواستی ثبت نشده است</p>
                    )}
                  </div>
                </div>
              </div>

              {products.filter(p => p.stock < 10).length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-5">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <AlertCircle size={18} className="text-orange-500" />
                    هشدار موجودی کم
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {products.filter(p => p.stock < 10).map(p => (
                      <div key={p.id} className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                        <span className="text-2xl">{p.image}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{p.name}</p>
                          <p className="text-xs text-orange-600">فقط {p.stock} عدد</p>
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
                <p className="text-sm text-gray-500">{products.length} محصول</p>
                <button
                  onClick={handleAddProduct}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 text-sm"
                >
                  <Plus size={18} />
                  <span>افزودن محصول</span>
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">محصول</th>
                        <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 hidden md:table-cell">دسته‌بندی</th>
                        <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">قیمت</th>
                        <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">موجودی</th>
                        <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">عملیات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {products.map(product => (
                        <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{product.image}</span>
                              <div>
                                <p className="text-sm font-medium text-gray-800">{product.name}</p>
                                {product.featured && <span className="text-xs text-blue-600">⭐ ویژه</span>}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">{product.category}</td>
                          <td className="px-4 py-3 text-sm text-gray-800 font-medium">{formatPrice(product.price)} ت</td>
                          <td className="px-4 py-3">
                            <span className={`text-sm ${product.stock < 10 ? 'text-orange-600 font-bold' : 'text-gray-600'}`}>
                              {product.stock}
                            </span>
                          </td>
                          <td className="px-4 py-3">
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
                    <Package size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">محصولی ثبت نشده است</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="animate-fade-in">
              <p className="text-sm text-gray-500 mb-6">{orders.length} سفارش</p>

              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-gray-800">{order.id}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${statusColors[order.status]}`}>
                            {statusLabels[order.status]}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{order.customerName} | {order.customerPhone}</p>
                        <p className="text-xs text-gray-400">{order.date}</p>
                      </div>
                      <div className="text-left">
                        <p className="text-lg font-bold text-blue-600">{formatPrice(order.total)} تومان</p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="space-y-2 mb-4">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">{item.productName} × {item.quantity}</span>
                            <span className="text-gray-800">{formatPrice(item.price * item.quantity)} ت</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <select
                          value={order.status}
                          onChange={e => handleOrderStatusChange(order.id, e.target.value as Order['status'])}
                          className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        >
                          <option value="pending">در انتظار</option>
                          <option value="processing">در حال پردازش</option>
                          <option value="shipped">ارسال شده</option>
                          <option value="delivered">تحویل شده</option>
                          <option value="cancelled">لغو شده</option>
                        </select>
                        <button
                          onClick={() => handleDeleteClick('order', order.id, order.customerName)}
                          className="text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors flex items-center gap-1"
                        >
                          <Trash2 size={14} />
                          <span>حذف</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {orders.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                    <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">سفارشی ثبت نشده است</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="animate-fade-in">
              <p className="text-sm text-gray-500 mb-6">{serviceRequests.length} درخواست خدمات</p>

              <div className="space-y-4">
                {serviceRequests.map(req => (
                  <div key={req.id} className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-gray-800">{req.id}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${statusColors[req.status]}`}>
                            {statusLabels[req.status]}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{req.name} | {req.phone}</p>
                        <p className="text-xs text-gray-400">{req.address}</p>
                      </div>
                      <div className="text-left">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {req.serviceType === 'installation' ? '🏗️ نصب' : req.serviceType === 'repair' ? '🔧 تعمیر' : '🔄 سرویس'}
                        </span>
                        <p className="text-xs text-gray-400 mt-1">{req.date}</p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-sm text-gray-600 mb-4">{req.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <select
                          value={req.status}
                          onChange={e => handleServiceStatusChange(req.id, e.target.value as ServiceRequest['status'])}
                          className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        >
                          <option value="new">جدید</option>
                          <option value="in-progress">در حال انجام</option>
                          <option value="completed">تکمیل شده</option>
                        </select>
                        <button
                          onClick={() => handleDeleteClick('service', req.id, req.name)}
                          className="text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors flex items-center gap-1"
                        >
                          <Trash2 size={14} />
                          <span>حذف</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {serviceRequests.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                    <Wrench size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">درخواست خدماتی ثبت نشده است</p>
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
