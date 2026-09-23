export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  featured: boolean;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: { productId: string; productName: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
}

export interface ServiceRequest {
  id: string;
  name: string;
  phone: string;
  address: string;
  serviceType: 'installation' | 'repair' | 'maintenance';
  description: string;
  status: 'new' | 'in-progress' | 'completed';
  date: string;
}

export const categories = [
  'موتور آسانسور',
  'تابلو فرمان',
  'ریلس و ریل‌براکت',
  'سیم بکسل',
  'درب آسانسور',
  'کابین و دکوراسیون',
  'قطعات الکتریکی',
  'قطعات مکانیکی',
  'سیستم ایمنی',
  'لوازم جانبی'
];

export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'موتور آسانسور ۶ نفره',
    description: 'موتور گیربکس‌دار با توان بالا مناسب ساختمان‌های مسکونی تا ۶ طبقه. این موتور با تکنولوژی پیشرفته اروپایی ساخته شده و دارای گارانتی ۲ ساله است. قدرت بالا، صدای کم و مصرف انرژی بهینه از ویژگی‌های بارز این محصول می‌باشد.',
    price: 45000000,
    category: 'موتور آسانسور',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=600&fit=crop',
    stock: 12,
    featured: true
  },
  {
    id: '2',
    name: 'تابلو فرمان آسانسور دیجیتال',
    description: 'تابلو فرمان تمام دیجیتال با قابلیت تنظیمات پیشرفته و عیب‌یابی خودکار. این تابلو فرمان با میکروکنترلرهای پیشرفته طراحی شده و قابلیت اتصال به سیستم‌های هوشمند ساختمان را دارد.',
    price: 18000000,
    category: 'تابلو فرمان',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
    stock: 25,
    featured: true
  },
  {
    id: '3',
    name: 'ریلس T89/A (۳ متر)',
    description: 'ریلس استاندارد T89/A با طول ۳ متر، ساخت ایران با کیفیت بالا. این ریلس از فولاد مخصوص ساخته شده و دارای پوشش ضد زنگ می‌باشد. مناسب برای انواع آسانسورهای مسکونی و تجاری.',
    price: 2500000,
    category: 'ریلس و ریل‌براکت',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=600&fit=crop',
    stock: 50,
    featured: false
  },
  {
    id: '4',
    name: 'سیم بکسل ۸ میلیمتر',
    description: 'سیم بکسل فولادی ۸ میلیمتر با روکش گالوانیزه، مناسب آسانسور. این سیم بکسل دارای مقاومت کششی بالا و عمر طولانی است. مطابق با استانداردهای بین‌المللی EN 81 تولید شده است.',
    price: 850000,
    category: 'سیم بکسل',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    stock: 100,
    featured: true
  },
  {
    id: '5',
    name: 'درب اتوماتیک تلسکوپی',
    description: 'درب اتوماتیک تلسکوپی با سنسور ایمنی و موتور قدرتمند. این درب دارای سیستم ضد برخورد و تشخیص مانع می‌باشد. نصب آسان و نگهداری کم از مزایای این محصول است.',
    price: 32000000,
    category: 'درب آسانسور',
    image: 'https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=800&h=600&fit=crop',
    stock: 8,
    featured: true
  },
  {
    id: '6',
    name: 'کابین استیل طلایی',
    description: 'کابین آسانسور با روکش استیل طلایی و آینه قدی، لوکس و مدرن. این کابین با طراحی خاص و متریال درجه یک ساخته شده و جلوه‌ای باشکوه به ساختمان می‌بخشد.',
    price: 55000000,
    category: 'کابین و دکوراسیون',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    stock: 5,
    featured: true
  },
  {
    id: '7',
    name: 'اینورتر آسانسور',
    description: 'اینورتر VVVF با قابلیت تنظیم سرعت و کاهش مصرف انرژی. این اینورتر با تکنولوژی پیشرفته باعث کاهش ۴۰ درصدی مصرف برق و حرکت نرم و بی‌صدا می‌شود.',
    price: 22000000,
    category: 'قطعات الکتریکی',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
    stock: 15,
    featured: false
  },
  {
    id: '8',
    name: 'ترمز الکترومکانیکی',
    description: 'ترمز الکترومکانیکی با قدرت توقف بالا و عمر طولانی. این ترمز با سیستم ایمنی پیشرفته مجهز شده و در مواقع اضطراری به سرعت عمل می‌کند.',
    price: 8500000,
    category: 'قطعات مکانیکی',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=600&fit=crop',
    stock: 20,
    featured: false
  },
  {
    id: '9',
    name: 'پاراشوت (ترمز اضطراری)',
    description: 'سیستم پاراشوت ایمنی برای جلوگیری از سقوط کابین. این سیستم حیاتی در مواقع قطع سیم بکسل یا خرابی ترمز اصلی، کابین را به صورت ایمن متوقف می‌کند.',
    price: 12000000,
    category: 'سیستم ایمنی',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=600&fit=crop',
    stock: 18,
    featured: true
  },
  {
    id: '10',
    name: 'چشمی درب آسانسور',
    description: 'چشمی فتوالکتریک برای تشخیص مانع در مسیر درب. این سنسور با دقت بالا مانع از برخورد درب با افراد یا اشیاء می‌شود و ایمنی را تضمین می‌کند.',
    price: 1500000,
    category: 'لوازم جانبی',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    stock: 40,
    featured: false
  },
  {
    id: '11',
    name: 'شستی احضار طبقات',
    description: 'شستی لمسی احضار طبقات با نمایشگر LED و طراحی مدرن. این شستی با تکنولوژی خازنی ساخته شده و دارای نور پس‌زمینه LED می‌باشد.',
    price: 3500000,
    category: 'قطعات الکتریکی',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
    stock: 30,
    featured: false
  },
  {
    id: '12',
    name: 'موتور بدون گیربکس (Gearless)',
    description: 'موتور گیرلس با راندمان بالا، صدای کم و مصرف انرژی پایین. این موتور نسل جدید آسانسورها بوده و با حذف گیربکس، راندمان را به ۹۵ درصد رسانده است.',
    price: 65000000,
    category: 'موتور آسانسور',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=600&fit=crop',
    stock: 6,
    featured: true
  }
];

