import picocolors from 'picocolors'
import prompts from 'prompts'

export default {
  prompt: prompts,
  highlight: picocolors,
  newLine: () => console.log(''),
}

const CTRL_C = '\u0003'

export class Terminal {
  private readonly stdout: NodeJS.WriteStream
  private readonly stdin: NodeJS.ReadStream

  constructor(stdout?: NodeJS.WriteStream, stdin?: NodeJS.ReadStream) {
    this.stdout = stdout || process.stdout
    this.stdin = stdin || process.stdin
  }

  listenToInput(onData: (data: Buffer<ArrayBufferLike>) => void) {
    this.stdin.setEncoding('utf-8')
    this.stdin.on('data', onData)
  }

  write(text: string) {
    this.stdout.write(text)

    return this
  }

  clearLine() {
    this.stdout.write('\r\x1B[K')

    return this
  }

  hideCursor() {
    this.stdout.write('\x1B[?25l')

    return this
  }

  showCursor() {
    this.stdout.write('\x1B[?25h')

    return this
  }

  enableInteraction() {
    if (!this.stdin.isTTY) {
      return this
    }

    this.stdin.off('data', this.handleTerminate)
    this.stdin.setRawMode(false)
    this.stdin.pause()

    return this
  }

  disableInteraction() {
    if (!this.stdin.isTTY) {
      return this
    }

    this.stdin.setRawMode(true)
    this.listenToInput(this.handleTerminate)
    this.stdin.resume()

    return this
  }

  handleTerminate(output: Buffer<ArrayBufferLike>) {
    if (output[0] === CTRL_C.charCodeAt(0)) {
      process.emit('SIGINT')
    }

    return this
  }
}
