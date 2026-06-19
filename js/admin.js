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
  // Mobile sidebar navigation open/close toggling
  const sidebarToggleBtn = document.getElementById('sidebar-toggle');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const sidebarContainer = document.getElementById('admin-sidebar');

  if (sidebarToggleBtn && sidebarContainer) {
    sidebarToggleBtn.addEventListener('click', () => {
      const isClosed = sidebarContainer.classList.contains('-translate-x-full');
      if (isClosed) {
        sidebarContainer.classList.remove('-translate-x-full');
        sidebarOverlay.classList.remove('hidden');
      } else {
        sidebarContainer.classList.add('-translate-x-full');
        sidebarOverlay.classList.add('hidden');
      }
    });
  }

  if (sidebarOverlay && sidebarContainer) {
    sidebarOverlay.addEventListener('click', () => {
      sidebarContainer.classList.add('-translate-x-full');
      sidebarOverlay.classList.add('hidden');
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
  const currentPath = window.location.pathname;
  const sidebarLinks = document.querySelectorAll('#admin-sidebar nav a');
  sidebarLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.endsWith(href)) {
      link.classList.add('bg-primary-600', 'text-white');
      link.classList.remove('text-secondary-300', 'hover:bg-secondary-800');
    } else {
      link.classList.remove('bg-primary-600', 'text-white');
      link.classList.add('text-secondary-300', 'hover:bg-secondary-800');
    }
  });
});
