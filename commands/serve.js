import chokidar from 'chokidar'
import liveServer from 'live-server'
import path from 'path'
import { log } from '../utils/logger.js'

export function serve() {
    const projectDir = process.cwd()
    const srcDir = path.join(projectDir, 'src')

    // Check if src exists
    if (!path.resolve(srcDir)) {
        log.error('No src/ folder found. Are you in the right directory?')
        process.exit(1)
    }

    // Start live server
    const params = {
        port: 3000,
        root: projectDir,
        open: true,     // auto opens browser
        logLevel: 0,    // silent
        wait: 100,
    }

    liveServer.start(params)
    log.success('Dev server running at http://localhost:3000')

    // Watch src/ for changes
    chokidar.watch(srcDir, {
        ignored: /(^|[\/\\])\../,  // ignore hidden files
        persistent: true,
        ignoreInitial: true
    })
        .on('change', (filePath) => {
            log.info(`File changed: ${filePath}`)
        })
        .on('add', (filePath) => {
            log.info(`File added: ${filePath}`)
        })
        .on('unlink', (filePath) => {
            log.warn(`File removed: ${filePath}`)
        })
}