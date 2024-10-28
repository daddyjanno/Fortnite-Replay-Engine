import { Application, Sprite } from 'pixi.js'

console.log('Fortnite Replay Engine')

const app = new Application()
await app.init({
    resizeTo: window,
    antialias: true,
})
document.body.appendChild(app.canvas)

const map = Sprite.from('https://assets.codepen.io/39394/fortnite-map.jpg')
console.log(map)

map.anchor.set(0.5)
map.x = app.screen.width / 2
map.y = app.screen.height / 2
app.stage.addChild(map)
