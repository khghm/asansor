import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Order, ServiceRequest, SiteSettings, Invoice, initialProducts, initialOrders, initialServiceRequests, defaultSiteSettings } from '../data/store';

interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreContextType {
  products: Product[];
  orders: Order[];
  serviceRequests: ServiceRequest[];
  invoices: Invoice[];
  cart: CartItem[];
  isAdmin: boolean;
  settings: SiteSettings;
  setAdmin: (v: boolean) => void;
  updateSettings: (s: SiteSettings) => void;
  resetSettings: () => void;
  addProduct: (p: Product) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  adjustStock: (productId: string, delta: number) => void;
  addOrder: (o: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  deleteOrder: (id: string) => void;
  addServiceRequest: (s: ServiceRequest) => void;
  updateServiceStatus: (id: string, status: ServiceRequest['status']) => void;
  deleteServiceRequest: (id: string) => void;
  addInvoice: (inv: Invoice) => void;
  updateInvoice: (inv: Invoice) => void;
  deleteInvoice: (id: string) => void;
  nextInvoiceNumber: () => string;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('arvand_products');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('arvand_orders');
      return saved ? JSON.parse(saved) : initialOrders;
    } catch {
      return initialOrders;
    }
  });

  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(() => {
    try {
      const saved = localStorage.getItem('arvand_services');
      return saved ? JSON.parse(saved) : initialServiceRequests;
    } catch {
      return initialServiceRequests;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('arvand_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('arvand_admin') === 'true';
    } catch {
      return false;
    }
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem('arvand_settings');
      return saved ? { ...defaultSiteSettings, ...JSON.parse(saved) } : defaultSiteSettings;
    } catch {
      return defaultSiteSettings;
    }
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    try {
      const saved = localStorage.getItem('arvand_invoices');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('arvand_products', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products:', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('arvand_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders:', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('arvand_services', JSON.stringify(serviceRequests));
    } catch (e) {
      console.error('Failed to save services:', e);
    }
  }, [serviceRequests]);

  useEffect(() => {
    try {
      localStorage.setItem('arvand_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart:', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('arvand_admin', String(isAdmin));
    } catch (e) {
      console.error('Failed to save admin state:', e);
    }
  }, [isAdmin]);

  useEffect(() => {
    try {
      localStorage.setItem('arvand_settings', JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem('arvand_invoices', JSON.stringify(invoices));
    } catch (e) {
      console.error('Failed to save invoices:', e);
    }
  }, [invoices]);

  const updateSettings = (s: SiteSettings) => {
    setSettings(s);
  };

  const resetSettings = () => {
    setSettings(defaultSiteSettings);
  };

  const setAdmin = (v: boolean) => {
    setIsAdmin(v);
  };

  // Product operations
  const addProduct = (p: Product) => {
    setProducts(prev => [...prev, p]);
  };

  const updateProduct = (p: Product) => {
    setProducts(prev => prev.map(item => item.id === p.id ? { ...p } : item));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(item => item.id !== id));
  };

  // کسر/افزایش موجودی به صورت عملیاتی (کاملاً در سطح -1 نمی‌رود)
  const adjustStock = (productId: string, delta: number) => {
    setProducts(prev => prev.map(item =>
      item.id === productId ? { ...item, stock: Math.max(0, item.stock + delta) } : item
    ));
  };

  // Order operations
  const addOrder = (o: Order) => {
    setOrders(prev => [...prev, o]);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  // Service operations
  const addServiceRequest = (s: ServiceRequest) => {
    setServiceRequests(prev => [...prev, s]);
  };

  const updateServiceStatus = (id: string, status: ServiceRequest['status']) => {
    setServiceRequests(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  const deleteServiceRequest = (id: string) => {
    setServiceRequests(prev => prev.filter(s => s.id !== id));
  };

  // Invoice operations
  const addInvoice = (inv: Invoice) => {
    setInvoices(prev => [...prev, inv]);
  };

  const updateInvoice = (inv: Invoice) => {
    setInvoices(prev => prev.map(i => i.id === inv.id ? { ...inv } : i));
  };

  const deleteInvoice = (id: string) => {
    setInvoices(prev => prev.filter(i => i.id !== id));
  };

  // شماره فاکتور یکتا و ترتیبی: INV-1403-001
  const nextInvoiceNumber = (): string => {
    const prefix = (settings.invoicePrefix || 'INV').trim().toUpperCase() || 'INV';
    const year = new Intl.DateTimeFormat('fa-IR-u-nu-latn-ca-persian', { year: 'numeric' }).format(new Date());
    const seq = invoices.reduce((max, inv) => {
      const m = inv.invoiceNumber.match(/(\d+)$/);
      return m ? Math.max(max, parseInt(m[1], 10)) : max;
    }, 0);
    return `${prefix}-${year}-${String(seq + 1).padStart(3, '0')}`;
  };

  // Cart operations — با کنترل موجودی واقعی انبار
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        // اجازه ثبت بیشتر از موجودی انبار نمی‌دهیم
        if (existing.quantity + 1 > product.stock) return prev;
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
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
    // سقف تعداد، موجودی فعلی انبار است
    const prod = products.find(p => p.id === productId);
    const maxQty = prod ? Math.max(0, prod.stock) : quantity;
    const clamped = Math.min(quantity, maxQty);
    setCart(prev => prev.map(item =>
      item.product.id === productId ? { ...item, quantity: clamped } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider value={{
      products, orders, serviceRequests, invoices, cart, isAdmin, settings,
      setAdmin, updateSettings, resetSettings,
      addProduct, updateProduct, deleteProduct, adjustStock,
      addOrder, updateOrderStatus, deleteOrder,
      addServiceRequest, updateServiceStatus, deleteServiceRequest,
      addInvoice, updateInvoice, deleteInvoice, nextInvoiceNumber,
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
