import { HstVue } from '@histoire/plugin-vue'
import { defineConfig } from 'histoire'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  setupFile: './stories/histoire-setup.ts',

  plugins: [HstVue()],

  vite: {
    plugins: [vue(), tailwindcss()],
  },
})
