import { dirname, resolve } from 'path'
import { parseJsonConfigFileContent, readConfigFile, sys } from 'typescript'

export function resolveAliasPath(aliasPath: string, tsConfigPath: string): string {
  const configFile = readConfigFile(tsConfigPath, sys.readFile)
  if (configFile.error) {
    throw new Error('Could not read tsconfig: ' + configFile.error.messageText)
  }

  const basePath = dirname(tsConfigPath)
  const { options, projectReferences } = parseJsonConfigFileContent(
    configFile.config,
    sys,
    basePath,
  )

  function resolveAliasFromPaths(paths: typeof options.paths) {
    // Check paths from main config
    for (const [key, values] of Object.entries(paths || {})) {
      // e.g. "@components/*"
      const pattern = key.replace('*', '')
      if (aliasPath.startsWith(pattern)) {
        const subPath = aliasPath.slice(pattern.length)
        const resolvedPath = resolve(basePath, values[0].replace('*', subPath))
        return resolvedPath
      }
    }
  }

  let resolvedPath

  if (typeof options.paths !== 'undefined') {
    resolvedPath = resolveAliasFromPaths(options.paths)
  }

  if (typeof resolvedPath !== 'undefined') {
    return resolvedPath
  }

  // Handle project references by reading each referenced config
  if (projectReferences) {
    for (const ref of projectReferences) {
      if (ref.path) {
        try {
          const resolvedRef = resolve(basePath, ref.path)
          const newPath = resolveAliasPath(aliasPath, resolvedRef)
          if (typeof newPath !== 'undefined') return newPath
        } catch {
          // ignore and continue
        }
      }
    }
  }

  return aliasPath
}
