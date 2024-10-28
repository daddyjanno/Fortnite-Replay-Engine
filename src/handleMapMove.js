export function handleDown(app, e) {
    let startPos = {
        x: e.clientX,
        y: e.clientY,
    }

    function handleMove(e) {
        const distX = e.clientX - startPos.x
        const distY = e.clientY - startPos.y
        app.stage.x += distX
        app.stage.y += distY
        startPos = {
            x: e.clientX,
            y: e.clientY,
        }
    }

    function handleUp(handleMove) {
        app.stage.off('pointermove', handleMove)
    }
    app.stage.on('pointermove', handleMove)
    window.addEventListener('pointerup', () => handleUp(handleMove))
}
