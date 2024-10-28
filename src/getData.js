export async function getData() {
    const response = await fetch(
        'https://assets.codepen.io/39394/fornite-game.json'
    )
    const data = await response.json()
    return data
}
