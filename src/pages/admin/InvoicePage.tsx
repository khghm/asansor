import React, { useMemo, useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Invoice, InvoiceItem, Order, ServiceRequest, SiteSettings,
  calcInvoiceTotals, calcInvoiceLineTotal, numberToPersianWords, TAX_RATE
} from '../../data/store';
import {
  Plus, Trash2, Printer, X, Save, Search, FileText, ShoppingCart,
  Wrench, Package, AlertTriangle, Receipt, Pencil
} from 'lucide-react';
import ConfirmModal from './ConfirmModal';

const toFa = (n: number | string) => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
const faNum = (n: number) => toFa(new Intl.NumberFormat('en-US').format(n));
const todayJalali = () => new Date().toLocaleDateString('fa-IR');

const serviceTypeLabel: Record<ServiceRequest['serviceType'], string> = {
  installation: 'نصب',
  repair: 'تعمیر',
  maintenance: 'سرویس و نگهداری'
};

const kindLabel: Record<Invoice['kind'], string> = {
  order: 'فاکتور سفارش',
  service: 'فاکتور خدمات',
  standalone: 'فاکتور دستی'
};

// ---------- تبدیل سفارش / درخواست خدمت به آیتم‌های فاکتور ----------
const SERVICE_UNIT_PRICES: Record<ServiceRequest['serviceType'], number> = {
  installation: 15000000,
  repair: 4500000,
  maintenance: 3000000
};

const orderToInvoiceFields = (order: Order): Partial<Invoice> => ({
  kind: 'order',
  refId: order.id,
  customerName: order.customerName,
  customerPhone: order.customerPhone,
  customerAddress: order.customerAddress,
  date: order.date,
  items: order.items.map((it, i) => ({
    id: `oi-${i}`,
    description: it.productName,
    type: 'product' as const,
    unit: 'عدد',
    quantity: it.quantity,
    unitPrice: it.price,
    productId: it.productId
  }))
});

const serviceToInvoiceFields = (req: ServiceRequest): Partial<Invoice> => ({
  kind: 'service',
  refId: req.id,
  customerName: req.name,
  customerPhone: req.phone,
  customerAddress: req.address,
  date: req.date,
  items: [{
    id: 'si-0',
    description: `${serviceTypeLabel[req.serviceType]} — ${req.description}`,
    type: 'service' as const,
    unit: 'دستگاه/مورد',
    quantity: 1,
    unitPrice: SERVICE_UNIT_PRICES[req.serviceType] ?? 0
  }]
});

// ================= برگه چاپی فاکتور =================
interface PrintSheetProps {
  invoice: Invoice;
  settings: SiteSettings;
}

