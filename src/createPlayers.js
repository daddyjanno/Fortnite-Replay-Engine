import { Graphics } from 'pixi.js'
import { getData } from './getData'

const data = await getData()
export async function createPlayers(app) {
    for (const player in data.players) {
        const p = data.players[player]
        p.skin = createPlayer()
        p.skin.x = p.positions['0'][0]
        p.skin.y = p.positions['0'][1]
        app.stage.addChild(p.skin)
    }
    return data
}

export function createPlayer() {
    const playerSkin = new Graphics()
        .circle(0, 0, 10)
        .fill({ color: Math.random() * 0xffffff })
    playerSkin.alpha = 0

    return playerSkin
}
