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
    description: 'موتور گیربکس‌دار با توان بالا مناسب ساختمان‌های مسکونی تا ۶ طبقه',
    price: 45000000,
    category: 'موتور آسانسور',
    image: 'https://image.qwenlm.ai/generated-images/77b053a1-6541-4d60-a845-6858b0cebbe2/_result.png',
    stock: 12,
    featured: true
  },
  {
    id: '2',
    name: 'تابلو فرمان آسانسور دیجیتال',
    description: 'تابلو فرمان تمام دیجیتال با قابلیت تنظیمات پیشرفته و عیب‌یابی خودکار',
    price: 18000000,
    category: 'تابلو فرمان',
    image: 'https://image.qwenlm.ai/generated-images/a5b5b534-8b3c-454b-9b78-132eb8721c5d/_result.png',
    stock: 25,
    featured: true
  },
  {
    id: '3',
    name: 'ریلس T89/A (۳ متر)',
    description: 'ریلس استاندارد T89/A با طول ۳ متر، ساخت ایران با کیفیت بالا',
    price: 2500000,
    category: 'ریلس و ریل‌براکت',
    image: 'https://image.qwenlm.ai/generated-images/86d6fc9f-83c3-4970-b384-a181365ac824/_result.png',
    stock: 50,
    featured: false
  },
  {
    id: '4',
    name: 'سیم بکسل ۸ میلیمتر',
    description: 'سیم بکسل فولادی ۸ میلیمتر با روکش گالوانیزه، مناسب آسانسور',
    price: 850000,
    category: 'سیم بکسل',
    image: 'https://image.qwenlm.ai/generated-images/84120c7b-25c8-4f69-8309-d1ea163e7daa/_result.png',
    stock: 100,
    featured: true
  },
  {
    id: '5',
    name: 'درب اتوماتیک تلسکوپی',
    description: 'درب اتوماتیک تلسکوپی با سنسور ایمنی و موتور قدرتمند',
    price: 32000000,
    category: 'درب آسانسور',
    image: 'https://image.qwenlm.ai/generated-images/d24ca3b7-3da0-41b1-8dff-5737335beb3f/_result.png',
    stock: 8,
    featured: true
  },
  {
    id: '6',
    name: 'کابین استیل طلایی',
    description: 'کابین آسانسور با روکش استیل طلایی و آینه قدی، لوکس و مدرن',
    price: 55000000,
    category: 'کابین و دکوراسیون',
    image: 'https://image.qwenlm.ai/generated-images/6c4f2564-e89b-4156-8499-7b6190acb000/_result.png',
    stock: 5,
    featured: true
  },
  {
    id: '7',
    name: 'اینورتر آسانسور',
    description: 'اینورتر VVVF با قابلیت تنظیم سرعت و کاهش مصرف انرژی',
    price: 22000000,
    category: 'قطعات الکتریکی',
    image: 'https://image.qwenlm.ai/generated-images/bbaf738d-3363-4d99-acee-769bfe58d658/_result.png',
    stock: 15,
    featured: false
  },
  {
    id: '8',
    name: 'ترمز الکترومکانیکی',
    description: 'ترمز الکترومکانیکی با قدرت توقف بالا و عمر طولانی',
    price: 8500000,
    category: 'قطعات مکانیکی',
    image: 'https://image.qwenlm.ai/generated-images/e1abafa0-8f55-4c30-b1e1-9e99628be4d1/_result.png',
    stock: 20,
    featured: false
  },
  {
    id: '9',
    name: 'پاراشوت (ترمز اضطراری)',
    description: 'سیستم پاراشوت ایمنی برای جلوگیری از سقوط کابین',
    price: 12000000,
    category: 'سیستم ایمنی',
    image: 'https://image.qwenlm.ai/generated-images/24aee46e-47d7-4abb-87bb-f7350c0795a4/_result.png',
    stock: 18,
    featured: true
  },
  {
    id: '10',
    name: 'چشمی درب آسانسور',
    description: 'چشمی فتوالکتریک برای تشخیص مانع در مسیر درب',
    price: 1500000,
    category: 'لوازم جانبی',
    image: 'https://image.qwenlm.ai/generated-images/24aee46e-47d7-4abb-87bb-f7350c0795a4/_result.png',
    stock: 40,
    featured: false
  },
  {
    id: '11',
    name: 'شستی احضار طبقات',
    description: 'شستی لمسی احضار طبقات با نمایشگر LED و طراحی مدرن',
    price: 3500000,
    category: 'قطعات الکتریکی',
    image: 'https://image.qwenlm.ai/generated-images/a5b5b534-8b3c-454b-9b78-132eb8721c5d/_result.png',
    stock: 30,
    featured: false
  },
  {
    id: '12',
    name: 'موتور بدون گیربکس (Gearless)',
    description: 'موتور گیرلس با راندمان بالا، صدای کم و مصرف انرژی پایین',
    price: 65000000,
    category: 'موتور آسانسور',
    image: 'https://image.qwenlm.ai/generated-images/d3c175c7-1d01-4d0b-8f5d-2790895f5ad7/_result.png',
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
