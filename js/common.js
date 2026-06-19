// Shared Common Utilities for NammaSarathi

// 1. Initialize Mock Database in localStorage if empty
function initializeMockDB() {
  const initialBookings = [
    {
      id: 'BK001',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
        phone: '+91 98765 43210',
      serviceType: 'acting',
      vehicleType: 'sedan',
      pickupDate: '2026-06-20',
      pickupTime: '09:00',
      pickupLocation: 'Banjara Hills, Road No. 10',
      dropLocation: 'Rajiv Gandhi International Airport',
      duration: '3-4',
      status: 'pending',
      createdAt: '2026-06-17 14:30',
    },
    {
      id: 'BK002',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 87654 32109',
      serviceType: 'personal',
      vehicleType: 'suv',
      pickupDate: '2026-06-19',
      pickupTime: '10:00',
      pickupLocation: 'Madhapur, HITEC City',
      dropLocation: 'Gachibowli Financial District',
      duration: 'full',
      status: 'confirmed',
      createdAt: '2026-06-16 09:15',
      driver: 'Suresh Reddy',
    },
    {
      id: 'BK003',
      name: 'Venkat Reddy',
      email: 'venkat.reddy@email.com',
      phone: '+91 76543 21098',
      serviceType: 'outstation',
      vehicleType: 'sedan',
      pickupDate: '2026-06-22',
      pickupTime: '06:00',
      pickupLocation: 'Kondapur',
      dropLocation: 'Vizag',
      duration: 'multi-day',
      status: 'pending',
      createdAt: '2026-06-17 11:45',
    },
    {
      id: 'BK004',
      name: 'Ananya Desai',
      email: 'ananya.desai@email.com',
      phone: '+91 65432 10987',
      serviceType: 'event',
      vehicleType: 'luxury',
      pickupDate: '2026-06-18',
      pickupTime: '18:00',
      pickupLocation: 'Taj Krishna Hotel',
      dropLocation: 'Shamshabad',
      duration: '5-8',
      status: 'completed',
      createdAt: '2026-06-15 16:20',
      driver: 'Mohan Das',
    },
    {
      id: 'BK005',
      name: 'Karthik Nair',
      email: 'karthik.nair@email.com',
      phone: '+91 54321 09876',
      serviceType: 'acting',
      vehicleType: 'hatchback',
      pickupDate: '2026-06-17',
      pickupTime: '14:00',
      pickupLocation: 'Secunderabad',
      dropLocation: 'Koramangala, Bangalore',
      duration: 'multi-day',
      status: 'cancelled',
      createdAt: '2026-06-14 10:30',
    },
  ];

  const initialDrivers = [
    { id: 'DR001', name: 'Suresh Reddy', phone: '+91 99887 76655', status: 'Available', rating: 4.8 },
    { id: 'DR002', name: 'Mohan Das', phone: '+91 88776 65544', status: 'On Trip', rating: 4.9 },
    { id: 'DR003', name: 'Ravi Kumar', phone: '+91 77665 54433', status: 'Available', rating: 4.7 },
    { id: 'DR004', name: 'Venkat Raju', phone: '+91 66554 43322', status: 'Available', rating: 4.6 }
  ];

  const initialSettings = {
    phone: '+91 98765 43210',
    email: 'info@nammasarathi.in',
    address: 'Hyderabad, Telangana, India - 500001',
    hours: '24 Hours, 7 Days a Week'
  };

  if (!localStorage.getItem('bookings')) {
    localStorage.setItem('bookings', JSON.stringify(initialBookings));
  }
  if (!localStorage.getItem('drivers')) {
    localStorage.setItem('drivers', JSON.stringify(initialDrivers));
  }
  if (!localStorage.getItem('settings')) {
    localStorage.setItem('settings', JSON.stringify(initialSettings));
  }
}

// 2. Language Multi-translation System
function translatePage(lang) {
  if (!window.translations) return;

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.getAttribute('data-i18n');
    if (window.translations[key] && window.translations[key][lang]) {
      // Preserve HTML structure if tag is used, else change text content
      if (element.children.length > 0 && (element.tagName === 'A' || element.tagName === 'BUTTON')) {
        const icon = element.querySelector('i');
        if (icon) {
          element.innerHTML = '';
          element.appendChild(icon);
          element.append(' ' + window.translations[key][lang]);
        } else {
          element.innerHTML = window.translations[key][lang];
        }
      } else {
        element.textContent = window.translations[key][lang];
      }
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (window.translations[key] && window.translations[key][lang]) {
      element.setAttribute('placeholder', window.translations[key][lang]);
    }
  });
}

// 3. Document Ready Setup
document.addEventListener('DOMContentLoaded', () => {
  // Initialize mock DB data
  initializeMockDB();

  // Load language settings
  let preferredLanguage = localStorage.getItem('preferred_language') || 'en';
  
  // Set value of language select element in header
  const languageSelector = document.getElementById('language-select');
  if (languageSelector) {
    languageSelector.value = preferredLanguage;
    languageSelector.addEventListener('change', (e) => {
      const selected = e.target.value;
      localStorage.setItem('preferred_language', selected);
      translatePage(selected);
    });
  }

  // Initial translation
  translatePage(preferredLanguage);

  // Set navigation active state styles based on filename
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a, #mobile-menu a');
  
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href) {
      const isHome = href === 'index.html' || href === '/' || href === './';
      if (isHome && (currentPath === '/' || currentPath.endsWith('index.html') || currentPath === '')) {
        link.classList.add('text-primary-600');
        link.classList.remove('text-secondary-600');
      } else if (!isHome && currentPath.endsWith(href)) {
        link.classList.add('text-primary-600');
        link.classList.remove('text-secondary-600');
        // If it's a mobile nav link highlight
        if (link.closest('#mobile-menu')) {
          link.classList.add('bg-primary-50');
        }
      }
    }
  });

  // Mobile menu toggle logic with smooth height slide transitions
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenu.classList.add('mobile-menu-transition');
    mobileMenu.classList.remove('hidden');
    
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      if (!isOpen) {
        mobileMenu.classList.add('open');
        mobileMenuBtn.innerHTML = '<i class="fa-solid fa-xmark h-6 w-6 text-xl"></i>';
      } else {
        mobileMenu.classList.remove('open');
        mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars h-6 w-6 text-xl"></i>';
      }
    });
  }

  // Load static settings details (phone, email, address, etc.) on frontend pages
  const loadedSettings = JSON.parse(localStorage.getItem('settings'));
  if (loadedSettings) {
    document.querySelectorAll('.settings-phone').forEach(el => {
      el.textContent = loadedSettings.phone;
      if (el.tagName === 'A') el.setAttribute('href', 'tel:' + loadedSettings.phone.replace(/\s+/g, ''));
    });
    document.querySelectorAll('.settings-email').forEach(el => {
      el.textContent = loadedSettings.email;
      if (el.tagName === 'A') el.setAttribute('href', 'mailto:' + loadedSettings.email);
    });
    document.querySelectorAll('.settings-address').forEach(el => {
      el.textContent = loadedSettings.address;
    });
    document.querySelectorAll('.settings-hours').forEach(el => {
      el.textContent = loadedSettings.hours;
    });
  }
});
