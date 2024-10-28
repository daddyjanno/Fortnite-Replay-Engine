import { Graphics } from 'pixi.js'
import { getData } from './getData'

export async function createPlayers(app) {
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
