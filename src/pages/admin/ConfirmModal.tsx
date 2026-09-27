import React, { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'تأیید',
  cancelText = 'انصراف',
  type = 'danger'
}) => {
  // قفل اسکرول صفحه + بستن با Escape
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onCancel(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const typeStyles = {
    danger: { bg: 'bg-red-100', text: 'text-red-600', btn: 'bg-gradient-to-l from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-red-500/30' },
    warning: { bg: 'bg-amber-100', text: 'text-amber-600', btn: 'bg-gradient-to-l from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-amber-500/30' },
    info: { bg: 'bg-blue-100', text: 'text-blue-600', btn: 'bg-gradient-to-l from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/30' }
  };

  const style = typeStyles[type];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex sm:items-center justify-center z-50 p-4 sm:p-4 overflow-y-auto items-start">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-scale-in my-auto max-h-[92vh] flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <h3 className="text-lg font-black text-slate-900">{title}</h3>
          <button onClick={onCancel} className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className={`${style.bg} p-3 rounded-xl flex-shrink-0`}>
              <AlertTriangle className={style.text} size={24} />
            </div>
            <p className="text-slate-600 leading-7 text-sm">{message}</p>
          </div>
        </div>
        <div className="flex gap-3 p-5 border-t border-slate-200 bg-slate-50 rounded-b-2xl pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
          <button
            onClick={onConfirm}
            className={`flex-1 ${style.btn} active:scale-[0.98] text-white px-4 py-3.5 sm:py-3 rounded-xl font-bold transition-all shadow-lg min-h-[48px]`}
          >
            {confirmText}
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 px-4 py-3.5 sm:py-3 rounded-xl font-medium transition-all min-h-[48px]"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
