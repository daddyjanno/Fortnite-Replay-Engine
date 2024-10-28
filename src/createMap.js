import { Assets, Sprite } from 'pixi.js'

export async function createMap(app) {
    const asset = await Assets.load(
        'https://assets.codepen.io/39394/fortnite-map.jpg'
    )
    const map = Sprite.from(asset)

    map.x = 0
    map.y = 0
    app.stage.addChild(map)
    map.eventMode = 'static'
    map.cursor = 'pointer'
}
