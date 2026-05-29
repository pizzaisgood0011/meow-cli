import fs from 'fs'
import path from 'path'

// Check if a file or folder exists
export function exists(targetPath) {
    return fs.existsSync(targetPath)
}

// Create a folder (including nested)
export function makeDir(targetPath) {
    fs.mkdirSync(targetPath, { recursive: true })
}

// Read a file as text
export function readFile(targetPath) {
    return fs.readFileSync(targetPath, 'utf-8')
}

// Write text to a file
export function writeFile(targetPath, content) {
    fs.writeFileSync(targetPath, content, 'utf-8')
}

// Delete a folder and everything inside
export function deleteDir(targetPath) {
    fs.rmSync(targetPath, { recursive: true, force: true })
}

// List all folders inside a directory
export function listDirs(targetPath) {
    if (!fs.existsSync(targetPath)) return []
    return fs.readdirSync(targetPath, { withFileTypes: true})
        .filter(d => d.isDirectory())
        .map(d => d.name)
}