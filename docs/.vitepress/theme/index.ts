// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue'
import type { Theme } from 'vitepress'
import './style.css'

export default {
  Layout,
  // eslint-disable-next-line no-unused-vars
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme
