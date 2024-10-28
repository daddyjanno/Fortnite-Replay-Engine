import { Application, applyStyleParams, Assets, Sprite } from 'pixi.js'

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

function bindEvents() {
    app.stage.eventMode = 'static'
    app.stage.hitArea = app.screen
    app.stage.on('wheel', handleWheel)
}
bindEvents()
function handleWheel(e) {
    zoom(e.originalEvent.deltaY, e.global.x, e.global.y)
}

function zoom(direction, x, y) {
    const scaleFactor = direction > 0 ? 0.75 : 1.25

    const worldPos = {
        x: (x - app.stage.x) / app.stage.scale.x,
        y: (y - app.stage.y) / app.stage.scale.y,
    }

    const nextScale = {
        x: app.stage.scale.x * scaleFactor,
        y: app.stage.scale.y * scaleFactor,
    }

    const nextPos = {
        x: worldPos.x * nextScale.x + app.stage.x,
        y: worldPos.y * nextScale.y + app.stage.y,
    }

    app.stage.scale.x = nextScale.x
    app.stage.scale.y = nextScale.y

    app.stage.x -= nextPos.x - x
    app.stage.y -= nextPos.y - y

    console.log(
        'pos :',
        { x, y },
        'worldPos :',
        worldPos,
        'nextScale: ',
        nextScale,
        'nextPos :',
        nextPos
    )
}