export const initialOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'علی محمدی',
    customerPhone: '09121234567',
    customerAddress: 'تهران، خیابان ولیعصر، پلاک ۱۲۳',
    items: [
      { productId: '1', productName: 'موتور آسانسور ۶ نفره', quantity: 1, price: 45000000 },
      { productId: '4', productName: 'سیم بکسل ۸ میلیمتر', quantity: 4, price: 850000 }
    ],
    total: 48400000,
    status: 'processing',
    date: '1403/09/15'
  },
  {
    id: 'ORD-002',
    customerName: 'رضا احمدی',
    customerPhone: '09351234567',
    customerAddress: 'اصفهان، خیابان چهارباغ، پلاک ۴۵',
    items: [
      { productId: '2', productName: 'تابلو فرمان آسانسور دیجیتال', quantity: 1, price: 18000000 }
    ],
    total: 18000000,
    status: 'pending',
    date: '1403/09/18'
  },
  {
    id: 'ORD-003',
    customerName: 'مریم حسینی',
    customerPhone: '09131234567',
    customerAddress: 'شیراز، بلوار چمران، پلاک ۷۸',
    items: [
      { productId: '5', productName: 'درب اتوماتیک تلسکوپی', quantity: 1, price: 32000000 },
      { productId: '10', productName: 'چشمی درب آسانسور', quantity: 2, price: 1500000 }
    ],
    total: 35000000,
    status: 'delivered',
    date: '1403/09/10'
  }
];

export const initialServiceRequests: ServiceRequest[] = [
  {
    id: 'SRV-001',
    name: 'حسن کریمی',
    phone: '09121111111',
    address: 'تهران، سعادت آباد، بلوار دریا',
    serviceType: 'repair',
    description: 'آسانسور در طبقه سوم متوقف شده و حرکت نمی‌کند',
    status: 'in-progress',
    date: '1403/09/16'
  },
  {
    id: 'SRV-002',
    name: 'فاطمه رضایی',
    phone: '09352222222',
    address: 'تهران، ونک، خیابان ملاصدرا',
    serviceType: 'maintenance',
    description: 'سرویس دوره‌ای آسانسور ۸ طبقه',
    status: 'new',
    date: '1403/09/19'
  },
  {
    id: 'SRV-003',
    name: 'محمد نوری',
    phone: '09133333333',
    address: 'کرج، مهرشهر، فاز ۳',
    serviceType: 'installation',
    description: 'نصب آسانسور جدید برای ساختمان ۵ طبقه',
    status: 'new',
    date: '1403/09/20'
  }
];
