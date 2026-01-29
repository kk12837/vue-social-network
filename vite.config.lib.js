import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'VueSocialIcons',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['vue', '@fortawesome/vue-fontawesome'],
      output: {
        globals: {
          vue: 'Vue',
          '@fortawesome/vue-fontawesome': 'FontAwesomeIcon'
        }
      }
    }
  }
})
