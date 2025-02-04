import { Command } from 'commander'
import packageJson from '../../package.json'

const program = new Command()

program
  .name('webui')
  .version(packageJson.version, '-v, --version', 'display the version number')
  .description('Copy component files to your source')

export default program

// WebUI
export const intro = `
 __      __          __       __  __  ______
/\\ \\  __/\\ \\        /\\ \\     /\\ \\/\\ \\/\\__  _\\
\\ \\ \\/\\ \\ \\ \\     __\\ \\ \\____\\ \\ \\ \\ \\/_/\\ \\/
 \\ \\ \\ \\ \\ \\ \\  /'__\`\\ \\ '__\`\\\\ \\ \\ \\ \\ \\ \\ \\
  \\ \\ \\_/ \\_\\ \\/\\  __/\\ \\ \\L\\ \\\\ \\ \\_\\ \\ \\_\\ \\__
   \\ \`\\___x___/\\ \\____\\\\ \\_,__/ \\ \\_____\\/\\_____\\
    '\\/__//__/  \\/____/ \\/___/   \\/_____/\\/_____/
`
