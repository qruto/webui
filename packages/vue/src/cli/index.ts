#!/usr/bin/env node

import * as use from '$/commands/use'
import program from '$/program'
import cli from './services/cli';

export type AvailableCommands = typeof use.name

process.on('SIGINT', () => {
    cli.newLine()
    cli.newLine()
    console.info(cli.highlight.redBright('Command terminated. To rerun, use the ↑ key or type `!!`.'));
    cli.newLine()
    console.info(cli.highlight.bold(cli.highlight.bgMagenta(['webui', ...process.argv.slice(2)].join(' '))))

    process.exit(0);
});
process.on('SIGTERM', () => process.exit(0))

program.addCommand(use.command)

program.parse()
