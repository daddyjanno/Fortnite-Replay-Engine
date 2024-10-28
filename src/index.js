import { Application, Graphics } from 'pixi.js'
import { createMap } from './createMap'
import { zoom } from './zoom'
import { handleDown } from './handleMapMove'
import { getData } from './getData'

console.log('Fortnite Replay Engine')

const app = new Application()
await app.init({
    resizeTo: window,
    antialias: true,
})
document.body.appendChild(app.canvas)

await createMap(app)
await getData()
bindEvents()
await createPlayers()

function bindEvents() {
    app.stage.eventMode = 'static'
    app.stage.on('wheel', handleZoom).on('pointerdown', handleMapMovements)
}

function handleZoom(e) {
    zoom(app, e.originalEvent.deltaY, e.global.x, e.global.y)
}

function handleMapMovements(e) {
    handleDown(app, e)
}

async function createPlayers() {
    const data = await getData()
    for (const player in data.players) {
        console.log(player, data.players[player])
        const p = data.players[player]
        p.skin = createPlayer()
        p.skin.x = p.positions['0'][0]
        p.skin.y = p.positions['0'][1]
        app.stage.addChild(p.skin)
    }
}

function createPlayer() {
    const playerSkin = new Graphics()
        .circle(0, 0, 10)
        .fill({ color: Math.random() * 0xffffff })

    return playerSkin
}
