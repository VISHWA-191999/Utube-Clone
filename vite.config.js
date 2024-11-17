import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  logLevel: 'info',
  esbuild: {
    // Enable support for older JS features
    jsxInject: `import 'regenerator-runtime/runtime'`,
  },
})
