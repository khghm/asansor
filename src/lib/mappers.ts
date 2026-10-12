import type {
  Product, Order, ServiceRequest, Invoice, Expense, SiteSettings
} from '../data/store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>;

// ---------- Products ----------
export const productFromRow = (r: Row): Product => ({
  id: r.id,
  name: r.name,
  description: r.description ?? '',
  price: Number(r.price),
  category: r.category ?? '',
  image: r.image ?? '',
  stock: Number(r.stock),
  featured: !!r.featured,
  lowStockThreshold: r.low_stock_threshold ?? undefined,
  costPrice: r.cost_price ?? undefined
});

export const productToRow = (p: Product) => ({
  id: p.id,
  name: p.name,
  description: p.description,
  price: Math.round(p.price),
  category: p.category,
  image: p.image,
  stock: Math.max(0, Math.round(p.stock)),
  featured: p.featured,
  low_stock_threshold: p.lowStockThreshold ?? null,
  cost_price: p.costPrice ?? null
});

// ---------- Orders ----------
export const orderFromRow = (r: Row): Order => ({
  id: r.id,
  customerName: r.customer_name,
  customerPhone: r.customer_phone,
  customerAddress: r.customer_address ?? '',
  items: r.items ?? [],
  total: Number(r.total),
  status: r.status,
  date: r.date ?? ''
});

export const orderToRow = (o: Order) => ({
  id: o.id,
  customer_name: o.customerName,
  customer_phone: o.customerPhone,
  customer_address: o.customerAddress,
  items: o.items,
  total: Math.round(o.total),
  status: o.status,
  date: o.date
});

// ---------- Service requests ----------
export const serviceFromRow = (r: Row): ServiceRequest => ({
  id: r.id,
  name: r.name,
  phone: r.phone,
  address: r.address ?? '',
  serviceType: r.service_type,
  description: r.description ?? '',
  status: r.status,
  date: r.date ?? ''
});

export const serviceToRow = (s: ServiceRequest) => ({
  id: s.id,
  name: s.name,
  phone: s.phone,
  address: s.address,
  service_type: s.serviceType,
  description: s.description,
  status: s.status,
  date: s.date
});

// ---------- Invoices ----------
export const invoiceFromRow = (r: Row): Invoice => ({
  id: r.id,
  invoiceNumber: r.invoice_number,
  kind: r.kind,
  refId: r.ref_id ?? undefined,
  date: r.date ?? '',
  customerName: r.customer_name,
  customerCompany: r.customer_company ?? undefined,
  customerPhone: r.customer_phone ?? '',
  customerAddress: r.customer_address ?? undefined,
  items: r.items ?? [],
  discountPercent: Number(r.discount_percent ?? 0),
  taxEnabled: !!r.tax_enabled,
  notes: r.notes ?? undefined,
  total: Number(r.total)
});

export const invoiceToRow = (i: Invoice) => ({
  id: i.id,
  invoice_number: i.invoiceNumber,
  kind: i.kind,
  ref_id: i.refId ?? null,
  date: i.date,
  customer_name: i.customerName,
  customer_company: i.customerCompany ?? null,
  customer_phone: i.customerPhone,
  customer_address: i.customerAddress ?? null,
  items: i.items,
  discount_percent: i.discountPercent,
  tax_enabled: i.taxEnabled,
  notes: i.notes ?? null,
  total: Math.round(i.total)
});

// ---------- Expenses ----------
export const expenseFromRow = (r: Row): Expense => ({
  id: r.id,
  title: r.title,
  category: r.category ?? '',
  amount: Number(r.amount),
  date: r.date ?? ''
});

export const expenseToRow = (e: Expense) => ({
  id: e.id,
  title: e.title,
  category: e.category,
  amount: Math.round(e.amount),
  date: e.date
});

// ---------- Settings (split into public / private rows) ----------
export const PRIVATE_SETTING_KEYS: (keyof SiteSettings)[] = [
  'invoicePrefix', 'taxNumber', 'economicCode',
  'bankName', 'accountNumber', 'cardNumber', 'shebaNumber'
];

export const splitSettings = (s: SiteSettings) => {
  const pub: Row = {};
  const priv: Row = {};
  (Object.keys(s) as (keyof SiteSettings)[]).forEach(k => {
    (PRIVATE_SETTING_KEYS.includes(k) ? priv : pub)[k] = s[k];
  });
  return { pub, priv };
};