const PrintSheet: React.FC<PrintSheetProps> = ({ invoice, settings }) => {
  const totals = calcInvoiceTotals(invoice.items, invoice.discountPercent, invoice.taxEnabled);
  return (
    <div dir="rtl" className="print-sheet bg-white text-slate-900 p-6 sm:p-8 text-sm leading-relaxed">
      {/* سربرگ */}
      <div className="flex items-start justify-between gap-4 border-b-2 border-slate-800 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-lg border border-slate-300 overflow-hidden flex items-center justify-center bg-white flex-shrink-0">
            {settings.logo ? (
              <img src={settings.logo} alt={settings.siteName} className="max-w-full max-h-full object-contain" />
            ) : (
              <Receipt size={26} className="text-slate-500" />
            )}
          </div>
          <div>
            <h1 className="text-lg font-black">{settings.siteName}</h1>
            <p className="text-xs text-slate-600">{settings.siteSubtitle}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {[settings.landline && `تلفن: ${settings.landline}`, settings.email].filter(Boolean).join(' | ')}
            </p>
            <p className="text-[11px] text-slate-500">{settings.address}</p>
          </div>
        </div>
        <div className="text-left shrink-0">
          <h2 className="text-base font-black mb-2">فاکتور فروش</h2>
          <table className="text-xs">
            <tbody>
              <tr><td className="text-slate-500 pl-2 py-0.5">شماره فاکتور:</td><td className="font-bold">{toFa(invoice.invoiceNumber)}</td></tr>
              <tr><td className="text-slate-500 py-0.5">تاریخ صدور:</td><td className="font-bold">{toFa(invoice.date)}</td></tr>
              <tr><td className="text-slate-500 py-0.5">نوع:</td><td className="font-bold">{toFa(kindLabel[invoice.kind])}</td></tr>
              {invoice.refId && <tr><td className="text-slate-500 py-0.5">مرجع:</td><td className="font-bold">{toFa(invoice.refId)}</td></tr>}
              {settings.taxNumber && <tr><td className="text-slate-500 py-0.5">شناسه:</td><td className="font-bold">{toFa(settings.taxNumber)}</td></tr>}
              {settings.economicCode && <tr><td className="text-slate-500 py-0.5">کد اقتصادی:</td><td className="font-bold">{toFa(settings.economicCode)}</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* مشخصات مشتری */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 mb-5 border border-slate-200 rounded-md p-3 text-xs bg-slate-50 print:bg-transparent">
        <p><span className="text-slate-500">مشتری: </span><span className="font-bold">{invoice.customerName || '—'}</span></p>
        {invoice.customerCompany && <p><span className="text-slate-500">شرکت: </span><span className="font-bold">{invoice.customerCompany}</span></p>}
        <p><span className="text-slate-500">تلفن: </span><span className="font-bold">{toFa(invoice.customerPhone || '—')}</span></p>
        {invoice.customerAddress && <p className="sm:col-span-2"><span className="text-slate-500">آدرس: </span>{invoice.customerAddress}</p>}
      </div>

      {/* جدول اقلام */}
      <table className="w-full border-collapse text-xs mb-5">
        <thead>
          <tr className="bg-slate-100 print:bg-gray-100">
            <th className="border border-slate-300 px-2 py-2 text-center w-8">ردیف</th>
            <th className="border border-slate-300 px-2 py-2 text-right">شرح کالا / خدمت</th>
            <th className="border border-slate-300 px-2 py-2 text-center w-16">نوع</th>
            <th className="border border-slate-300 px-2 py-2 text-center w-14">واحد</th>
            <th className="border border-slate-300 px-2 py-2 text-center w-14">تعداد</th>
            <th className="border border-slate-300 px-2 py-2 text-center">بهای واحد (ریال)</th>
            <th className="border border-slate-300 px-2 py-2 text-center">مبلغ کل (ریال)</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, i) => (
            <tr key={item.id}>
              <td className="border border-slate-300 px-2 py-1.5 text-center">{toFa(i + 1)}</td>
              <td className="border border-slate-300 px-2 py-1.5">{item.description}</td>
              <td className="border border-slate-300 px-2 py-1.5 text-center">{item.type === 'product' ? 'کالا' : 'خدمت'}</td>
              <td className="border border-slate-300 px-2 py-1.5 text-center">{item.unit}</td>
              <td className="border border-slate-300 px-2 py-1.5 text-center">{toFa(item.quantity)}</td>
              <td className="border border-slate-300 px-2 py-1.5 text-center">{faNum(item.unitPrice)}</td>
              <td className="border border-slate-300 px-2 py-1.5 text-center font-bold">{faNum(calcInvoiceLineTotal(item))}</td>
            </tr>
          ))}
          {invoice.items.length === 0 && (
            <tr><td colSpan={7} className="border border-slate-300 px-2 py-4 text-center text-slate-400">قلمی ثبت نشده است</td></tr>
          )}
        </tbody>
      </table>

      {/* جمع‌ها */}
      <div className="flex flex-col sm:flex-row justify-between gap-5 mb-5">
        <div className="flex-1 space-y-2">
          {invoice.notes && (
            <div className="border border-slate-200 rounded-md p-3 text-xs">
              <p className="font-bold mb-1">یادداشت‌ها:</p>
              <p className="text-slate-600 whitespace-pre-line">{invoice.notes}</p>
            </div>
          )}
          <div className="border border-slate-200 rounded-md p-3 text-xs space-y-1">
            <p className="font-bold mb-1">اطلاعات پرداخت</p>
            {settings.bankName && <p><span className="text-slate-500">بانک: </span>{settings.bankName}</p>}
            {settings.accountNumber && <p><span className="text-slate-500">شماره حساب: </span><span className="font-bold">{toFa(settings.accountNumber)}</span></p>}
            {settings.cardNumber && <p><span className="text-slate-500">شماره کارت: </span><span className="font-bold">{toFa(settings.cardNumber)}</span></p>}
            {settings.shebaNumber && <p><span className="text-slate-500">شبا: </span><span className="font-bold break-all">{toFa(settings.shebaNumber)}</span></p>}
            {!settings.accountNumber && !settings.cardNumber && !settings.shebaNumber && (
              <p className="text-slate-400">اطلاعات بانکی در تنظیمات سایت تکمیل نشده است.</p>
            )}
          </div>
        </div>
        <table className="w-full sm:w-72 text-xs self-start">
          <tbody>
            <tr><td className="border border-slate-300 px-3 py-1.5 text-slate-600">جمع کل اقلام</td><td className="border border-slate-300 px-3 py-1.5 text-left font-medium">{faNum(totals.subtotal)}</td></tr>
            {totals.discountAmount > 0 && (
              <tr><td className="border border-slate-300 px-3 py-1.5 text-slate-600">خصم ({toFa(invoice.discountPercent)}٪)</td><td className="border border-slate-300 px-3 py-1.5 text-left text-emerald-700 font-medium">({faNum(totals.discountAmount)})</td></tr>
            )}
            {invoice.taxEnabled && (
              <tr><td className="border border-slate-300 px-3 py-1.5 text-slate-600">مالیات بر ارزش افزوده ({toFa(Math.round(TAX_RATE * 100))}٪)</td><td className="border border-slate-300 px-3 py-1.5 text-left font-medium">{faNum(totals.taxAmount)}</td></tr>
            )}
            <tr className="bg-slate-100 print:bg-gray-100">
              <td className="border border-slate-800 px-3 py-2 font-black">مبلغ قابل پرداخت (ریال)</td>
              <td className="border border-slate-800 px-3 py-2 text-left font-black">{faNum(totals.grandTotal)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* مبلغ حروف */}
      <div className="border border-slate-300 rounded-md p-3 text-xs mb-6 bg-blue-50/50 print:bg-transparent">
        <span className="text-slate-500 font-bold">مبلغ به حروف: </span>
        <span className="font-bold">{numberToPersianWords(totals.grandTotal)} ریال</span>
      </div>

      {/* امضاها */}
      <div className="grid grid-cols-3 gap-6 text-[11px] mt-10">
        {['امضای فروشنده', 'مهر و امضای تحویل‌گیرنده', 'مدیر مالی'].map(t => (
          <div key={t} className="text-center">
            <p className="text-slate-600 mb-10">{t}</p>
            <div className="border-t border-slate-400 pt-1 text-slate-400">نام و امضا</div>
          </div>
        ))}
      </div>

      <p className="text-center text-[10px] text-slate-400 mt-6 border-t border-slate-200 pt-2">
        {settings.copyrightText} — این فاکتور توسط سامانه فروش {settings.siteName} صادر شده و بدون مهر معتبر نیست.
      </p>
    </div>
  );
};

