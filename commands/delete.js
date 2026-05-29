import path from 'path'
import { exists, deleteDir } from '../utils/fs.js'
import { removeRoute } from '../utils/router-sync.js'
import { log } from '../utils/logger.js'
import readline from 'readline'

const PAGES_DIR = path.join(process.cwd(), 'src/app/pages')
const COMPONENTS_DIR = path.join(process.cwd(), 'src/app/components')

export function del(type, name) {
    // Validate type
    if (!['page', 'component'].includes(type)) {
        log.error(`Unknown type "${type}". Use "page" or "component".`)
        process.exit(1)
    }

    const targetDir = type === 'page'
        ? path.join(PAGES_DIR, name)
        : path.join(COMPONENTS_DIR, name)

    // Check if exists
    if (!exists(targetDir)) {
        log.error(`${type} "${name}" does not exist!`)
        process.exit(1)
    }

    // Ask for confirmation before deleting
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    rl.question(`⚠️  Are you sure you want to delete "${name}"? (y/n) `, (answer) => {
        rl.close()

        if (answer.toLowerCase() !== 'y') {
            log.info('Deletion cancelled.')
            return
        }

        // Delete folder
        deleteDir(targetDir)

        // Remove route from router.js (pages only)
        if (type === 'page') removeRoute(name)

        log.success(`${type} "${name}" deleted!`)
    })
}