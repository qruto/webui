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

  it('resolves the path with direct `@ui` alias to the components folder', () =>
    expectAlias('tsconfig-components-alias.json', '@ui', 'src/components/ui'))

  it('resolves the path with nested alias', () =>
    expectAlias('tsconfig-nested-alias.json', '@/nested/module', 'src/nested/module'))

  it('resolves the path with multiple aliases', () =>
    expectAlias('tsconfig-multiple-aliases.json', '@shared/utils', 'src/shared/utils'))

  it('returns the original path if no alias matches', () => {
    const nonAliasPath = '~/nonexistent/path/alias'
    expect(resolveAliasPath(nonAliasPath, basePath + '/tsconfig.json')).toBe(nonAliasPath)
  })

  it('works with simple relative path', () => {
    const relativePath = './src/components/ui'
    expect(resolveAliasPath(relativePath, basePath + '/tsconfig.json')).toBe(relativePath)
  })

  it('resolves non symbol alias', () => {
    const relativePath = 'components/ui'
    expect(resolveAliasPath(relativePath, basePath + '/tsconfig-nonsymbol-alias.json')).toBe(
      basePath + '/src/components/ui',
    )
  })

  it('resolves the path from the project references configuration', () =>
    expectAlias('tsconfig-references.json', '@browser/utils', 'referenced/src/browser/utils'))

  it('resolves the second referenced path from the project references configuration', () =>
    expectAlias('tsconfig-references.json', '@cli/commands', 'referenced/src/cli/commands'))

  it('resolves the alias path from the root config with project references', () =>
    expectAlias('tsconfig-references-with-alias.json', '@ui', 'src/components/ui'))
})
