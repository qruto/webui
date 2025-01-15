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

  it('resolves the path from the root tsconfig.json', () =>
    expectAlias('tsconfig.json', '@/components/ui', 'src/components/ui'))

  it('resolves the path from the root tsconfig.json with `basePath` configured', () =>
    expectAlias('tsconfig-base-path.json', '@/components/ui', 'src/components/ui'))

  it('resolves the path with direct @components alias', () =>
    expectAlias('tsconfig-components-alias.json', '@components', 'src/components'))

  it('resolves the path with nested alias', () =>
    expectAlias('tsconfig-nested-alias.json', '@/nested/module', 'src/nested/module'))

  it('resolves the path with multiple aliases', () =>
    expectAlias('tsconfig-multiple-aliases.json', '@shared/utils', 'src/shared/utils'))

  it('returns the original path if no alias matches', () => {
    const nonAliasPath = '~/nonexistent/path/alias'
    expect(resolveAliasPath(nonAliasPath, basePath + '/tsconfig.json')).toBe(nonAliasPath)
  })

  it('resolves non symbol alias', () => {})
})
