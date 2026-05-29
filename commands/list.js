import path from 'path'
import { listDirs } from '../utils/fs.js'
import { log } from '../utils/logger.js'

const PAGES_DIR = path.join(process.cwd(), 'src/app/pages')
const COMPONENTS_DIR = path.join(process.cwd(), 'src/app/components')

export function list(type) {
    // Validate type
    if (!['page', 'component'].includes(type)) {
        log.error(`Unknown type "${type}". Use "page" or "component".`)
        process.exit(1)
    }

    const targetDir = type === 'page' ? PAGES_DIR : COMPONENTS_DIR
    const items = listDirs(targetDir)

    // Nothing found
    if (items.length === 0) {
        log.warn(`No ${type}s found.`)
        return
    }

    // Print list
    console.log(`\n📁 ${type}s:\n`)
    items.forEach((item, i) => {
        console.log(`  ${i + 1}. ${item}`)
    })
    console.log('')
}