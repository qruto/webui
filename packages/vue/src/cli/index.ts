#!/usr/bin/env node

import * as use from '$/commands/use'
import program from '$/program'

export type AvailableCommands = typeof use.name

process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

program.addCommand(use.command)

program.parse()
