import fs from 'fs'
import path from 'path'
import { minify as minifyJS } from 'terser'
import CleanCSS from 'clean-css'
import { minify as minifyHTML } from 'html-minifier-terser'
import { log } from '../utils/logger.js'

const SRC_DIR = path.join(process.cwd(), 'src')
const DIST_DIR = path.join(process.cwd(), 'dist')

// Recursively get all files in a directory
function getAllFiles(dir) {
    let files = []
    fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
        const fullPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
            files = files.concat(getAllFiles(fullPath))
        } else {
            files.push(fullPath)
        }
    })
    return files
}

export async function build() {
    log.info('Building project...')

    // Clean dist/ folder
    if (fs.existsSync(DIST_DIR)) {
        fs.rmSync(DIST_DIR, { recursive: true, force: true })
    }
    fs.mkdirSync(DIST_DIR, { recursive: true })

    const files = getAllFiles(SRC_DIR)
    let count = { js: 0, css: 0, html: 0 }

    for (const file of files) {
        // Resolve output path (src/ → dist/)
        const relative = path.relative(SRC_DIR, file)
        const outPath = path.join(DIST_DIR, relative)
        fs.mkdirSync(path.dirname(outPath), { recursive: true })

        const ext = path.extname(file)
        const content = fs.readFileSync(file, 'utf-8')

        if (ext === '.js') {
            // Minify JS
            const result = await minifyJS(content)
            fs.writeFileSync(outPath, result.code, 'utf-8')
            count.js++

        } else if (ext === '.css') {
            // Minify CSS
            const result = new CleanCSS().minify(content)
            fs.writeFileSync(outPath, result.styles, 'utf-8')
            count.css++

        } else if (ext === '.html') {
            // Minify HTML
            const result = await minifyHTML(content, {
                collapseWhitespace: true,
                removeComments: true,
                minifyCSS: true,
                minifyJS: true,
            })
            fs.writeFileSync(outPath, result, 'utf-8')
            count.html++

        } else {
            // Copy everything else (fonts, images, icons)
            fs.copyFileSync(file, outPath)
        }
    }

    log.success(`Build complete!`)
    log.info(`JS files minified  : ${count.js}`)
    log.info(`CSS files minified : ${count.css}`)
    log.info(`HTML files minified: ${count.html}`)
    log.info(`Output -> dist/`)
}