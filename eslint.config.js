import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/cache/**', '.github'],
  },

  ...pluginVue.configs['flat/strongly-recommended'],
  ...vueTsEslintConfig(),

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*', 'tests/**/*'],
  },
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
  skipFormatting,
]
