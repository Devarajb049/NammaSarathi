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
function initCommonPage() {
  // Inject Mobile Styles Dynamically to prevent caching issues
  const mobileStyles = document.createElement('style');
  mobileStyles.textContent = `
    /* Compact Navbar for Mobile View */
    @media (max-width: 767.98px) {
      header nav div.h-16 {
        height: 3.5rem !important;
      }
    }

    /* Mobile Slide-out Sidebar Menu (Frontend) */
    #mobile-menu {
      position: fixed !important;
      top: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      width: 280px !important;
      background-color: #ffffff !important;
      z-index: 9999 !important;
      padding: 24px !important;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
      transform: translateX(100%) !important;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
      display: flex !important;
      flex-direction: column !important;
      border-left: 1px solid #e2e8f0 !important;
      margin: 0 !important;
      border-top: none !important;
      pointer-events: none !important;
      visibility: hidden !important;
    }
    
    #mobile-menu.open {
      transform: translateX(0) !important;
      pointer-events: auto !important;
      visibility: visible !important;
      opacity: 1 !important;
    }
    
    #mobile-menu-overlay {
      position: fixed !important;
      inset: 0 !important;
      background-color: rgba(0, 0, 0, 0.5) !important;
      z-index: 9998 !important;
      opacity: 0 !important;
      pointer-events: none !important;
      transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out !important;
      cursor: pointer !important;
      visibility: hidden !important;
    }
    
    #mobile-menu-overlay.open {
      pointer-events: auto !important;
      visibility: visible !important;
      opacity: 1 !important;
    }

    @media (min-width: 768px) {
      #mobile-menu {
        display: none !important;
      }
      #mobile-menu-overlay {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(mobileStyles);

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
  const navLinks = document.querySelectorAll('nav a[data-i18n], #mobile-menu a[data-i18n]');
  
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href) {
      const isHome = href === 'index.html' || href === '/' || href === './';
      const isCurrentHome = currentPath === '/' || currentPath.endsWith('index.html') || currentPath === '';
      const isMatch = (isHome && isCurrentHome) || (!isHome && currentPath.endsWith(href));
      
      if (isMatch) {
        link.classList.add('text-primary-600');
        link.classList.remove('text-secondary-600', 'text-secondary-400');
        if (link.closest('#mobile-menu')) {
          link.classList.add('bg-primary-50');
        }
      } else {
        link.classList.remove('text-primary-600', 'bg-primary-50');
        if (link.getAttribute('data-i18n') === 'nav_admin') {
          link.classList.add('text-secondary-400');
        } else {
          link.classList.add('text-secondary-600');
        }
      }
    }
  });

  // Mobile slide-out menu layout initialization & logic
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    // Move menu to body so fixed positioning is not clipped by header/nav
    if (mobileMenu.parentElement !== document.body) {
      document.body.appendChild(mobileMenu);
    }

    // 1. Create and inject overlay if not exists
    let overlay = document.getElementById('mobile-menu-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'mobile-menu-overlay';
      document.body.appendChild(overlay);
    }

    // 2. Create and inject header inside mobile menu for close action and branding
    const hasHeader = mobileMenu.querySelector('.mobile-menu-header');
    if (!hasHeader) {
      const menuHeader = document.createElement('div');
      menuHeader.className = 'mobile-menu-header flex justify-between items-center pb-4 border-b border-secondary-100 mb-6';
      menuHeader.innerHTML = `
        <div class="flex items-center space-x-2">
          <i class="fa-solid fa-car text-primary-600 text-xl"></i>
          <span class="font-bold text-secondary-900 text-lg">NammaSarathi</span>
        </div>
        <button type="button" id="mobile-menu-close-btn" aria-label="Close menu" class="p-1.5 hover:bg-secondary-100 rounded-lg text-secondary-500 transition-colors">
          <i class="fa-solid fa-xmark text-xl"></i>
        </button>
      `;
      mobileMenu.prepend(menuHeader);
    }

    mobileMenu.classList.remove('hidden');

    // Toggle open state function
    const toggleMobileMenu = (forceState) => {
      const toOpen = typeof forceState === 'boolean' ? forceState : !mobileMenu.classList.contains('open');
      if (toOpen) {
        mobileMenu.classList.add('open');
        overlay.classList.add('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // prevent page scroll behind sidebar
      } else {
        mobileMenu.classList.remove('open');
        overlay.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    };

    // Event listeners — click + touch for reliable mobile open
    const openMenu = (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleMobileMenu(true);
    };

    mobileMenuBtn.addEventListener('click', openMenu);
    mobileMenuBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      openMenu(e);
    });

    overlay.addEventListener('click', () => {
      toggleMobileMenu(false);
    });
    overlay.addEventListener('touchstart', (e) => {
      toggleMobileMenu(false);
    }, { passive: true });

    const closeBtn = document.getElementById('mobile-menu-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu(false);
      });
    }

    mobileMenu.querySelectorAll('a[href]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const href = link.getAttribute('href');
        if (href && href !== '#') {
          event.preventDefault();
          toggleMobileMenu(false);
          setTimeout(() => {
            window.location.href = href;
          }, 100);
        }
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        toggleMobileMenu(false);
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
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCommonPage);
} else {
  initCommonPage();
}
