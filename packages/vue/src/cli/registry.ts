import cli from './services/cli'

const components = [
  {
    name: 'action',
    illustration: `

\t      ( press )

    `,
  },
  {
    name: 'dialog',
    illustration: `
\t╭──────────────────────╮
\t│      I'm on top      │
\t│     of the page!     │
\t│                      │
\t│        ( ok )        │
\t╰──────────────────────╯
    `,
    used: ['action'],
    dependencies: ['@vueuse/core'],
  },
  {
    name: 'details',
    illustration: cli.highlight.gray(`
\t▼ summary
\t  details content here...
    `),
    dependencies: ['@vueuse/core'],
  },
] as const

export type ComponentMeta = (typeof components)[number]

export type ComponentName = (typeof components)[number]['name']

export default {
  origin: 'https://raw.githubusercontent.com/qruto/webui/refs/heads/command/components',
  components,
}
