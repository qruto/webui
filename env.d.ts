/// <reference types="vitepress/client" />
/// <reference types="@histoire/plugin-vue/components" />

declare module '@vue/theme/config' {
  import { UserConfig } from 'vitepress'
  const config: () => Promise<UserConfig>
  export default config
}

declare module '@vue/theme/highlight' {
  const createHighlighter: () => Promise<(input: string) => string>
  export default createHighlighter
}
