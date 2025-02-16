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
    if (output.toString() === CTRL_C) {
      process.emit('SIGINT')
    }

    return this
  }

  async showLoadingUntilDone<T>(
    promise: Promise<T>,
    text: string = 'delivery',
    frames: string[] = ['...🚚', '..🚚', '.🚚', '🚚'],
    framesLeft: boolean = false
  ) {
    let stage = 0

    // hide cursor
    this.hideCursor().disableInteraction()
    const loading = setInterval(() => {
      // this.clearLine()
      if (framesLeft) {
        this.write(`\r${frames[stage]} ${text}`)
      } else {
        this.write(`\r${text} ${frames[stage]}`)
      }
      stage = (stage + 1) % frames.length
    }, 300)

    const result = await promise

    // show cursor
    clearInterval(loading)

    this/* .clearLine() */.showCursor().enableInteraction()

    return result
  }
}
