# asansor
آسانسور آرمند

## راه‌اندازی بک‌اند (Supabase)

1. در [supabase.com](https://supabase.com) یک پروژه بسازید.
2. در **SQL Editor** به ترتیب این دو فایل را اجرا کنید:
   - `supabase/schema.sql` (جداول، سیاست‌های امنیتی RLS، توابع، استوریج)
   - `supabase/seed.sql` (محصولات اولیه)
3. در **Authentication → Users** یک کاربر (ایمیل/رمز) بسازید، سپس در SQL Editor او را ادمین کنید:
   ```sql
   update auth.users
      set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'
    where email = 'YOUR-EMAIL';
   ```
   (در **Authentication → Providers → Email** گزینه ثبت‌نام عمومی را غیرفعال کنید.)
4. `.env.example` را به `.env` کپی کنید و `VITE_SUPABASE_URL` و `VITE_SUPABASE_ANON_KEY` را از **Project Settings → API** پر کنید.
5. `npm install && npm run dev`

### نکات امنیتی
- فقط کاربری که `app_metadata.role = 'admin'` دارد به سفارشات، فاکتورها، هزینه‌ها و اطلاعات بانکی دسترسی دارد.
- مشتری بدون ورود فقط می‌تواند محصولات را ببیند، درخواست خدمات ثبت کند و از طریق تابع `place_order` سفارش بدهد (قیمت و موجودی سمت سرور بررسی می‌شود).
- فقط `anon key` در فرانت‌اند استفاده می‌شود؛ هرگز `service_role key` را در پروژه نگذارید.
