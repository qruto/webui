import { resolveAliasPath } from '$/resolvePathAlias'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

describe('resolving alias path from tsconfig.json', () => {
  it('resolves the path from the root tsconfig.json', () => {
    const componentPath = '@/components/ui'
    const basePath = fileURLToPath(new URL('./fixtures', import.meta.url))

    expect(resolveAliasPath(componentPath, basePath + '/tsconfig.json')).toBe(
      basePath + '/src/components/ui',
    )
  })

  it('resolves the path from the root tsconfig.json with `basePath` configured', () => {
    const componentPath = '@/components/ui'
    const basePath = fileURLToPath(new URL('./fixtures', import.meta.url))

    expect(resolveAliasPath(componentPath, basePath + '/tsconfig-base-path.json')).toBe(
      basePath + '/src/components/ui',
    )
  })

  it('resolves the path with direct @components alias', () => {
    const componentPath = '@components'
    const basePath = fileURLToPath(new URL('./fixtures', import.meta.url))

    expect(resolveAliasPath(componentPath, basePath + '/tsconfig-components-alias.json')).toBe(
      basePath + '/src/components',
    )
  })
})
