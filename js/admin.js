// Admin Utilities for NammaSarathi Dashboard

// 1. Session Auth Verification
if (localStorage.getItem('admin_logged_in') !== 'true') {
  window.location.href = 'admin-login.html';
}

// 2. Data Access Helpers
function getBookings() {
  return JSON.parse(localStorage.getItem('bookings')) || [];
}

function saveBookings(bookings) {
  localStorage.setItem('bookings', JSON.stringify(bookings));
}

function getDrivers() {
  return JSON.parse(localStorage.getItem('drivers')) || [];
}

function saveDrivers(drivers) {
  localStorage.setItem('drivers', JSON.stringify(drivers));
}

function getAdminSettings() {
  return JSON.parse(localStorage.getItem('settings')) || {
    phone: '+91 98765 43210',
    email: 'info@nammasarathi.in',
    address: 'Hyderabad, Telangana, India - 500001',
    hours: '24 Hours, 7 Days a Week'
  };
}

function saveAdminSettings(settings) {
  localStorage.setItem('settings', JSON.stringify(settings));
}

// 3. Logout Handler
function handleAdminLogout() {
  localStorage.removeItem('admin_logged_in');
  window.location.href = 'admin-login.html';
}

// 4. Initial Setup on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  // Inject Modal & Overlay Styles Dynamically to prevent caching issues
  const adminStyles = document.createElement('style');
  adminStyles.textContent = `
    /* Premium Modal Styles */
    .modal-backdrop-transition {
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease-in-out;
      backdrop-filter: blur(4px);
    }
    
    .modal-backdrop-transition.open {
      opacity: 1;
      pointer-events: auto;
    }
    
    .modal-card-transition {
      transform: scale(0.95);
      opacity: 0;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease-in-out;
    }
    
    .modal-backdrop-transition.open .modal-card-transition {
      transform: scale(1);
      opacity: 1;
    }
    
    /* Sidebar Overlay Transition (Admin Mobile Panel) */
    .sidebar-overlay-transition {
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease-in-out;
    }
    
    .sidebar-overlay-transition.active {
      opacity: 1;
      pointer-events: auto;
    }
  `;
  document.head.appendChild(adminStyles);

  // Mobile sidebar navigation open/close toggling
  const sidebarToggleBtn = document.getElementById('sidebar-toggle');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const sidebarContainer = document.getElementById('admin-sidebar');

  if (sidebarToggleBtn && sidebarContainer) {
    sidebarToggleBtn.addEventListener('click', () => {
      const isClosed = sidebarContainer.classList.contains('-translate-x-full');
      if (isClosed) {
        sidebarContainer.classList.remove('-translate-x-full');
        if (sidebarOverlay) sidebarOverlay.classList.add('active');
      } else {
        sidebarContainer.classList.add('-translate-x-full');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
      }
    });
  }

  if (sidebarOverlay && sidebarContainer) {
    sidebarOverlay.addEventListener('click', () => {
      sidebarContainer.classList.add('-translate-x-full');
      sidebarOverlay.classList.remove('active');
    });
  }

  // Bind logout buttons
  document.querySelectorAll('.logout-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      handleAdminLogout();
    });
  });

  // Highlight active sidebar item
  const getBasename = (path) => {
    const segment = path.replace(/\/$/, '').split('/').pop() || '';
    return segment.split('.')[0].toLowerCase();
  };
  const currentPath = window.location.pathname;
  const currentClean = getBasename(currentPath);
  const sidebarLinks = document.querySelectorAll('#admin-sidebar nav a');
  sidebarLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      const hrefClean = getBasename(href);
      if (currentClean === hrefClean) {
        link.classList.add('bg-primary-600', 'text-white');
        link.classList.remove('text-secondary-300', 'hover:bg-secondary-800');
      } else {
        link.classList.remove('bg-primary-600', 'text-white');
        link.classList.add('text-secondary-300', 'hover:bg-secondary-800');
      }
    }
  });
});
