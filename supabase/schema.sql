-- =====================================================================
-- اسکیمای دیتابیس فروشگاه آسانسور آرمند (Supabase / PostgreSQL)
-- این فایل را یک‌بار در Supabase Dashboard > SQL Editor اجرا کنید.
-- قابل اجرای مجدد است (idempotent).
-- =====================================================================

-- ---------- تشخیص ادمین ----------
-- ادمین = کاربری که app_metadata.role او برابر 'admin' باشد.
-- (کاربر عادی نمی‌تواند app_metadata خودش را تغییر دهد.)
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin';
$$;

-- ---------- جداول ----------
create table if not exists public.products (
  seq bigint generated always as identity,
  id text primary key,
  name text not null check (char_length(name) between 1 and 200),
  description text not null default '',
  price bigint not null check (price >= 0),
  category text not null default '',
  image text not null default '',
  stock integer not null default 0 check (stock >= 0),
  featured boolean not null default false,
  low_stock_threshold integer check (low_stock_threshold is null or low_stock_threshold >= 0),
  cost_price bigint check (cost_price is null or cost_price >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  seq bigint generated always as identity,
  id text primary key,
  customer_name text not null,
  customer_phone text not null,
  customer_address text not null default '',
  items jsonb not null default '[]'::jsonb,
  total bigint not null default 0,
  status text not null default 'pending'
    check (status in ('pending','processing','shipped','delivered','cancelled')),
  date text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.service_requests (
  seq bigint generated always as identity,
  id text primary key,
  name text not null check (char_length(name) between 1 and 200),
  phone text not null check (char_length(phone) between 1 and 50),
  address text not null default '' check (char_length(address) <= 1000),
  service_type text not null check (service_type in ('installation','repair','maintenance')),
  description text not null default '' check (char_length(description) <= 4000),
  status text not null default 'new' check (status in ('new','in-progress','completed')),
  date text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.invoices (
  seq bigint generated always as identity,
  id text primary key,
  invoice_number text not null,
  kind text not null default 'standalone' check (kind in ('order','service','standalone')),
  ref_id text,
  date text not null default '',
  customer_name text not null,
  customer_company text,
  customer_phone text not null default '',
  customer_address text,
  items jsonb not null default '[]'::jsonb,
  discount_percent numeric not null default 0 check (discount_percent between 0 and 100),
  tax_enabled boolean not null default true,
  notes text,
  total bigint not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.expenses (
  seq bigint generated always as identity,
  id text primary key,
  title text not null,
  category text not null default '',
  amount bigint not null check (amount > 0),
  date text not null default '',
  created_at timestamptz not null default now()
);

-- تنظیمات سایت: دو ردیف
--   key = 'public'  -> قابل خواندن برای همه (نام سایت، تلفن، شبکه‌های اجتماعی ...)
--   key = 'private' -> فقط ادمین (اطلاعات بانکی، کد اقتصادی، پیشوند فاکتور)
create table if not exists public.site_settings (
  key text primary key check (key in ('public','private')),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ---------- فعال‌سازی RLS ----------
alter table public.products          enable row level security;
alter table public.orders            enable row level security;
alter table public.service_requests  enable row level security;
alter table public.invoices          enable row level security;
alter table public.expenses          enable row level security;
alter table public.site_settings     enable row level security;

-- ---------- سیاست‌ها ----------
-- products
drop policy if exists "products public read" on public.products;
create policy "products public read" on public.products
  for select using (true);
drop policy if exists "products admin write" on public.products;
create policy "products admin write" on public.products
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- orders: ثبت سفارش فقط از طریق تابع place_order؛ مدیریت فقط ادمین
drop policy if exists "orders admin all" on public.orders;
create policy "orders admin all" on public.orders
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- service_requests: همه می‌توانند درخواست جدید ثبت کنند (ولی نمی‌توانند بخوانند)
drop policy if exists "services public insert" on public.service_requests;
create policy "services public insert" on public.service_requests
  for insert to anon, authenticated with check (status = 'new');
drop policy if exists "services admin all" on public.service_requests;
create policy "services admin all" on public.service_requests
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- invoices / expenses: فقط ادمین
drop policy if exists "invoices admin all" on public.invoices;
create policy "invoices admin all" on public.invoices
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "expenses admin all" on public.expenses;
create policy "expenses admin all" on public.expenses
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- site_settings
drop policy if exists "settings public read" on public.site_settings;
create policy "settings public read" on public.site_settings
  for select using (key = 'public');
drop policy if exists "settings admin all" on public.site_settings;
create policy "settings admin all" on public.site_settings
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ---------- توابع RPC ----------

-- ثبت سفارش توسط مشتری (بدون لاگین). قیمت و موجودی از دیتابیس خوانده می‌شود،
-- نه از کلاینت؛ موجودی به صورت اتمیک کم می‌شود.
create or replace function public.place_order(
  p_customer_name text,
  p_customer_phone text,
  p_customer_address text,
  p_date text,
  p_items jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  it jsonb;
  prod public.products%rowtype;
  qty integer;
  v_total bigint := 0;
  v_items jsonb := '[]'::jsonb;
  v_id text;
begin
  if coalesce(trim(p_customer_name), '') = '' or char_length(p_customer_name) > 200 then
    raise exception 'نام مشتری نامعتبر است';
  end if;
  if coalesce(trim(p_customer_phone), '') = '' or char_length(p_customer_phone) > 50 then
    raise exception 'شماره تماس نامعتبر است';
  end if;
  if char_length(coalesce(p_customer_address, '')) > 1000 then
    raise exception 'آدرس بیش از حد طولانی است';
  end if;
  if p_items is null or jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then
    raise exception 'سبد خرید خالی است';
  end if;
  if jsonb_array_length(p_items) > 100 then
    raise exception 'تعداد اقلام بیش از حد مجاز است';
  end if;

  for it in select value from jsonb_array_elements(p_items) loop
    qty := (it ->> 'quantity')::integer;
    if qty is null or qty <= 0 or qty > 10000 then
      raise exception 'تعداد کالا نامعتبر است';
    end if;

    select * into prod from public.products where id = it ->> 'productId' for update;
    if not found then
      raise exception 'یکی از محصولات سبد دیگر موجود نیست';
    end if;
    if prod.stock < qty then
      raise exception 'موجودی «%» کافی نیست (موجود: %)', prod.name, prod.stock;
    end if;

    update public.products set stock = stock - qty where id = prod.id;
    v_total := v_total + prod.price * qty;
    v_items := v_items || jsonb_build_object(
      'productId', prod.id,
      'productName', prod.name,
      'quantity', qty,
      'price', prod.price
    );
  end loop;

  v_id := 'ORD-' || (extract(epoch from clock_timestamp()) * 1000)::bigint::text;

  insert into public.orders (id, customer_name, customer_phone, customer_address, items, total, status, date)
  values (v_id, trim(p_customer_name), trim(p_customer_phone), coalesce(trim(p_customer_address), ''),
          v_items, v_total, 'pending', coalesce(p_date, ''));

  return jsonb_build_object('id', v_id, 'total', v_total);
end;
$$;

revoke all on function public.place_order(text, text, text, text, jsonb) from public;
grant execute on function public.place_order(text, text, text, text, jsonb) to anon, authenticated;

-- تغییر اتمیک موجودی توسط ادمین
create or replace function public.adjust_stock(p_product_id text, p_delta integer)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_stock integer;
begin
  if not public.is_admin() then
    raise exception 'دسترسی غیرمجاز';
  end if;
  update public.products
     set stock = greatest(0, stock + p_delta)
   where id = p_product_id
  returning stock into v_stock;
  return v_stock;
end;
$$;

revoke all on function public.adjust_stock(text, integer) from public;
grant execute on function public.adjust_stock(text, integer) to authenticated;

-- ---------- ردیف‌های اولیه تنظیمات ----------
insert into public.site_settings (key, data) values ('public', '{}'::jsonb), ('private', '{}'::jsonb)
on conflict (key) do nothing;

-- ---------- استوریج تصاویر (محصولات و لوگو) ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('assets', 'assets', true, 2097152,
        array['image/png','image/jpeg','image/webp','image/gif','image/svg+xml'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "assets admin insert" on storage.objects;
create policy "assets admin insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'assets' and public.is_admin());

drop policy if exists "assets admin update" on storage.objects;
create policy "assets admin update" on storage.objects
  for update to authenticated using (bucket_id = 'assets' and public.is_admin());

drop policy if exists "assets admin delete" on storage.objects;
create policy "assets admin delete" on storage.objects
  for delete to authenticated using (bucket_id = 'assets' and public.is_admin());
