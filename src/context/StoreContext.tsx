import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Order, ServiceRequest, initialProducts, initialOrders, initialServiceRequests } from '../data/store';

interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreContextType {
  products: Product[];
  orders: Order[];
  serviceRequests: ServiceRequest[];
  cart: CartItem[];
  isAdmin: boolean;
  setAdmin: (v: boolean) => void;
  addProduct: (p: Product) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  addOrder: (o: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  deleteOrder: (id: string) => void;
  addServiceRequest: (s: ServiceRequest) => void;
  updateServiceStatus: (id: string, status: ServiceRequest['status']) => void;
  deleteServiceRequest: (id: string) => void;
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

  // Cart operations
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
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
    setCart(prev => prev.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider value={{
      products, orders, serviceRequests, cart, isAdmin,
      setAdmin,
      addProduct, updateProduct, deleteProduct,
      addOrder, updateOrderStatus, deleteOrder,
      addServiceRequest, updateServiceStatus, deleteServiceRequest,
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
