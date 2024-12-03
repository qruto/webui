#!/usr/bin/env node

import program from '$/program'
import use from '$/commands/use'

process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

program.addCommand(use)

program.parse()
