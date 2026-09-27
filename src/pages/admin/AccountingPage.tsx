import React, { useMemo, useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { calcInvoiceTotals, TAX_RATE } from '../../data/store';
import {
  Calculator, TrendingUp, Wallet, Scale, Landmark,
  Percent, Boxes, ArrowUpRight, ArrowDownLeft, ChevronDown, ChevronUp,
  BarChart3, PieChart, AlertTriangle, Receipt
} from 'lucide-react';

const toFa = (n: number | string) => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
const faNum = (n: number) => toFa(new Intl.NumberFormat('en-US').format(Math.round(n)));

// تبدیل تاریخ شمسی «۱۴۰۳/۰۹/۲۵» به کلید ماهانه «۱۴۰۳/۰۹»
const monthKey = (jalaliDate: string): string => {
  const m = jalaliDate.trim().match(/(\d{4})\/(\d{1,2})/);
  return m ? `${m[1]}/${m[2].padStart(2, '0')}` : 'نامشخص';
};

const JALALI_MONTHS = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
const monthLabel = (key: string) => {
  const [y, mm] = key.split('/');
  const idx = Number(mm) - 1;
  return idx >= 0 && idx < 12 ? `${JALALI_MONTHS[idx]} ${y}` : key;
};

type SectionId = 'overview' | 'profit' | 'sales' | 'cashflow' | 'balance' | 'tax';

interface SectionProps {
  open: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
  children: React.ReactNode;
  badge?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ open, onToggle, icon, title, subtitle, color, children, badge }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
    <button onClick={onToggle}
      className="w-full flex items-center justify-between gap-3 p-4 sm:p-5 hover:bg-slate-50/70 transition-colors text-right min-h-[64px]">
      <div className="flex items-center gap-3 min-w-0">
        <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg shrink-0`}>
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="font-black text-slate-900 text-sm sm:text-base truncate">{title}</h3>
          <p className="text-[11px] sm:text-xs text-slate-500 truncate">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {badge}
        {open ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
      </div>
    </button>
    {open && <div className="border-t border-slate-100 p-4 sm:p-5 animate-fade-in">{children}</div>}
  </div>
);

const StatCard: React.FC<{ label: string; value: string; sub?: string; tone: 'pos' | 'neg' | 'neutral' | 'warn' }> = ({ label, value, sub, tone }) => {
  const tones = {
    pos: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    neg: 'text-red-700 bg-red-50 border-red-100',
    warn: 'text-amber-700 bg-amber-50 border-amber-100',
    neutral: 'text-slate-800 bg-slate-50 border-slate-100',
  };
  return (
    <div className={`rounded-xl border p-3.5 sm:p-4 ${tones[tone]}`}>
      <p className="text-[11px] sm:text-xs font-bold opacity-70 mb-1">{label}</p>
      <p className="text-sm sm:text-lg font-black leading-6 break-words">{value}</p>
      {sub && <p className="text-[10px] sm:text-xs mt-1 opacity-60">{sub}</p>}
    </div>
  );
};

const Row: React.FC<{ cells: React.ReactNode[]; head?: boolean; total?: boolean }> = ({ cells, head, total }) => (
  <div className={`grid grid-cols-12 gap-2 px-3 py-2.5 text-xs sm:text-sm ${
    head ? 'bg-slate-100 font-bold text-slate-600 rounded-t-xl' :
    total ? 'bg-blue-50/70 font-black text-slate-900 border-t-2 border-blue-200 rounded-b-xl' :
    'border-b border-slate-100 text-slate-700'
  }`}>
    {cells.map((c, i) => {
      const spans = ['col-span-5 sm:col-span-4', 'col-span-7 sm:col-span-3', 'col-span-6 sm:col-span-3', 'col-span-6 sm:col-span-2'];
      return <div key={i} className={`${spans[Math.min(i, spans.length - 1)]} ${i > 0 ? 'text-left tabular-nums' : ''} break-words`}>{c}</div>;
    })}
  </div>
);

const AccountingPage: React.FC = () => {
  const { products, orders, invoices } = useStore();
  const [openSection, setOpenSection] = useState<SectionId>('overview');

  const toggle = (id: SectionId) => setOpenSection(cur => (cur === id ? ('' as SectionId) : id));

  // ---------- هزینه‌های عملیاتی (دفتر کل) ----------
  const [expenses, setExpenses] = useState<{ id: string; title: string; category: string; amount: number; date: string }[]>(() => {
    try { return JSON.parse(localStorage.getItem('armand_expenses') || '[]'); } catch { return []; }
  });
  const persistExpenses = (list: typeof expenses) => {
    setExpenses(list);
    try { localStorage.setItem('armand_expenses', JSON.stringify(list)); } catch { /* ignore */ }
  };

  // ---------- موتور محاسبات مالی ----------
  const data = useMemo(() => {
    // فروش محقق = فاکتورهای صادر شده (نهایی‌شده با قطعی کردن یا پیش‌نمایش)
    const salesInvoices = invoices.map(inv => {
      const t = calcInvoiceTotals(inv.items, inv.discountPercent, inv.taxEnabled);
      return { inv, t };
    });
    const grossSales = salesInvoices.reduce((s, x) => s + x.t.subtotal, 0);
    const discounts = salesInvoices.reduce((s, x) => s + x.t.discountAmount, 0);
    const taxesCollected = salesInvoices.reduce((s, x) => s + x.t.taxAmount, 0);
    const netSales = grossSales - discounts;
    const totalRevenue = salesInvoices.reduce((s, x) => s + x.inv.total, 0);

    // بهای تمام‌شده کالای فروش‌رفته (COGS) از طریق قیمت تمام‌شده محصولات
    let cogs = 0;
    for (const { inv } of salesInvoices) {
      for (const it of inv.items) {
        if (it.type === 'product' && it.productId) {
          const p = products.find(pr => pr.id === it.productId);
          if (p) cogs += Math.round((p.costPrice ?? 0) * it.quantity);
        }
      }
    }
    const grossProfit = netSales - cogs;
    const marginPct = netSales > 0 ? (grossProfit / netSales) * 100 : 0;

    // سفارشات به تفکیک وضعیت (جریان فروش)
    const activeOrders = orders.filter(o => o.status !== 'cancelled');
    const cancelledOrders = orders.filter(o => o.status === 'cancelled');
    const pendingOrdersValue = orders.filter(o => o.status === 'pending').reduce((s, o) => s + o.total, 0);
    const processingOrdersValue = orders.filter(o => o.status === 'processing').reduce((s, o) => s + o.total, 0);
    const shippedOrdersValue = orders.filter(o => o.status === 'shipped').reduce((s, o) => s + o.total, 0);
    const deliveredOrdersValue = orders.filter(o => o.status === 'delivered').reduce((s, o) => s + o.total, 0);
    const receivables = pendingOrdersValue + processingOrdersValue + shippedOrdersValue; // مطالبات معوق ( وصول نشده )
    const ordersRevenue = activeOrders.reduce((s, o) => s + o.total, 0);

    // موجودی انبار به بها و به قیمت فروش
    const stockCostValue = products.reduce((s, p) => s + (p.costPrice ?? 0) * p.stock, 0);
    const stockSaleValue = products.reduce((s, p) => s + p.price * p.stock, 0);
    const stockPotentialProfit = stockSaleValue - stockCostValue;

    // ترازنامه ساده: دارایی‌ها در برابر بدهی‌های مالیاتی
    const assets = totalRevenue + stockCostValue;              // دارایی در گردش + موجودی به بها
    const liabilities = taxesCollected;                          // مالیات ارزش افزوده پرداختنی
    const equity = assets - liabilities;

    // سود هر فاکتور
    const invoiceProfits = salesInvoices.map(({ inv, t }) => {
      let cost = 0;
      for (const it of inv.items) {
        if (it.type === 'product' && it.productId) {
          const p = products.find(pr => pr.id === it.productId);
          if (p) cost += Math.round((p.costPrice ?? 0) * it.quantity);
        }
      }
      return { inv, profit: (t.subtotal - t.discountAmount) - cost };
    });
    const lossInvoices = invoiceProfits.filter(x => x.profit < 0);

    // گزارش ماهانه (درآمد/سود/تعداد فاکتور)
    const monthly = new Map<string, { revenue: number; tax: number; count: number }>();
    for (const { inv, t } of salesInvoices) {
      const k = monthKey(inv.date);
      const cur = monthly.get(k) ?? { revenue: 0, tax: 0, count: 0 };
      monthly.set(k, { revenue: cur.revenue + inv.total, tax: cur.tax + t.taxAmount, count: cur.count + 1 });
    }
    const monthlyRows = [...monthly.entries()].sort((a, b) => a[0].localeCompare(b[0]));
    const maxMonthly = Math.max(1, ...monthlyRows.map(([, v]) => v.revenue));

    // پرتفوی مشتریان
    const custMap = new Map<string, { total: number; count: number }>();
    for (const { inv } of salesInvoices) {
      const cur = custMap.get(inv.customerName) ?? { total: 0, count: 0 };
      custMap.set(inv.customerName, { total: cur.total + inv.total, count: cur.count + 1 });
    }
    const topCustomers = [...custMap.entries()].sort((a, b) => b[1].total - a[1].total).slice(0, 6);

    // پرتفوی محصولات (پرفروش‌ترین بر اساس مبلغ)
    const prodMap = new Map<string, { qty: number; amount: number }>();
    for (const { inv } of salesInvoices) {
      for (const it of inv.items) {
        const cur = prodMap.get(it.description) ?? { qty: 0, amount: 0 };
        prodMap.set(it.description, { qty: cur.qty + it.quantity, amount: cur.amount + it.quantity * it.unitPrice });
      }
    }
    const topProducts = [...prodMap.entries()].sort((a, b) => b[1].amount - a[1].amount).slice(0, 6);

    // هزینه‌های عملیاتی (دفتر کل)
    const expensesTotal = expenses.reduce((s, e) => s + e.amount, 0);
    const opProfit = grossProfit - expensesTotal;
    const breakEvenPerMonth = monthlyRows.length > 0 ? expensesTotal / monthlyRows.length : 0;

    return {
      grossSales, discounts, taxesCollected, netSales, totalRevenue, cogs, grossProfit, marginPct,
      ordersRevenue, receivables, deliveredOrdersValue, cancelledOrders,
      stockCostValue, stockSaleValue, stockPotentialProfit,
      assets, liabilities, equity,
      monthlyRows, maxMonthly, topCustomers, topProducts,
      invoiceProfits, lossInvoices, expensesTotal, opProfit, breakEvenPerMonth,
    };
  }, [products, orders, invoices, expenses]);

  // ---------- ثبت هزینه جدید ----------
  const [expForm, setExpForm] = useState({ title: '', category: 'اداری', amount: '', date: new Date().toLocaleDateString('fa-IR') });
  const addExpense = () => {
    const amt = Number(expForm.amount);
    if (!expForm.title.trim() || !amt || amt <= 0) return;
    persistExpenses([{ id: String(Date.now()), title: expForm.title.trim(), category: expForm.category, amount: Math.round(amt), date: expForm.date }, ...expenses]);
    setExpForm({ title: '', category: expForm.category, amount: '', date: expForm.date });
  };
  const expenseCategories = ['اداری', 'اجاره', 'حقوق', 'حمل و نقل', 'بازاریابی', 'تعمیرات', 'متفرقه'];

  const percentOf = (part: number, whole: number) => (whole > 0 ? Math.min(100, Math.abs(part) / whole * 100) : 0);

  return (
    <div className="animate-fade-in space-y-4">
      {/* هدر بخش */}
      <div className="bg-gradient-to-l from-slate-900 via-slate-800 to-indigo-900 rounded-2xl p-5 sm:p-6 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
            <Calculator size={22} />
          </div>
          <div>
            <h2 className="font-black text-lg">مرکز حسابداری هوشمند</h2>
            <p className="text-xs text-slate-300">تحلیل سود، جریان نقدینگی، ترازنامه و P&amp;L — خودکار از فاکتورها و سفارشات</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur">
            <p className="text-[10px] text-slate-300 font-bold mb-0.5">درآمد کل (ریال)</p>
            <p className="text-sm sm:text-base font-black tabular-nums">{faNum(data.totalRevenue)}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur">
            <p className="text-[10px] text-slate-300 font-bold mb-0.5">سود ناخالص (ریال)</p>
            <p className={`text-sm sm:text-base font-black tabular-nums ${data.grossProfit >= 0 ? 'text-emerald-300' : 'text-red-300'}`}>{faNum(data.grossProfit)}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur">
            <p className="text-[10px] text-slate-300 font-bold mb-0.5">حاشیه سود</p>
            <p className="text-sm sm:text-base font-black tabular-nums">{toFa(data.marginPct.toFixed(1))}٪</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur">
            <p className="text-[10px] text-slate-300 font-bold mb-0.5">مطالبات وصول‌نشده</p>
            <p className="text-sm sm:text-base font-black tabular-nums text-amber-300">{faNum(data.receivables)}</p>
          </div>
        </div>
      </div>

      {/* هشدار زیان */}
      {data.lossInvoices.length > 0 && (
        <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
          <AlertTriangle size={18} className="shrink-0 mt-0.5" />
          <p className="font-medium leading-6">
            {toFa(data.lossInvoices.length)} فاکتور با سود منفی (زیان‌ده) شناسایی شد — در بخش «سود و زیان» جزئیات را ببینید.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {/* ---------------- نمای کلی ---------------- */}
        <Section open={openSection === 'overview'} onToggle={() => toggle('overview')}
          icon={<BarChart3 size={20} />} title="نمای کلی مالی" subtitle="خلاصه وضعیت درآمد، هزینه و دارایی"
          color="from-blue-500 to-indigo-600">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5">
            <StatCard label="فروش ناخالص (اقلام)" value={`${faNum(data.grossSales)} ریال`} tone="neutral" />
            <StatCard label="تخفیفات اعمال‌شده" value={`${faNum(data.discounts)} ریال`} tone="warn" />
            <StatCard label="خالص فروش (بدون مالیات)" value={`${faNum(data.netSales)} ریال`} tone="neutral" />
            <StatCard label="مالیات جمع‌آوری‌شده" value={`${faNum(data.taxesCollected)} ریال`} tone="warn" sub="بدهی به سازمان امور مالیاتی" />
            <StatCard label="ارزش موجودی انبار (بها)" value={`${faNum(data.stockCostValue)} ریال`} tone="pos" />
            <StatCard label="سود بالقوه موجودی" value={`${faNum(data.stockPotentialProfit)} ریال`} tone="pos" />
          </div>
          <div className="mt-4">
            <p className="text-xs font-bold text-slate-600 mb-2">ترکیب درآمد (نسبت اجزا به درآمد کل)</p>
            <div className="h-4 rounded-full overflow-hidden flex bg-slate-100">
              <div className="bg-emerald-500 h-full" style={{ width: `${percentOf(data.netSales, data.totalRevenue || 1)}%` }} title="فروش خالص" />
              <div className="bg-amber-400 h-full" style={{ width: `${percentOf(data.taxesCollected, data.totalRevenue || 1)}%` }} title="مالیات" />
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5"><i className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> فروش خالص</span>
              <span className="flex items-center gap-1.5"><i className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> مالیات ارزش افزوده</span>
            </div>
          </div>
        </Section>

        {/* ---------------- سود و زیان ---------------- */}
        <Section open={openSection === 'profit'} onToggle={() => toggle('profit')}
          icon={<TrendingUp size={20} />} title="صورت سود و زیان (P&L)" subtitle="گزارش آماده برای ارائه به مدیر و حسابدار"
          color="from-emerald-500 to-teal-600">
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <Row head cells={['شرح', 'مبلغ (ریال)', '٪ از فروش', '']} />
            <Row cells={['فروش ناخالص اقلام فاکتورها', faNum(data.grossSales), '۱۰۰٪', '']} />
            <Row cells={['کسر: تخفیفات', `(${faNum(data.discounts)})`, toFa(percentOf(data.discounts, data.grossSales || 1).toFixed(1)) + '٪', '']} />
            <Row cells={['خالص فروش', faNum(data.netSales), toFa(percentOf(data.netSales, data.grossSales || 1).toFixed(1)) + '٪', '']} />
            <Row cells={['کسر: بهای تمام‌شده کالای فروش‌رفته (COGS)', `(${faNum(data.cogs)})`, toFa(percentOf(data.cogs, data.grossSales || 1).toFixed(1)) + '٪', '']} />
            <Row cells={['سود ناخالص', faNum(data.grossProfit), toFa(data.marginPct.toFixed(1)) + '٪', '']} />
            <Row cells={['کسر: هزینه‌های عملیاتی (دفتر کل)', `(${faNum(data.expensesTotal)})`, '', '']} />
            <Row total cells={['سود عملیاتی', faNum(data.opProfit), '', '']} />
          </div>
          <div className="grid grid-cols-2 gap-2.5 mt-4">
            <StatCard label="نقطه سربه‌سر ماهانه (پوشش هزینه‌ها)" value={`${faNum(data.breakEvenPerMonth)} ریال`} tone="warn" />
            <StatCard label="فاکتورهای زیان‌ده" value={`${toFa(data.lossInvoices.length)} فاکتور`} tone={data.lossInvoices.length ? 'neg' : 'pos'} />
          </div>
          {data.lossInvoices.length > 0 && (
            <div className="mt-3 space-y-2">
              {data.lossInvoices.slice(0, 5).map(({ inv, profit }) => (
                <div key={inv.id} className="flex items-center justify-between gap-2 bg-red-50 border border-red-100 rounded-xl px-3.5 py-2.5 text-xs">
                  <span className="font-bold text-red-700 truncate">فاکتور {toFa(inv.invoiceNumber)} — {inv.customerName}</span>
                  <span className="font-black text-red-700 shrink-0 tabular-nums">{faNum(profit)} ریال</span>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* ---------------- فروش و مشتریان ---------------- */}
        <Section open={openSection === 'sales'} onToggle={() => toggle('sales')}
          icon={<PieChart size={20} />} title="تحلیل فروش، مشتریان و محصولات" subtitle="روند ماهانه، پرتفوی مشتری و کالاهای پرفروش"
          color="from-violet-500 to-purple-600">
          <p className="text-xs font-bold text-slate-600 mb-2">روند درآمد ماهانه (ریال)</p>
          {data.monthlyRows.length === 0 ? (
            <p className="text-xs text-slate-400 py-3">هنوز فاکتوری برای تحلیل وجود ندارد.</p>
          ) : (
            <div className="space-y-2 mb-5">
              {data.monthlyRows.map(([k, v]) => (
                <div key={k} className="flex items-center gap-2 text-xs">
                  <span className="w-24 sm:w-28 shrink-0 font-bold text-slate-600 truncate">{monthLabel(k)}</span>
                  <div className="flex-1 h-5 bg-slate-100 rounded-lg overflow-hidden">
                    <div className="h-full bg-gradient-to-l from-violet-500 to-purple-500 rounded-lg" style={{ width: `${percentOf(v.revenue, data.maxMonthly)}%` }} />
                  </div>
                  <span className="w-28 sm:w-36 shrink-0 text-left tabular-nums text-slate-700 font-bold">{faNum(v.revenue)} <span className="text-slate-400 font-normal">({toFa(v.count)} فاکتور)</span></span>
                </div>
              ))}
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold text-slate-600 mb-2 flex items-center gap-1.5"><Receipt size={13} /> بالاترین مشتریان</p>
              {data.topCustomers.length === 0 ? <p className="text-xs text-slate-400">داده‌ای نیست</p> : data.topCustomers.map(([name, v]) => (
                <div key={name} className="flex items-center justify-between gap-2 py-2 border-b border-slate-100 text-xs">
                  <span className="truncate font-medium text-slate-700">{name} <span className="text-slate-400">({toFa(v.count)} فاکتور)</span></span>
                  <span className="font-black tabular-nums shrink-0">{faNum(v.total)}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-600 mb-2 flex items-center gap-1.5"><Boxes size={13} /> کالاهای پرفروش</p>
              {data.topProducts.length === 0 ? <p className="text-xs text-slate-400">داده‌ای نیست</p> : data.topProducts.map(([name, v]) => (
                <div key={name} className="flex items-center justify-between gap-2 py-2 border-b border-slate-100 text-xs">
                  <span className="truncate font-medium text-slate-700">{name} <span className="text-slate-400">×{toFa(v.qty)}</span></span>
                  <span className="font-black tabular-nums shrink-0">{faNum(v.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ---------------- جریان نقدینگی ---------------- */}
        <Section open={openSection === 'cashflow'} onToggle={() => toggle('cashflow')}
          icon={<Wallet size={20} />} title="جریان نقدینگی" subtitle="ورودی/خروجی، مطالبات و تعهدات"
          color="from-cyan-500 to-blue-600">
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            <StatCard label="ورودی نقدی (فاکتورهای صادره)" value={`${faNum(data.totalRevenue)} ریال`} tone="pos" />
            <StatCard label="خروجی (هزینه‌های ثبت‌شده)" value={`${faNum(data.expensesTotal)} ریال`} tone="neg" />
            <StatCard label="مطالبات از مشتریان (سفارشات باز)" value={`${faNum(data.receivables)} ریال`} tone="warn" />
            <StatCard label="نقدینگی خالص" value={`${faNum(data.totalRevenue - data.expensesTotal)} ریال`} tone={data.totalRevenue - data.expensesTotal >= 0 ? 'pos' : 'neg'} />
          </div>
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <Row head cells={['عنوان', 'ورودی', 'خروجی', 'مانده']} />
            <Row cells={[
              <span key="a" className="flex items-center gap-1.5"><ArrowUpRight size={13} className="text-emerald-600" /> وصول فاکتورها</span>,
              faNum(data.totalRevenue), '—', faNum(data.totalRevenue)
            ]} />
            <Row cells={[
              <span key="b" className="flex items-center gap-1.5"><ArrowDownLeft size={13} className="text-red-500" /> هزینه‌های عملیاتی</span>,
              '—', faNum(data.expensesTotal), `(${faNum(data.expensesTotal)})`
            ]} />
            <Row cells={[
              <span key="c" className="flex items-center gap-1.5"><Percent size={13} className="text-amber-500" /> مالیات پرداختنی</span>,
              '—', faNum(data.taxesCollected), `(${faNum(data.taxesCollected)})`
            ]} />
            <Row total cells={['جریان آزاد پس از کسر تعهدات', '', '', faNum(data.totalRevenue - data.expensesTotal - data.taxesCollected)]} />
          </div>
          <p className="text-[11px] text-slate-400 mt-2 leading-5">
            مبنای محاسبه: اسنادی (صدور فاکتور). سفارشات تأییدنشده تا زمان صدور فاکتور در «مطالبات» نمایش داده می‌شوند.
          </p>
        </Section>

        {/* ---------------- ترازنامه ---------------- */}
        <Section open={openSection === 'balance'} onToggle={() => toggle('balance')}
          icon={<Scale size={20} />} title="ترازنامه ساده‌شده" subtitle="دارایی‌ها = بدهی‌ها + حقوق صاحبان سهام"
          color="from-indigo-500 to-blue-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
              <p className="font-black text-emerald-800 text-sm mb-3">دارایی‌ها</p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span>حساب‌های دریافتنی / فروش</span><b className="tabular-nums">{faNum(data.totalRevenue)}</b></div>
                <div className="flex justify-between"><span>موجودی انبار (بها)</span><b className="tabular-nums">{faNum(data.stockCostValue)}</b></div>
                <div className="flex justify-between border-t border-emerald-200 pt-2 text-sm"><span>جمع دارایی‌ها</span><b className="tabular-nums">{faNum(data.assets)}</b></div>
              </div>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50/50 p-4">
              <p className="font-black text-red-800 text-sm mb-3">بدهی‌ها و حقوق صاحبان</p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span>مالیات ارزش افزوده پرداختنی</span><b className="tabular-nums">{faNum(data.liabilities)}</b></div>
                <div className="flex justify-between"><span>حقوق صاحبان سهام (خالص)</span><b className="tabular-nums">{faNum(data.equity)}</b></div>
                <div className="flex justify-between border-t border-red-200 pt-2 text-sm"><span>جمع بدهی + حقوق</span><b className="tabular-nums">{faNum(data.liabilities + data.equity)}</b></div>
              </div>
            </div>
          </div>
          <p className={`mt-3 text-xs font-bold flex items-center gap-1.5 ${Math.abs(data.assets - (data.liabilities + data.equity)) < 1 ? 'text-emerald-600' : 'text-red-600'}`}>
            <Landmark size={14} />
            {Math.abs(data.assets - (data.liabilities + data.equity)) < 1 ? 'ترازنامه متوازن است ✓ (دارایی‌ها = بدهی‌ها + حقوق صاحبان)' : 'عدم توازن در ترازنامه — اسناد را بررسی کنید.'}
          </p>
        </Section>

        {/* ---------------- دفتر کل هزینه‌ها ---------------- */}
        <Section open={openSection === 'tax'} onToggle={() => toggle('tax')}
          icon={<Landmark size={20} />} title="مالیات و دفتر کل هزینه‌ها" subtitle={`ارزش افزوده ${toFa(Math.round(TAX_RATE * 100))}٪ + ثبت هزینه‌های عملیاتی`}
          color="from-amber-500 to-orange-600">
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            <StatCard label="مالیات جمع‌آوری‌شده از مشتریان" value={`${faNum(data.taxesCollected)} ریال`} tone="warn" />
            <StatCard label="جمع هزینه‌های عملیاتی" value={`${faNum(data.expensesTotal)} ریال`} tone="neg" />
          </div>

          {/* فرم ثبت هزینه */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 mb-4">
            <p className="text-xs font-black text-slate-700 mb-3">ثبت هزینه جدید (خروجی نقد)</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <input value={expForm.title} onChange={e => setExpForm({ ...expForm, title: e.target.value })}
                placeholder="شرح هزینه" className="col-span-2 sm:col-span-1 text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-white outline-none focus:ring-2 focus:ring-blue-500" />
              <select value={expForm.category} onChange={e => setExpForm({ ...expForm, category: e.target.value })}
                className="text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-white outline-none focus:ring-2 focus:ring-blue-500">
                {expenseCategories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <input type="number" min="0" inputMode="numeric" value={expForm.amount} onChange={e => setExpForm({ ...expForm, amount: e.target.value })} dir="ltr"
                placeholder="مبلغ (ریال)" className="text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-white outline-none focus:ring-2 focus:ring-blue-500" />
              <div className="flex gap-2 col-span-2 sm:col-span-1">
                <input value={expForm.date} onChange={e => setExpForm({ ...expForm, date: e.target.value })} dir="ltr"
                  placeholder="۱۴۰۳/۰۹/۲۵" className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-white outline-none focus:ring-2 focus:ring-blue-500" />
                <button onClick={addExpense}
                  className="shrink-0 inline-flex items-center gap-1 bg-gradient-to-l from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 active:scale-[0.97] text-white px-3.5 rounded-xl font-bold text-xs transition-all min-h-[44px]">
                  ثبت
                </button>
              </div>
            </div>
          </div>

          {expenses.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-4">هنوز هزینه‌ای ثبت نشده است. با ثبت هزینه‌ها، سود عملیاتی و نقطه سربه‌سر به‌روز می‌شود.</p>
          ) : (
            <div className="space-y-2 max-h-72 overflow-y-auto pl-1">
              {expenses.map(e => (
                <div key={e.id} className="flex items-center justify-between gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3.5 py-2.5 text-xs">
                  <div className="min-w-0">
                    <p className="font-bold text-slate-800 truncate">{e.title}</p>
                    <p className="text-slate-500">{e.category} | {toFa(e.date)}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <b className="tabular-nums text-red-600">{faNum(e.amount)}</b>
                    <button onClick={() => persistExpenses(expenses.filter(x => x.id !== e.id))} title="حذف"
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center">×</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>
      </div>

      <p className="text-[11px] text-slate-400 text-center leading-5 px-2">
        تمامی مبالغ به ریال محاسبه می‌شوند. این ماژول به صورت خودکار از فاکتورها، سفارشات، قیمت تمام‌شده محصولات و هزینه‌های ثبت‌شده تغذیه می‌شود و جایگزین نرم‌افزار رسمی حسابداری نیست.
      </p>
    </div>
  );
};

export default AccountingPage;
