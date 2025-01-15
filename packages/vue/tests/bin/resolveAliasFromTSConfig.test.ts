import { resolveAliasPath } from '$/resolvePathAlias'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

describe('resolving alias path from tsconfig.json', () => {
  const basePath = fileURLToPath(new URL('./fixtures', import.meta.url))

  function expectAlias(configPath: string, componentPath: string, expectedPath: string) {
    expect(resolveAliasPath(componentPath, basePath + '/' + configPath)).toBe(
      basePath + '/' + expectedPath,
    )
  }

  it('resolves the path from the root tsconfig.json', () => {
    expectAlias('tsconfig.json', '@/components/ui', 'src/components/ui')
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

  it('resolves the path with nested alias', () => {
    const nestedPath = '@/nested/module'
    const basePath = fileURLToPath(new URL('./fixtures', import.meta.url))

    expect(resolveAliasPath(nestedPath, basePath + '/tsconfig-nested-alias.json')).toBe(
      basePath + '/src/nested/module',
    )
  })

  it('resolves the path with multiple aliases', () => {
    const multipleAliasPath = '@shared/utils'
    const basePath = fileURLToPath(new URL('./fixtures', import.meta.url))

    expect(resolveAliasPath(multipleAliasPath, basePath + '/tsconfig-multiple-aliases.json')).toBe(
      basePath + '/src/shared/utils',
    )
  })

  it('returns the original path if no alias matches', () => {
    const nonAliasPath = '~/nonexistent/path/alias'
    const basePath = fileURLToPath(new URL('./fixtures', import.meta.url))

    expect(resolveAliasPath(nonAliasPath, basePath + '/tsconfig.json')).toBe(nonAliasPath)
  })

  it('resolves non symbol alias', () => {})
})
