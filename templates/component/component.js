// __NAME__ component logic
export async function render(target) {
    const res = await fetch('./src/app/components/__NAME__/__NAME__.html')
    const html = await res.text()
    target.innerHTML = html
}