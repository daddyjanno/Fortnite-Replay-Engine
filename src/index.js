import { Application, Assets, Sprite } from 'pixi.js'

console.log('Fortnite Replay Engine')

const app = new Application()
await app.init({
    resizeTo: window,
    antialias: true,
})
document.body.appendChild(app.canvas)

async function createMap() {
    const asset = await Assets.load(
        'https://assets.codepen.io/39394/fortnite-map.jpg'
    )
    const map = Sprite.from(asset)
    map.anchor.set(0.5)
    map.x = app.screen.width / 2
    map.y = app.screen.height / 2
    app.stage.addChild(map)
}

createMap()
