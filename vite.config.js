import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [
    react({
      fastRefresh: false,
    }),
  ],

  server: {
    port: 3000,
    open: true,
    host: '0.0.0.0',
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
    headers: {
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://images.unsplash.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "img-src 'self' data: https: blob:",
        "font-src 'self' https://fonts.gstatic.com",
        "connect-src 'self' ws://localhost:* wss://localhost:* https://api.sasatravel.com https://images.unsplash.com https://www.googletagmanager.com",
        "frame-src https://www.google.com https://maps.google.com",
        "base-uri 'self'",
        "form-action 'self'",
        "upgrade-insecure-requests"
      ].join('; '),
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('src/data/destinations.js')) return 'data-destinations';
          if (id.includes('src/data/tours.js')) return 'data-tours';
          if (id.includes('src/data/about/aboutData.js')) return 'data-about';
          if (id.includes('src/data/packages.js')) return 'data-packages';
          if (id.includes('src/data/blogs.js')) return 'data-blogs';
          if (id.includes('node_modules')) {
            if (id.includes('prop-types') || id.includes('react-icons')) {
              return 'vendor-utils';
            }
            return 'vendor-other';
          }
        },
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
    chunkSizeWarningLimit: 500,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['src/data/*'],
  },
  esbuild: {
    drop: ['console', 'debugger'],
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
  },
  preview: {
    port: 4173,
  },
})