// ================= فرم سازنده/ویرایشگر فاکتور =================
interface InvoiceBuilderProps {
  initial?: Partial<Invoice>;
  editingId?: string;
  onCancel: () => void;
  onSaved: (inv: Invoice) => void;
}

const emptyItem = (): InvoiceItem => ({
  id: `it-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  description: '',
  type: 'product',
  unit: 'عدد',
  quantity: 1,
  unitPrice: 0
});

const InvoiceBuilder: React.FC<InvoiceBuilderProps> = ({ initial, editingId, onCancel, onSaved }) => {
  const { products, settings, nextInvoiceNumber, adjustStock } = useStore();
  const [customerName, setCustomerName] = useState(initial?.customerName ?? '');
  const [customerCompany, setCustomerCompany] = useState(initial?.customerCompany ?? '');
  const [customerPhone, setCustomerPhone] = useState(initial?.customerPhone ?? '');
  const [customerAddress, setCustomerAddress] = useState(initial?.customerAddress ?? '');
  const [date, setDate] = useState(initial?.date ?? todayJalali());
  const [items, setItems] = useState<InvoiceItem[]>(initial?.items?.length ? initial.items : [emptyItem()]);
  const [discountPercent, setDiscountPercent] = useState(initial?.discountPercent ?? 0);
  const [taxEnabled, setTaxEnabled] = useState(initial?.taxEnabled ?? true);
  const [notes, setNotes] = useState(initial?.notes ?? '');
  const [error, setError] = useState('');

  const totals = useMemo(() => calcInvoiceTotals(items, discountPercent, taxEnabled), [items, discountPercent, taxEnabled]);

  const updateItem = (id: string, patch: Partial<InvoiceItem>) =>
    setItems(prev => prev.map(it => (it.id === id ? { ...it, ...patch } : it)));

  const addItem = () => setItems(prev => [...prev, emptyItem()]);
  const removeItem = (id: string) => setItems(prev => (prev.length > 1 ? prev.filter(it => it.id !== id) : prev));

  const addProductItem = (productId: string) => {
    const p = products.find(x => x.id === productId);
    if (!p) return;
    const blankIdx = items.findIndex(it => !it.description.trim());
    const filled: InvoiceItem = {
      id: blankIdx >= 0 ? items[blankIdx].id : emptyItem().id,
      description: p.name,
      type: 'product',
      unit: 'عدد',
      quantity: 1,
      unitPrice: p.price,
      productId: p.id
    };
    if (blankIdx >= 0) updateItem(filled.id, filled);
    else setItems(prev => [...prev, filled]);
  };

  const handleSave = (deductStock: boolean) => {
    if (!customerName.trim()) { setError('نام مشتری الزامی است'); return; }
    const validItems = items.filter(it => it.description.trim() && it.quantity > 0 && it.unitPrice >= 0);
    if (validItems.length === 0) { setError('حداقل یک قلم با شرح، تعداد و قیمت معتبر وارد کنید'); return; }

    const inv: Invoice = {
      id: editingId ?? `INV-${Date.now()}`,
      invoiceNumber: initial?.invoiceNumber ?? nextInvoiceNumber(),
      kind: initial?.kind ?? 'standalone',
      refId: initial?.refId,
      date,
      customerName: customerName.trim(),
      customerCompany: customerCompany.trim() || undefined,
      customerPhone: customerPhone.trim(),
      customerAddress: customerAddress.trim() || undefined,
      items: validItems,
      discountPercent: Math.min(Math.max(discountPercent || 0, 0), 100),
      taxEnabled,
      notes: notes.trim() || undefined,
      total: totals.grandTotal
    };

    // کسر عملیاتی موجودی انبار برای اقلام «کالا» هنگام صدور فاکتور
    if (deductStock && !editingId) {
      validItems.forEach(it => {
        if (it.type === 'product' && it.productId) adjustStock(it.productId, -it.quantity);
      });
    }
    onSaved(inv);
  };

  const inputCls = 'w-full text-sm border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white';

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[94vh] overflow-y-auto animate-scale-in">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <FileText className="text-white" size={20} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                {editingId ? 'ویرایش فاکتور' : initial?.kind && initial.kind !== 'standalone' ? `صدور ${kindLabel[initial.kind]} از ${initial.refId}` : 'فاکتور جدید'}
              </h3>
              <p className="text-xs text-slate-400">{initial?.invoiceNumber ? `شماره: ${toFa(initial.invoiceNumber)}` : 'شماره فاکتور هنگام ذخیره صادر می‌شود'}</p>
            </div>
          </div>
          <button onClick={onCancel} className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {/* مشخصات */}
          <div>
            <h4 className="font-black text-slate-800 mb-3 text-sm">مشخصات فاکتور</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">نام مشتری *</label>
                <input value={customerName} onChange={e => setCustomerName(e.target.value)} className={inputCls} placeholder="نام و نام خانوادگی" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">نام شرکت (اختیاری)</label>
                <input value={customerCompany} onChange={e => setCustomerCompany(e.target.value)} className={inputCls} placeholder="شرکت / کارفرما" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">تلفن</label>
                <input value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} dir="ltr" className={inputCls} placeholder="09xxxxxxxxx" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">تاریخ صدور</label>
                <input value={date} onChange={e => setDate(e.target.value)} className={inputCls} placeholder="1403/09/25" />
              </div>
              <div className="sm:col-span-2 lg:col-span-4">
                <label className="block text-xs font-bold text-slate-600 mb-1">آدرس</label>
                <input value={customerAddress} onChange={e => setCustomerAddress(e.target.value)} className={inputCls} placeholder="آدرس تحویل" />
              </div>
            </div>
          </div>

          {/* اقلام */}
          <div>
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <h4 className="font-black text-slate-800 text-sm">اقلام فاکتور</h4>
              <div className="flex items-center gap-2">
                <select
                  value=""
                  onChange={e => { addProductItem(e.target.value); e.target.value = ''; }}
                  className="text-xs border border-slate-200 rounded-xl px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">+ افزودن محصول از انبار…</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} — {new Intl.NumberFormat('fa-IR').format(p.price)} ت (موجودی: {toFa(p.stock)})</option>
                  ))}
                </select>
                <button onClick={addItem} className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-xl transition-colors">
                  <Plus size={14} /> قلم دستی
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {items.map((it, idx) => (
                <div key={it.id} className="grid grid-cols-12 gap-2 items-end bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <div className="col-span-12 lg:col-span-4">
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">شرح کالا / خدمت</label>
                    <input value={it.description} onChange={e => updateItem(it.id, { description: e.target.value })} className={inputCls} placeholder={`قلم ${idx + 1}`} />
                  </div>
                  <div className="col-span-4 lg:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">نوع</label>
                    <select value={it.type} onChange={e => updateItem(it.id, { type: e.target.value as InvoiceItem['type'] })} className={inputCls}>
                      <option value="product">کالا</option>
                      <option value="service">خدمت</option>
                    </select>
                  </div>
                  <div className="col-span-4 lg:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">واحد</label>
                    <select value={it.unit} onChange={e => updateItem(it.id, { unit: e.target.value })} className={inputCls}>
                      {['عدد', 'متر', 'کیلومتر', 'شاخه', 'بسته', 'ساعت', 'جلسه', 'دستگاه/مورد', 'پروژه'].map(u => (
                        <option key={u} value={u}>{u}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">تعداد</label>
                    <input type="number" min="1" value={it.quantity} onChange={e => updateItem(it.id, { quantity: Math.max(1, Number(e.target.value)) })} className={inputCls} dir="ltr" />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">بهای واحد</label>
                    <input type="number" min="0" value={it.unitPrice} onChange={e => updateItem(it.id, { unitPrice: Math.max(0, Number(e.target.value)) })} className={inputCls} dir="ltr" />
                  </div>
                  <div className="col-span-10 lg:col-span-1 text-xs font-bold text-slate-700 pb-2">
                    {faNum(calcInvoiceLineTotal(it))}
                  </div>
                  <div className="col-span-2 lg:col-span-1 pb-1">
                    <button onClick={() => removeItem(it.id)} disabled={items.length === 1} title="حذف قلم"
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* جمع‌ها */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">درصد تخفیف</label>
                  <input type="number" min="0" max="100" value={discountPercent}
                    onChange={e => setDiscountPercent(Math.min(100, Math.max(0, Number(e.target.value))))}
                    className={inputCls} dir="ltr" />
                </div>
                <label className="flex items-center gap-2 mt-6 text-sm font-medium text-slate-700 cursor-pointer select-none">
                  <input type="checkbox" checked={taxEnabled} onChange={e => setTaxEnabled(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  اعمال مالیات بر ارزش افزوده ({toFa(Math.round(TAX_RATE * 100))}٪)
                </label>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">یادداشت‌ها</label>
                <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)} className={`${inputCls} resize-none`}
                  placeholder="شرایط گارانتی، نحوه ارسال و ..." />
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm space-y-2 self-start">
              <div className="flex justify-between text-slate-600"><span>جمع اقلام:</span><span className="font-bold">{faNum(totals.subtotal)} ریال</span></div>
              {totals.discountAmount > 0 && <div className="flex justify-between text-emerald-700"><span>خصم ({toFa(discountPercent)}٪):</span><span className="font-bold">({faNum(totals.discountAmount)})</span></div>}
              {taxEnabled && <div className="flex justify-between text-slate-600"><span>مالیات ارزش افزوده:</span><span className="font-bold">{faNum(totals.taxAmount)}</span></div>}
              <div className="border-t border-slate-300 pt-2 flex justify-between font-black text-slate-900">
                <span>قابل پرداخت:</span><span>{faNum(totals.grandTotal)} ریال</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-5 border-t border-slate-200 pt-2">
                معادل حروف: {numberToPersianWords(totals.grandTotal)} ریال
              </p>
            </div>
          </div>

          {error && <p className="text-sm font-bold text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">{error}</p>}

          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button onClick={() => handleSave(false)}
              className="flex-1 bg-slate-800 hover:bg-slate-900 text-white px-5 py-3 rounded-xl font-bold transition-all text-sm">
              پیش‌نمایش و ذخیره (بدون کسر موجودی)
            </button>
            {!editingId && (
              <button onClick={() => handleSave(true)}
                className="flex-1 bg-gradient-to-l from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 text-sm">
                <Save size={16} /> قطعی کردن و کسر از موجودی انبار
              </button>
            )}
            <button onClick={onCancel} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-medium transition-all text-sm">
              انصراف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ================= صفحه اصلی بخش فاکتورها =================
const InvoicePage: React.FC<{ showToast?: (m: string, t?: 'success' | 'error' | 'info') => void }> = ({ showToast }) => {
  const { invoices, orders, serviceRequests, settings, addInvoice, updateInvoice, deleteInvoice } = useStore();
  const [search, setSearch] = useState('');
  const [builderInitial, setBuilderInitial] = useState<Partial<Invoice> | null>(null);
  const [editingId, setEditingId] = useState<string | undefined>();
  const [printTarget, setPrintTarget] = useState<Invoice | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Invoice | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim();
    const list = [...invoices].reverse();
    if (!q) return list;
    return list.filter(inv =>
      inv.customerName.includes(q) || inv.invoiceNumber.includes(q) || (inv.refId ?? '').includes(q)
    );
  }, [invoices, search]);

  const startNew = () => { setEditingId(undefined); setBuilderInitial(null); };
  const startEdit = (inv: Invoice) => { setEditingId(inv.id); setBuilderInitial(inv); };
  const fromOrder = (o: Order) => { setEditingId(undefined); setBuilderInitial(orderToInvoiceFields(o)); };
  const fromService = (s: ServiceRequest) => { setEditingId(undefined); setBuilderInitial(serviceToInvoiceFields(s)); };

  const handleSaved = (inv: Invoice) => {
    if (editingId) {
      updateInvoice(inv);
      showToast?.('فاکتور با موفقیت بروزرسانی شد');
    } else {
      addInvoice(inv);
      showToast?.(`فاکتور ${inv.invoiceNumber} با موفقیت صادر شد`);
    }
    setBuilderInitial(null);
    setEditingId(undefined);
    setPrintTarget(inv);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteInvoice(deleteTarget.id);
      showToast?.('فاکتور حذف شد', 'info');
      setDeleteTarget(null);
    }
  };

  return (
    <div className="animate-fade-in space-y-5">
      {/* نوار ابزار */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-sm text-slate-500 font-medium">
          <span className="text-slate-900 font-bold">{toFa(invoices.length)}</span> فاکتور صادر شده
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="جستجوی شماره فاکتور یا مشتری…"
              className="text-sm border border-slate-200 rounded-xl pr-9 pl-3 py-2.5 bg-white outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
            />
          </div>
          <button onClick={startNew}
            className="inline-flex items-center gap-2 bg-gradient-to-l from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/30">
            <Plus size={16} /> فاکتور جدید
          </button>
        </div>
      </div>

      {/* صدور از سفارشات و خدمات */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
          <h3 className="font-black text-slate-900 mb-3 flex items-center gap-2 text-sm">
            <ShoppingCart size={16} className="text-blue-600" /> صدور فاکتور از سفارشات
          </h3>
          <div className="space-y-2 max-h-56 overflow-y-auto pl-1">
            {orders.slice().reverse().map(o => (
              <div key={o.id} className="flex items-center justify-between gap-2 p-2.5 bg-slate-50 rounded-xl">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">{o.customerName} — {toFa(o.id)}</p>
                  <p className="text-[11px] text-slate-500">{toFa(o.date)} | {faNum(o.total)} ت</p>
                </div>
                <button onClick={() => fromOrder(o)}
                  className="shrink-0 text-[11px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                  <Receipt size={12} /> صدور فاکتور
                </button>
              </div>
            ))}
            {orders.length === 0 && <p className="text-xs text-slate-400 text-center py-4">سفارشی وجود ندارد</p>}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
          <h3 className="font-black text-slate-900 mb-3 flex items-center gap-2 text-sm">
            <Wrench size={16} className="text-emerald-600" /> صدور فاکتور از درخواست‌های خدمات
          </h3>
          <div className="space-y-2 max-h-56 overflow-y-auto pl-1">
            {serviceRequests.slice().reverse().map(s => (
              <div key={s.id} className="flex items-center justify-between gap-2 p-2.5 bg-slate-50 rounded-xl">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">{s.name} — {toFa(s.id)}</p>
                  <p className="text-[11px] text-slate-500">{serviceTypeLabel[s.serviceType]} | {toFa(s.date)}</p>
                </div>
                <button onClick={() => fromService(s)}
                  className="shrink-0 text-[11px] font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                  <Receipt size={12} /> صدور فاکتور
                </button>
              </div>
            ))}
            {serviceRequests.length === 0 && <p className="text-xs text-slate-400 text-center py-4">درخواست خدمتی وجود ندارد</p>}
          </div>
        </div>
      </div>

      {/* لیست فاکتورها */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-right px-4 py-3 text-xs font-bold text-slate-500">شماره</th>
                <th className="text-right px-4 py-3 text-xs font-bold text-slate-500">نوع</th>
                <th className="text-right px-4 py-3 text-xs font-bold text-slate-500 hidden md:table-cell">مشتری</th>
                <th className="text-right px-4 py-3 text-xs font-bold text-slate-500 hidden sm:table-cell">تاریخ</th>
                <th className="text-right px-4 py-3 text-xs font-bold text-slate-500">مبلغ (ریال)</th>
                <th className="text-right px-4 py-3 text-xs font-bold text-slate-500">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(inv => (
                <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3 text-sm font-bold text-slate-800">{toFa(inv.invoiceNumber)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[11px] px-2 py-1 rounded-full font-bold inline-flex items-center gap-1 ${
                      inv.kind === 'order' ? 'bg-blue-50 text-blue-700' :
                      inv.kind === 'service' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {inv.kind === 'order' ? <ShoppingCart size={11} /> : inv.kind === 'service' ? <Wrench size={11} /> : <Package size={11} />}
                      {kindLabel[inv.kind]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 hidden md:table-cell">{inv.customerName}</td>
                  <td className="px-4 py-3 text-sm text-slate-500 hidden sm:table-cell">{toFa(inv.date)}</td>
                  <td className="px-4 py-3 text-sm font-bold text-slate-800">{faNum(inv.total)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setPrintTarget(inv)} title="مشاهده و چاپ" className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Printer size={15} /></button>
                      <button onClick={() => startEdit(inv)} title="ویرایش" className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><Pencil size={15} /></button>
                      <button onClick={() => setDeleteTarget(inv)} title="حذف" className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <FileText size={44} className="mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500 text-sm">{invoices.length === 0 ? 'هنوز فاکتوری صادر نشده است' : 'نتیجه‌ای برای جستجو یافت نشد'}</p>
          </div>
        )}
      </div>

      {/* فرم سازنده */}
      {(builderInitial !== null || editingId) && (
        <InvoiceBuilder
          initial={builderInitial ?? undefined}
          editingId={editingId}
          onCancel={() => { setBuilderInitial(null); setEditingId(undefined); }}
          onSaved={handleSaved}
        />
      )}

      {/* مودال پیش‌نمایش و چاپ */}
      {printTarget && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-6">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[94vh] flex flex-col print-modal">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 print:hidden">
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm">
                <Printer size={16} className="text-blue-600" /> پیش‌نمایش فاکتور {toFa(printTarget.invoiceNumber)}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 bg-gradient-to-l from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/30">
                  <Printer size={15} /> چاپ فاکتور
                </button>
                <button onClick={() => setPrintTarget(null)} className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                  <X size={18} />
                </button>
              </div>
            </div>
            <div className="overflow-y-auto p-3 sm:p-6 bg-slate-100 print:bg-white print:p-0 rounded-b-2xl">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden mx-auto max-w-[210mm] print:shadow-none print:rounded-none">
                <PrintSheet invoice={printTarget} settings={settings} />
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteTarget !== null}
        title="حذف فاکتور"
        message={`آیا از حذف فاکتور «${deleteTarget ? toFa(deleteTarget.invoiceNumber) : ''}» مطمئن هستید؟ این عمل قابل بازگشت نیست.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
        confirmText="حذف"
        cancelText="انصراف"
        type="danger"
      />

      {invoices.some(inv => inv.kind === 'order' && !orders.some(o => o.id === inv.refId)) && (
        <p className="flex items-center gap-1.5 text-[11px] text-amber-600">
          <AlertTriangle size={12} /> برخی فاکتورها به سفارشاتی ارجاع می‌دهند که حذف شده‌اند.
        </p>
      )}
    </div>
  );
};

export default InvoicePage;
