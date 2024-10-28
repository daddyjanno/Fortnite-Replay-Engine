import { Assets, Sprite } from 'pixi.js'

export async function createMap(app) {
    const asset = await Assets.load(
        'https://assets.codepen.io/39394/fortnite-map.jpg'
    )
    const map = Sprite.from(asset)

    map.x = app.screen.width / 2 - map.width / 2
    map.y = app.screen.height / 2 - map.height / 2
    app.stage.addChild(map)
    map.eventMode = 'static'
    map.cursor = 'pointer'
}
