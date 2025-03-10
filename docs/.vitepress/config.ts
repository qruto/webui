import tailwindcss from '@tailwindcss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import { defineConfig } from 'vitepress'
import packageJson from '../../packages/vue/package.json'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Web UI',
  description: packageJson.description,
  outDir: '../server/public',
  vite: {
    plugins: [tailwindcss(), vueDevTools()],
    build: { emptyOutDir: false },
    server: {
      proxy: {
        '^/@/.*': {
          target: 'http://webui-laravel.test',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/@/, ''),
        },
      },
    },
  },

  head: [
    [
      'script',
      { src: 'https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js', async: '' },
    ],
  ],
})
