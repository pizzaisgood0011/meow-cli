export const log = {
    success: (msg) => console.log(`\x1b[32m✅ ${msg}\x1b[0m`),
    error: (msg) => console.log(`\x1b[31m❌ ${msg}\x1b[0m`),
    info: (msg) => console.log(`\x1b[36mℹ️  ${msg}\x1b[0m`),
    warn: (msg) => console.log(`\x1b[33m⚠️  ${msg}\x1b[0m`),
}