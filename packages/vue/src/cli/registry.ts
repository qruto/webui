const components = [
  {
    name: 'action',
    dependencies: [],
  },
  {
    name: 'dialog',
    used: ['action'],
    dependencies: ['@vueuse/core'],
  },
  {
    name: 'details',
    dependencies: ['@vueuse/core'],
  },
] as const

export type ComponentName = (typeof components)[number]['name']

export default {
  origin: 'https://raw.githubusercontent.com/qruto/webui/refs/heads/main/components',
  components,
}
