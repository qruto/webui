import { Command } from 'commander'
import packageJson from '../../package.json'

const program = new Command()

program
  .name('webui')
  .version(packageJson.version || '1.0.0', '-v, --version', 'display the version number')
  .description('Copy component files to your source')

export default program
