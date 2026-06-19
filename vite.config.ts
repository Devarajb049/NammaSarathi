import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        services: resolve(__dirname, 'services.html'),
        booking: resolve(__dirname, 'booking.html'),
        contact: resolve(__dirname, 'contact.html'),
        'admin-login': resolve(__dirname, 'admin-login.html'),
        'admin-dashboard': resolve(__dirname, 'admin-dashboard.html'),
        'admin-bookings': resolve(__dirname, 'admin-bookings.html'),
        'admin-drivers': resolve(__dirname, 'admin-drivers.html'),
        'admin-schedule': resolve(__dirname, 'admin-schedule.html'),
        'admin-settings': resolve(__dirname, 'admin-settings.html'),
      },
    },
  },
});
