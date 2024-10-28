import { Application } from 'pixi.js'
import { createMap } from './createMap'
import { zoom } from './zoom'
import { handleDown } from './handleMapMove'

console.log('Fortnite Replay Engine')

const app = new Application()
await app.init({
    resizeTo: window,
    antialias: true,
})
document.body.appendChild(app.canvas)

createMap(app)

function bindEvents() {
    app.stage.eventMode = 'static'
    app.stage.on('wheel', handleZoom).on('pointerdown', handleMapMovements)
}
bindEvents()

function handleZoom(e) {
    zoom(app, e.originalEvent.deltaY, e.global.x, e.global.y)
}

function handleMapMovements(e) {
    handleDown(app, e)
}
