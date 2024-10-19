// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue';
import './style.css';

/** @type {import('vitepress').Theme} */
export default {
  Layout,
  // eslint-disable-next-line no-unused-vars
  enhanceApp({ app, router, siteData }) {
    // ...
  },
};
