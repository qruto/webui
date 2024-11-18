import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/cache/**'],
  },

  ...pluginVue.configs['flat/strongly-recommended'],
  ...vueTsEslintConfig(),
  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },
  skipFormatting,
];
