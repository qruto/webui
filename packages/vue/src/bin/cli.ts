#!/usr/bin/env node

import program from '$/program'
import * as use from '$/commands/use'

export type AvailableCommands = typeof use.name

process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

program.addCommand(use.command)

program.parse()
