import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { resolveAliasPath } from './resolveAlias'

describe('resolving alias path from tsconfig.json', () => {
  it('resolves the path from the root tsconfig.json', () => {
    const componentPath = '@/components/ui'
    const basePath = fileURLToPath(new URL('./fixtures', import.meta.url))

    expect(resolveAliasPath(componentPath, basePath + '/tsconfig.json')).toBe(
      basePath + '/src/components/ui',
    )
  })

  it('it resolves the path from the root tsconfig.json with `basePath` configured', () => {
    const componentPath = '@/components/ui'
    const basePath = fileURLToPath(new URL('./fixtures', import.meta.url))

    expect(resolveAliasPath(componentPath, basePath + '/tsconfig-base-path.json')).toBe(
      basePath + '/src/components/ui',
    )
  })
})
