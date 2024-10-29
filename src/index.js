import { Application, Graphics } from 'pixi.js'
import { createMap } from './createMap'
import { zoom } from './zoom'
import { handleDown } from './handleMapMove'
import { getData } from './getData'
import { createPlayer, createPlayers } from './createPlayers'

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
const newData = await createPlayers(app)
// await createPlayers(app)

await movePlayers(app)
animate()

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

let loop
let mustStopLoop = false
let time = 0
let sec = 0
let lastLoopTime = 0

function animate(now) {
    let elapsedMS = now - lastLoopTime

    if (!isNaN(elapsedMS)) {
        time += elapsedMS * 50
        sec = parseInt(time / 1000)
    }

    movePlayers(app)

    lastLoopTime = now

    if (!mustStopLoop) {
        loop = requestAnimationFrame(animate)
    } else {
        cancelAnimationFrame(loop)
    }
}

async function movePlayers(app) {
    for (const player in newData.players) {
        const p = newData.players[player]

        if (p.landed_at < sec) {
            const currentPos = Math.floor((sec - p.landed_at) / 5)

            if (sec < p.survival_time) {
                if (p.positions[currentPos.toString()]) {
                    p.skin.alpha = 1
                    p.skin.x = p.positions[currentPos.toString()][0]

                    p.skin.y = p.positions[currentPos.toString()][1]
                }
            } else {
                p.skin.alpha = 0.3
            }
        }
    }
}
