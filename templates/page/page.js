// __NAME__ page logic
export async function render() {
    const app = document.getElementById('app')
    const res = await fetch('./src/app/pages/__NAME__/__NAME__.html')
    const html = await res.text()
    app.innerHTML = html
}