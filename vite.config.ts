import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Werbe-Video/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    rollupOptions: {
      input: { preview: 'preview.html' },
    },
  },
});
