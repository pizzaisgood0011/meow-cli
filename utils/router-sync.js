import path from 'path'
import { exists, readFile, writeFile } from './fs.js'
import { log } from './logger.js'

const ROUTER_PATH = path.join(process.cwd(), 'src/app/core/router.js')

export function addRoute(name) {
    // Check router.js exists
    if (!exists(ROUTER_PATH)) {
        log.warn('router.js not found! Skipping route sync.')
        return
    }

    const content = readFile(ROUTER_PATH)

    // Check if route already registered
    if (content.includes(`'#${name}'`)) {
        log.warn(`Route "#${name}" already exists in router.js`)
        return
    }

    // Inject import at the top
    const importLine = `import { render as ${name} } from '../pages/${name}/${name}.js'\n`
    const withImport = importLine + content

    // Inject route into routes object
    const routeLine = `  '#${name}': ${name},\n`
    const withRoute = withImport.replace(
        '// __ROUTES__',
        `// __ROUTES__\n${routeLine}`
    )

    // Write back
    writeFile(ROUTER_PATH, withRoute)
    log.info(`Route "#${name}" added to router.js`)
}

export function removeRoute(name) {
    if (!exists(ROUTER_PATH)) {
        log.warn('router.js not found! Skipping route sync.')
        return
    }

    let content = readFile(ROUTER_PATH)

    // Remove import line
    content = content.replace(
        `import { render as ${name} } from '../pages/${name}/${name}.js'\n`,
        ''
    )

    // Remove route line
    content = content.replace(`  '#${name}': ${name},\n`, '')

    writeFile(ROUTER_PATH, content)
    log.info(`Route "#${name}" removed from router.js`)
}