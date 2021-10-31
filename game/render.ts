import { World } from "./obj/world"

// 描画手続き

export function render(cctx: CanvasRenderingContext2D, world: World) {
    console.log('cctx is', cctx)
    clearCanvas(cctx)
    world.player.render(cctx, world.screen)
    drawCanvasBorder(cctx)
}

function clearCanvas(cctx: CanvasRenderingContext2D) {
    cctx.fillStyle = 'white'
    cctx.fillRect(0, 0, cctx.canvas.width, cctx.canvas.height)
}

function drawCanvasBorder(cctx: CanvasRenderingContext2D) {
    cctx.strokeStyle = 'black'
    cctx.lineWidth = 3
    cctx.strokeRect(0, 0, cctx.canvas.width, cctx.canvas.height)
}