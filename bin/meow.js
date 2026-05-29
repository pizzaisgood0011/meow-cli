#!/usr/bin/env node
// bin/meow.js
import { program } from 'commander'
import { create } from '../commands/new.js'
import { generate } from '../commands/generate.js'
import { list } from '../commands/list.js'
import { del } from '../commands/delete.js'
import { serve } from '../commands/serve.js'
import { build } from '../commands/build.js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8'))

program
    .name('meow')
    .description('A lightweight CLI for scaffolding vanilla HTML/CSS/JS projects')
    .version(pkg.version)

program
    .command('new')
    .argument('<name>', 'project name')
    .description('Create a new vanilla JS project')
    .action((name) => {
        create(name)
    })

program
    .command('generate')
    .alias('g')
    .description('Generate a page or component')
    .argument('<type>', 'page or component')
    .argument('<name>', 'name of the page or component')
    .action((type, name) => {
        generate(type, name)
    })

program
    .command('list <type>')
    .alias('ls')
    .description('List all pages or components')
    .action((type) => {
        list(type)
    })

program
    .command('delete')
    .alias('d')
    .description('Delete a page or component')
    .argument('<type>', 'page or component')
    .argument('<name>', 'name of the page or component')
    .action((type, name) => {
        del(type, name)
    })

program
    .command('serve')
    .alias('s')
    .description('Start dev server with live reload')
    .option('-o, --open', 'Open browser automatically')
    .action((options) => {
        serve(options)
    })

program
    .command('build')
    .alias('b')
    .description('Minify and bundle project')
    .action(async () => {
        await build()
    })

program.parse(process.argv)