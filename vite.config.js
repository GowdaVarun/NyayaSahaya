// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-cname',
      closeBundle() {
        try {
          copyFileSync('CNAME', 'dist/CNAME');
        } catch (e) {
          console.warn('CNAME file not found or could not be copied');
        }
      }
    }
  ],
  base: '/',
});

