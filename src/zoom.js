export function zoom(app, direction, x, y) {
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
}
