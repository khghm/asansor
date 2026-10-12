import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import {
  Product, Order, ServiceRequest, SiteSettings, Invoice, Expense,
  initialProducts, defaultSiteSettings
} from '../data/store';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  productFromRow, productToRow, orderFromRow, orderToRow,
  serviceFromRow, serviceToRow, invoiceFromRow, invoiceToRow,
  expenseFromRow, expenseToRow, splitSettings
} from '../lib/mappers';

interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
}

interface StoreContextType {
  products: Product[];
  orders: Order[];
  serviceRequests: ServiceRequest[];
  invoices: Invoice[];
  expenses: Expense[];
  cart: CartItem[];
  isAdmin: boolean;
  authLoading: boolean;
  dataLoading: boolean;
  syncError: string | null;
  clearSyncError: () => void;
  settings: SiteSettings;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
  updateSettings: (s: SiteSettings) => void;
  resetSettings: () => void;
  addProduct: (p: Product) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  adjustStock: (productId: string, delta: number) => void;
  addOrder: (o: Order) => void;
  placeOrder: (customer: CustomerInfo, date: string) => Promise<string | null>;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  deleteOrder: (id: string) => void;
  addServiceRequest: (s: ServiceRequest) => Promise<string | null>;
  updateServiceStatus: (id: string, status: ServiceRequest['status']) => void;
  deleteServiceRequest: (id: string) => void;
  addInvoice: (inv: Invoice) => void;
  updateInvoice: (inv: Invoice) => void;
  deleteInvoice: (id: string) => void;
  nextInvoiceNumber: () => string;
  addExpense: (e: Expense) => void;
  deleteExpense: (id: string) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

type DbResult = { error: { message: string } | null };

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // بدون سوپابیس، فقط محصولات نمونه نمایش داده می‌شود (حالت فقط‌خواندنی).
  const [products, setProducts] = useState<Product[]>(isSupabaseConfigured ? [] : initialProducts);
  const [orders, setOrders] = useState<Order[]>([]);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);

  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(isSupabaseConfigured);
  const [dataLoading, setDataLoading] = useState(isSupabaseConfigured);
  const [syncError, setSyncError] = useState<string | null>(null);

  // سبد خرید فقط سمت کلاینت نگهداری می‌شود
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('arvand_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('arvand_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart:', e);
    }
  }, [cart]);

  // ---------- احراز هویت ----------
  useEffect(() => {
    if (!supabase) return;
    const apply = (session: Session | null) =>
      setIsAdmin(session?.user?.app_metadata?.role === 'admin');

    supabase.auth.getSession().then(({ data }) => {
      apply(data.session);
      setAuthLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => apply(session));
    return () => sub.subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string): Promise<string | null> => {
    if (!supabase) return 'اتصال به سوپابیس تنظیم نشده است';
    const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) return 'ایمیل یا رمز عبور اشتباه است';
    if (data.user?.app_metadata?.role !== 'admin') {
      await supabase.auth.signOut();
      return 'این حساب دسترسی مدیریت ندارد';
    }
    setIsAdmin(true);
    return null;
  };

  const signOut = async () => {
    setIsAdmin(false);
    if (supabase) await supabase.auth.signOut();
  };

  // ---------- بارگذاری داده ----------
  const loadPublic = useCallback(async () => {
    if (!supabase) return;
    const [p, s] = await Promise.all([
      supabase.from('products').select('*').order('seq'),
      supabase.from('site_settings').select('data').eq('key', 'public').maybeSingle()
    ]);
    if (p.error) setSyncError(`خطا در دریافت محصولات: ${p.error.message}`);
    else setProducts((p.data ?? []).map(productFromRow));
    const pubData = s.data?.data;
    if (pubData) setSettings(prev => ({ ...prev, ...pubData }));
  }, []);

  const loadAdmin = useCallback(async () => {
    if (!supabase) return;
    const [o, sr, inv, ex, priv] = await Promise.all([
      supabase.from('orders').select('*').order('seq'),
      supabase.from('service_requests').select('*').order('seq'),
      supabase.from('invoices').select('*').order('seq'),
      supabase.from('expenses').select('*').order('seq'),
      supabase.from('site_settings').select('data').eq('key', 'private').maybeSingle()
    ]);
    const firstError = o.error || sr.error || inv.error || ex.error || priv.error;
    if (firstError) setSyncError(`خطا در دریافت اطلاعات مدیریت: ${firstError.message}`);
    setOrders((o.data ?? []).map(orderFromRow));
    setServiceRequests((sr.data ?? []).map(serviceFromRow));
    setInvoices((inv.data ?? []).map(invoiceFromRow));
    setExpenses((ex.data ?? []).map(expenseFromRow));
    const privData = priv.data?.data;
    if (privData) setSettings(prev => ({ ...prev, ...privData }));
  }, []);

  useEffect(() => {
    if (!supabase) return;
    loadPublic().finally(() => setDataLoading(false));
  }, [loadPublic]);

  useEffect(() => {
    if (!supabase) return;
    if (isAdmin) {
      loadAdmin();
    } else {
      setOrders([]);
      setServiceRequests([]);
      setInvoices([]);
      setExpenses([]);
      // اطلاعات خصوصی تنظیمات پس از خروج پاک شود
      loadPublic().then(() =>
        setSettings(prev => {
          const { priv } = splitSettings(defaultSiteSettings);
          return { ...prev, ...priv };
        })
      );
    }
  }, [isAdmin, loadAdmin, loadPublic]);

  // ---------- همگام‌سازی با دیتابیس ----------
  // تغییرات ابتدا در UI اعمال می‌شود؛ اگر ذخیره ناموفق بود، داده از سرور دوباره خوانده می‌شود.
  const sync = async (label: string, op: () => PromiseLike<DbResult>) => {
    if (!supabase) return;
    try {
      const { error } = await op();
      if (error) throw new Error(error.message);
    } catch (e) {
      console.error(`[Supabase] ${label}`, e);
      setSyncError(`${label}: ${e instanceof Error ? e.message : 'خطای نامشخص'}`);
      await loadPublic();
      if (isAdmin) await loadAdmin();
    }
  };

  const clearSyncError = () => setSyncError(null);

  // ---------- تنظیمات ----------
  const updateSettings = (s: SiteSettings) => {
    setSettings(s);
    const { pub, priv } = splitSettings(s);
    sync('ذخیره تنظیمات ناموفق بود', () =>
      supabase!.from('site_settings').upsert([
        { key: 'public', data: pub, updated_at: new Date().toISOString() },
        { key: 'private', data: priv, updated_at: new Date().toISOString() }
      ])
    );
  };

  const resetSettings = () => updateSettings(defaultSiteSettings);

  // ---------- محصولات ----------
  const addProduct = (p: Product) => {
    setProducts(prev => [...prev, p]);
    sync('افزودن محصول ناموفق بود', () => supabase!.from('products').insert(productToRow(p)));
  };

  const updateProduct = (p: Product) => {
    setProducts(prev => prev.map(item => (item.id === p.id ? { ...p } : item)));
    sync('ویرایش محصول ناموفق بود', () =>
      supabase!.from('products').update(productToRow(p)).eq('id', p.id)
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(item => item.id !== id));
    sync('حذف محصول ناموفق بود', () => supabase!.from('products').delete().eq('id', id));
  };

  // تغییر اتمیک موجودی (از طریق تابع دیتابیس)
  const adjustStock = (productId: string, delta: number) => {
    setProducts(prev => prev.map(item =>
      item.id === productId ? { ...item, stock: Math.max(0, item.stock + delta) } : item
    ));
    sync('تغییر موجودی ناموفق بود', () =>
      supabase!.rpc('adjust_stock', { p_product_id: productId, p_delta: delta })
    );
  };

  // ---------- سفارشات ----------
  const addOrder = (o: Order) => {
    setOrders(prev => [...prev, o]);
    sync('ثبت سفارش ناموفق بود', () => supabase!.from('orders').insert(orderToRow(o)));
  };

  // ثبت سفارش مشتری: قیمت‌ها و موجودی سمت سرور اعتبارسنجی و کسر می‌شود
  const placeOrder = async (customer: CustomerInfo, date: string): Promise<string | null> => {
    if (!supabase) return 'اتصال به سوپابیس تنظیم نشده است؛ ثبت سفارش ممکن نیست';
    const { error } = await supabase.rpc('place_order', {
      p_customer_name: customer.name,
      p_customer_phone: customer.phone,
      p_customer_address: customer.address,
      p_date: date,
      p_items: cart.map(i => ({ productId: i.product.id, quantity: i.quantity }))
    });
    if (error) {
      await loadPublic(); // موجودی ممکن است تغییر کرده باشد
      return error.message;
    }
    setCart([]);
    await loadPublic();
    if (isAdmin) await loadAdmin();
    return null;
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => (o.id === id ? { ...o, status } : o)));
    sync('تغییر وضعیت سفارش ناموفق بود', () =>
      supabase!.from('orders').update({ status }).eq('id', id)
    );
  };

  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
    sync('حذف سفارش ناموفق بود', () => supabase!.from('orders').delete().eq('id', id));
  };

  // ---------- درخواست خدمات ----------
  const addServiceRequest = async (s: ServiceRequest): Promise<string | null> => {
    if (!supabase) {
      setServiceRequests(prev => [...prev, s]);
      return null;
    }
    const { error } = await supabase.from('service_requests').insert(serviceToRow(s));
    if (error) return 'ثبت درخواست ناموفق بود. لطفاً دوباره تلاش کنید.';
    if (isAdmin) setServiceRequests(prev => [...prev, s]);
    return null;
  };

  const updateServiceStatus = (id: string, status: ServiceRequest['status']) => {
    setServiceRequests(prev => prev.map(s => (s.id === id ? { ...s, status } : s)));
    sync('تغییر وضعیت درخواست ناموفق بود', () =>
      supabase!.from('service_requests').update({ status }).eq('id', id)
    );
  };

  const deleteServiceRequest = (id: string) => {
    setServiceRequests(prev => prev.filter(s => s.id !== id));
    sync('حذف درخواست ناموفق بود', () =>
      supabase!.from('service_requests').delete().eq('id', id)
    );
  };

  // ---------- فاکتورها ----------
  const addInvoice = (inv: Invoice) => {
    setInvoices(prev => [...prev, inv]);
    sync('ذخیره فاکتور ناموفق بود', () => supabase!.from('invoices').insert(invoiceToRow(inv)));
  };

  const updateInvoice = (inv: Invoice) => {
    setInvoices(prev => prev.map(i => (i.id === inv.id ? { ...inv } : i)));
    sync('ویرایش فاکتور ناموفق بود', () =>
      supabase!.from('invoices').update(invoiceToRow(inv)).eq('id', inv.id)
    );
  };

  const deleteInvoice = (id: string) => {
    setInvoices(prev => prev.filter(i => i.id !== id));
    sync('حذف فاکتور ناموفق بود', () => supabase!.from('invoices').delete().eq('id', id));
  };

  // شماره فاکتور ترتیبی: INV-1403-001
  const nextInvoiceNumber = (): string => {
    const prefix = (settings.invoicePrefix || 'INV').trim().toUpperCase() || 'INV';
    const year = new Intl.DateTimeFormat('fa-IR-u-nu-latn-ca-persian', { year: 'numeric' }).format(new Date());
    const seq = invoices.reduce((max, inv) => {
      const m = inv.invoiceNumber.match(/(\d+)$/);
      return m ? Math.max(max, parseInt(m[1], 10)) : max;
    }, 0);
    return `${prefix}-${year}-${String(seq + 1).padStart(3, '0')}`;
  };

  // ---------- هزینه‌ها ----------
  const addExpense = (e: Expense) => {
    setExpenses(prev => [e, ...prev]);
    sync('ثبت هزینه ناموفق بود', () => supabase!.from('expenses').insert(expenseToRow(e)));
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(x => x.id !== id));
    sync('حذف هزینه ناموفق بود', () => supabase!.from('expenses').delete().eq('id', id));
  };

  // ---------- سبد خرید ----------
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        if (existing.quantity + 1 > product.stock) return prev;
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      if (product.stock <= 0) return prev;
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.product.id !== productId));
      return;
    }
    const prod = products.find(p => p.id === productId);
    const maxQty = prod ? Math.max(0, prod.stock) : quantity;
    const clamped = Math.min(quantity, maxQty);
    setCart(prev => prev.map(item =>
      item.product.id === productId ? { ...item, quantity: clamped } : item
    ));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider value={{
      products, orders, serviceRequests, invoices, expenses, cart,
      isAdmin, authLoading, dataLoading, syncError, clearSyncError, settings,
      signIn, signOut, updateSettings, resetSettings,
      addProduct, updateProduct, deleteProduct, adjustStock,
      addOrder, placeOrder, updateOrderStatus, deleteOrder,
      addServiceRequest, updateServiceStatus, deleteServiceRequest,
      addInvoice, updateInvoice, deleteInvoice, nextInvoiceNumber,
      addExpense, deleteExpense,
      addToCart, removeFromCart, updateCartQuantity, clearCart,
      cartTotal, cartCount
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

// ---- ابزار مشترک هشدار موجودی کم (عملیاتی و یکپارچه در کل برنامه) ----
export type StockLevel = 'out' | 'low' | 'ok';

export const getEffectiveThreshold = (product: Product, globalThreshold: number): number => {
  const t = product.lowStockThreshold;
  if (typeof t === 'number' && t > 0) return t;
  return globalThreshold > 0 ? globalThreshold : defaultSiteSettings.lowStockThreshold;
};

export const getStockLevel = (product: Product, globalThreshold: number): StockLevel => {
  if (product.stock <= 0) return 'out';
  if (product.stock < getEffectiveThreshold(product, globalThreshold)) return 'low';
  return 'ok';
};
