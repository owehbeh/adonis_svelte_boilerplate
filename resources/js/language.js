export let s = localStorage.getItem('language')
if (!s) {
  localStorage.setItem('language', 'en')
  s = localStorage.getItem('language')
}

export const switchLanguage = () => {
  if (s === 'ar') s = 'en'
  else s = 'ar'
  localStorage.setItem('language', s)
  document.location.reload()
}

export const txt = (text) => {
  return lan[s][text]
}

export let lan = {
  en: {
    'Hello,': 'Hello,',
    'Dashboard': 'Dashboard',
    'Requests': 'Requests',
    'Orders': 'Orders',
    'Delivery': 'Delivery',
    'Tracking': 'Tracking',
    'Customers': 'Customers',
    'Suppliers': 'Suppliers',
    'Users': 'Users',
    'Settings': 'Settings',
    'Problems': 'Problems',
    'Logout': 'Logout',
    'Login': 'Login',
    'Forgot Password?': 'Forgot Password?',
    'Email': 'Email',
    'Password': 'Password',
    'Login to your account': 'Login to your account',
  },
  ar: {
    'Hello,': 'مرحبا،',
    'Dashboard': 'لوحة القيادة',
    'Requests': 'طلبات',
    'Orders': 'أوامر',
    'Delivery': 'التسليم',
    'Tracking': 'التتبع',
    'Customers': 'العملاء',
    'Suppliers': 'الموردون',
    'Users': 'المستخدمون',
    'Settings': 'الإعدادات',
    'Problems': 'المشاكل',
    'Logout': 'تسجيل الخروج',
    'Login': 'دخول',
    'Forgot Password?': 'هل نسيت كلمة المرور؟',
    'Email': 'بريد إلكتروني',
    'Password': 'كلمة المرور',
    'Login to your account': 'تسجيل الدخول إلى حسابك',
  },
}
