import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { log } from '../utils/logger.js'
import { makeDir, writeFile, exists } from '../utils/fs.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export function create(projectName) {
    const projectDir = path.join(process.cwd(), projectName)

    if (exists(projectDir)) {
        log.error(`Project "${projectName}" already exists!`)
        process.exit(1)
    }

    log.info(`Creating project "${projectName}"...`)

    const dirs = [
        'src/app/pages/home',
        'src/app/components/navbar',
        'src/app/core',
        'src/styles',
        'src/assets/fonts',
        'src/assets/icons',
        'src/assets/images',
    ]

    dirs.forEach(dir => makeDir(path.join(projectDir, dir)))

    // index.html
    writeFile(path.join(projectDir, 'index.html'), `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
  <link rel="stylesheet" href="src/styles/reset.css">
  <link rel="stylesheet" href="src/styles/variables.css">
  <link rel="stylesheet" href="src/styles/global.css">
  <link rel="stylesheet" href="src/app/pages/home/home.css">
</head>
<body>
  <div id="app"></div>
  <script src="src/app/core/router.js" type="module"></script>
</body>
</html>`)

    // router.js
    writeFile(path.join(projectDir, 'src/app/core/router.js'), `// core/router.js
import { render as home } from '../pages/home/home.js'

const routes = {
  // __ROUTES__
  '#home': home,
}

function navigate() {
  const hash = window.location.hash || '#home'
  const Page = routes[hash]
  if (Page) Page()
  document.title = \`${projectName} | \${hash.replace('#', '')}\`
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

window.addEventListener('hashchange', navigate)
window.addEventListener('DOMContentLoaded', navigate)
`)

    // home.html
    writeFile(path.join(projectDir, 'src/app/pages/home/home.html'), `<!-- home page template -->
<div class="home">
  <div class="home-card">
    <span class="badge">😺🚀 meow-cli-scaffold</span>
    <h1>Hello, ${projectName}</h1>
    <p>Your vanilla JS app is ready.</p>
  </div>
</div>`)

    // home.css
    writeFile(path.join(projectDir, 'src/app/pages/home/home.css'), `/* home page */
body {
  margin: 0;
}

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  background: linear-gradient(135deg, #f7f7f7, #5d0bb5, #491980);
  font-family: 'Segoe UI', system-ui, sans-serif;
  gap: 1.5rem;
}

.home-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem 4rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.home h1 {
  font-size: 3.5rem;
  font-weight: 900;
  color: #fff;
  letter-spacing: -2px;
}

.home p {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
}

.home .badge {
  padding: 0.4rem 1.2rem;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 999px;
  font-size: 0.85rem;
  color: #fff;
  letter-spacing: 1px;
}`)

    // home.js
    writeFile(path.join(projectDir, 'src/app/pages/home/home.js'), `// home page logic
export async function render() {
  const app = document.getElementById('app')
  const res = await fetch('./src/app/pages/home/home.html')
  const html = await res.text()
  app.innerHTML = html
}`)

    // navbar.html
    writeFile(path.join(projectDir, 'src/app/components/navbar/navbar.html'), `<!-- navbar template -->
<nav id="navbar">
  <a href="#home">Home</a>
</nav>`)

    // navbar.css
    writeFile(path.join(projectDir, 'src/app/components/navbar/navbar.css'), `/* navbar styles */
#navbar {
  display: flex;
  gap: 1rem;
  padding: 1rem;
}`)

    // navbar.js
    writeFile(path.join(projectDir, 'src/app/components/navbar/navbar.js'), `// navbar logic
export async function render(target) {
  const res = await fetch('./src/app/components/navbar/navbar.html')
  const html = await res.text()
  target.innerHTML = html
}`)

    // reset.css
    writeFile(path.join(projectDir, 'src/styles/reset.css'), `/* reset.css */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}`)

    // variables.css
    writeFile(path.join(projectDir, 'src/styles/variables.css'), `/* variables.css */
:root {
  --color-primary: #000000;
  --color-bg: #ffffff;
  --font-main: 'Segoe UI', system-ui, sans-serif;
}`)

    // global.css
    writeFile(path.join(projectDir, 'src/styles/global.css'), `/* global.css */
body {
  background: var(--color-bg);
  color: var(--color-primary);
  font-family: var(--font-main);
}`)

    // .gitignore
    writeFile(path.join(projectDir, '.gitignore'), `node_modules/
dist/`)

    // .editorconfig
    writeFile(path.join(projectDir, '.editorconfig'), `root = true

[*]
end_of_line = lf
charset = utf-8
indent_style = space
indent_size = 2`)

    // meow.config.json
    writeFile(path.join(projectDir, 'meow.config.json'), `{
  "projectName": "${projectName}",
  "pagesDir": "src/app/pages",
  "componentsDir": "src/app/components",
  "routerFile": "src/app/core/router.js"
}`)

    // package.json
    writeFile(path.join(projectDir, 'package.json'), `{
  "name": "${projectName}",
  "version": "1.0.0",
  "description": "",
  "type": "module",
  "scripts": {
    "start": "meow serve",
    "build": "meow build"
  },
  "license": "MIT"
}`)

    log.success(`Project "${projectName}" created!`)
    log.info(`Get started:\n\n  cd ${projectName}\n  meow serve\n`)
}