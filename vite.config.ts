import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // This allows using process.env.API_KEY in the frontend code
    // Note: In production, it's better to use import.meta.env, 
    // but we keep this for compatibility with the existing code structure.
    'process.env': process.env
  }
});