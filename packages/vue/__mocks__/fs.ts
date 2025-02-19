import { fs, vol } from 'memfs'
import { beforeEach } from 'vitest'

export const existsSync = fs.existsSync
export const promises = fs.promises

export default function mockFs() {
  beforeEach(() => {
    vol.reset()
    vol.mkdirSync(process.cwd(), { recursive: true })
  })
}
