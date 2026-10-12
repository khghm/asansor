import { supabase } from './supabase';

const readAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('خواندن فایل ناموفق بود'));
    reader.readAsDataURL(file);
  });

/**
 * آپلود تصویر در باکت عمومی `assets` سوپابیس و برگرداندن URL عمومی.
 * اگر سوپابیس تنظیم نشده باشد، تصویر به صورت data URL برگردانده می‌شود.
 */
export async function uploadImage(file: File, folder: 'products' | 'branding'): Promise<string> {
  if (!supabase) return readAsDataUrl(file);

  const ext = (file.name.split('.').pop() || 'png').toLowerCase().replace(/[^a-z0-9]/g, '') || 'png';
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage
    .from('assets')
    .upload(path, file, { cacheControl: '31536000', contentType: file.type });
  if (error) throw new Error(error.message);

  return supabase.storage.from('assets').getPublicUrl(path).data.publicUrl;
}
