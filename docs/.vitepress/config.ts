import tailwindcss from '@tailwindcss/vite';
import vueDevTools from 'vite-plugin-vue-devtools';
import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Web UI',
  description:
    'Well-abstracted components that leverage the latest capabilities of the web platform.',
  vite: {
    plugins: [tailwindcss(), vueDevTools()],
  },
});
