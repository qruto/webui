import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/cache/**'],
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/strongly-recommended'],
  skipFormatting,
  {
    rules: {
      // override/add rules settings here, such as:
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: ['Details', 'Button', 'Link', 'Layout'],
        },
      ],
    },
  },
];
