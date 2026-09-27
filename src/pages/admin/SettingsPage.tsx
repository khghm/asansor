import React, { useState, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { SiteSettings, defaultSiteSettings } from '../../data/store';
import {
  Save, Upload, Trash2, ImageIcon, Settings as SettingsIcon,
  Building2, Phone, Share2, RotateCcw, CheckCircle2
} from 'lucide-react';
import ConfirmModal from './ConfirmModal';

const MAX_LOGO_SIZE = 1 * 1024 * 1024; // 1MB

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  textarea?: boolean;
  dir?: 'rtl' | 'ltr';
  hint?: string;
}

const Field: React.FC<FieldProps> = ({ label, value, onChange, placeholder, textarea, dir = 'rtl', hint }) => (
  <div>
    <label className="block text-sm font-bold text-slate-700 mb-1.5">{label}</label>
    {textarea ? (
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        dir={dir}
        className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-y"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        dir={dir}
        className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
      />
    )}
    {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
  </div>
);

const SectionCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-6">
    <h3 className="flex items-center gap-2 font-black text-slate-900 mb-5 pb-4 border-b border-slate-100">
      <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
        {icon}
      </span>
      {title}
    </h3>
    <div className="space-y-5">{children}</div>
  </div>
);

const SettingsPage: React.FC = () => {
  const { settings, updateSettings, resetSettings } = useStore();
  const [form, setForm] = useState<SiteSettings>(settings);
  const [logoError, setLogoError] = useState<string>('');
  const [savedToast, setSavedToast] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const setField = (field: keyof SiteSettings) => (v: string) =>
    setForm(prev => ({ ...prev, [field]: v }));

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // اجازه می‌دهیم دوباره همان فایل انتخاب شود
    e.target.value = '';
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setLogoError('فقط فایل‌های تصویری مجاز هستند (jpg, png, webp, svg, ...)');
      return;
    }
    if (file.size > MAX_LOGO_SIZE) {
      setLogoError('حجم لوگو باید کمتر از ۱ مگابایت باشد');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setLogoError('');
      setForm(prev => ({ ...prev, logo: String(reader.result) }));
    };
    reader.onerror = () => {
      setLogoError('خواندن فایل ناموفق بود، لطفاً دوباره تلاش کنید');
    };
    reader.readAsDataURL(file);
  };

  const clearLogo = () => {
    setForm(prev => ({ ...prev, logo: '' }));
    setLogoError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      ...form,
      siteName: form.siteName.trim() || settings.siteName,
    });
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleReset = () => {
    resetSettings();
    setForm(defaultSiteSettings);
    setLogoError('');
    setResetConfirm(false);
  };

  return (
    <div className="animate-fade-in">
      {savedToast && (
        <div className="fixed top-4 left-4 z-50 px-4 py-2 sm:px-5 sm:py-3 rounded-xl shadow-xl bg-emerald-500 text-white font-medium animate-slide-in-left flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span className="text-xs sm:text-sm">تنظیمات با موفقیت ذخیره شد و در سایت اعمال گردید</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* هویت سایت */}
        <SectionCard title="هویت سایت" icon={<Building2 size={18} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="نام سایت" value={form.siteName} onChange={setField('siteName')} placeholder="مثلاً: مهندسی آرمند" hint="در هدر، فوتر و پنل مدیریت نمایش داده می‌شود" />
            <Field label="زیرعنوان سایت" value={form.siteSubtitle} onChange={setField('siteSubtitle')} placeholder="مثلاً: لوازم یدکی و خدمات تخصصی" />
          </div>
          <Field label="معرفی کوتاه شرکت" value={form.companyDescription} onChange={setField('companyDescription')} textarea placeholder="متنی که در بخش «درباره ما»ی فوتر نمایش داده می‌شود" />
        </SectionCard>

        {/* لوگوی سایت */}
        <SectionCard title="لوگوی سایت" icon={<ImageIcon size={18} />}>
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="w-full sm:w-40 h-40 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden relative flex-shrink-0">
              {form.logo ? (
                <>
                  <img src={form.logo} alt="لوگوی سایت" className="max-w-[80%] max-h-[80%] object-contain" />
                  <button
                    type="button"
                    onClick={clearLogo}
                    className="absolute top-2 left-2 w-8 h-8 rounded-lg bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-lg"
                    title="حذف لوگو"
                  >
                    <Trash2 size={14} />
                  </button>
                </>
              ) : (
                <div className="text-center px-3">
                  <ImageIcon size={32} className="mx-auto text-slate-300 mb-2" />
                  <p className="text-xs text-slate-400">هنوز لوگویی بارگذاری نشده است</p>
                </div>
              )}
            </div>

            <div className="flex-1 space-y-3">
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => logoInputRef.current?.click()}
                className="inline-flex items-center gap-2 bg-gradient-to-l from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/30"
              >
                <Upload size={16} />
                <span>{form.logo ? 'انتخاب لوگوی دیگر از روی هارد' : 'بارگذاری لوگو از روی هارد'}</span>
              </button>
              <p className="text-xs text-slate-400 leading-6">
                فرمت‌های مجاز: jpg، png، webp، svg — حداکثر حجم: ۱ مگابایت.
                لوگوی بارگذاری‌شده جایگزین آیکون پیش‌فرض در هدر و فوتر سایت می‌شود.
              </p>
              {logoError && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{logoError}</p>
              )}
              <details className="text-sm">
                <summary className="cursor-pointer text-slate-500 hover:text-blue-600 transition-colors font-medium select-none">
                  یا وارد کردن آدرس اینترنتی لوگو
                </summary>
                <div className="mt-3">
                  <Field label="آدرس URL لوگو" value={form.logo.startsWith('data:') ? '' : form.logo} onChange={setField('logo')} dir="ltr" placeholder="https://example.com/logo.png" />
                </div>
              </details>
            </div>
          </div>
        </SectionCard>

        {/* اطلاعات تماس */}
        <SectionCard title="اطلاعات تماس" icon={<Phone size={18} />}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Field label="تلفن تماس اول" value={form.phone1} onChange={setField('phone1')} dir="ltr" />
            <Field label="تلفن تماس دوم" value={form.phone2} onChange={setField('phone2')} dir="ltr" />
            <Field label="تلفن ثابت (هدر)" value={form.landline} onChange={setField('landline')} dir="ltr" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="ایمیل" value={form.email} onChange={setField('email')} dir="ltr" />
            <Field label="ساعات کاری" value={form.workingHours} onChange={setField('workingHours')} />
          </div>
          <Field label="آدرس" value={form.address} onChange={setField('address')} />
        </SectionCard>

        {/* شبکه‌های اجتماعی و کپی‌رایت */}
        <SectionCard title="شبکه‌های اجتماعی و پاورقی" icon={<Share2 size={18} />}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Field label="آدرس اینستاگرام" value={form.instagramUrl} onChange={setField('instagramUrl')} dir="ltr" placeholder="https://instagram.com/..." />
            <Field label="آدرس تلگرام" value={form.telegramUrl} onChange={setField('telegramUrl')} dir="ltr" placeholder="https://t.me/..." />
            <Field label="آدرس واتساپ" value={form.whatsappUrl} onChange={setField('whatsappUrl')} dir="ltr" placeholder="https://wa.me/..." />
          </div>
          <Field label="متن کپی‌رایت (پاورقی)" value={form.copyrightText} onChange={setField('copyrightText')} />
        </SectionCard>

        {/* ذخیره / بازگردانی */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-l from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/30"
          >
            <Save size={18} />
            <span>ذخیره تنظیمات</span>
          </button>
          <button
            type="button"
            onClick={() => setResetConfirm(true)}
            className="inline-flex items-center justify-center gap-2 border border-slate-200 text-slate-600 hover:bg-slate-100 px-6 py-3 rounded-xl font-bold text-sm transition-all"
          >
            <RotateCcw size={16} />
            <span>بازگردانی به پیش‌فرض</span>
          </button>
          <p className="text-xs text-slate-400 sm:mr-auto flex items-center gap-1.5">
            <SettingsIcon size={14} />
            تغییرات پس از ذخیره، بلافاصله در تمام صفحات سایت اعمال می‌شود.
          </p>
        </div>
      </form>

      <ConfirmModal
        isOpen={resetConfirm}
        title="بازگردانی تنظیمات"
        message="آیا از بازگردانی تمامی تنظیمات به مقادیر پیش‌فرض مطمئن هستید؟ لوگوی بارگذاری‌شده نیز حذف خواهد شد."
        onConfirm={handleReset}
        onCancel={() => setResetConfirm(false)}
        confirmText="بازگردانی"
        cancelText="انصراف"
        type="danger"
      />
    </div>
  );
};

export default SettingsPage;
