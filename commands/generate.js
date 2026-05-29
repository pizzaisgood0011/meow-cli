import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { addRoute } from '../utils/router-sync.js'
import { log } from '../utils/logger.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const TEMPLATES = path.join(__dirname, '../templates')
const PAGES_DIR = 'src/app/pages'
const COMPONENTS_DIR = 'src/app/components'

export function generate(type, name) {
    // Validate type
    if (!['page', 'component'].includes(type)) {
        console.error(`Unknown type "${type}". Use "page" or "component".`)
        process.exit(1)
    }

    const targetDir = type === 'page'
    ? path.join(process.cwd(), PAGES_DIR, name)
    : path.join(process.cwd(), COMPONENTS_DIR, name)

    // Check if already exists
    if (fs.existsSync(targetDir)) {
        console.error(`${type} "${name}" already exists!`)
        process.exit(1)
    }

    // Create folder
    fs.mkdirSync(targetDir, { recursive: true })

    // Copy templates + replace placeholder
    const templateDir = path.join(TEMPLATES, type)
    const files = fs.readdirSync(templateDir)

    files.forEach(file => {
        const content = fs.readFileSync(path.join(templateDir, file), 'utf-8')
        const renamed = content.replaceAll('__NAME__', name)
        const newFile = file.replace(type, name)
        fs.writeFileSync(path.join(targetDir, newFile), renamed)
    })

    // Update router.js (pages only)
    if (type === 'page') addRoute(name)

    // Log success
    console.log(`${type} "${name}" created!`)
    }