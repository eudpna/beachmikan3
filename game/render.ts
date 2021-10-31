import { World } from "./obj/world"

// 描画手続き

export function render(cctx: CanvasRenderingContext2D, world: World) {
    clearCanvas()
    world.player.render(cctx, world.screen)
    drawCanvasBorder()
}

function clearCanvas() {
    this.cctx.fillStyle = 'white'
    this.cctx.fillRect(0, 0, this.cctx.canvas.width, this.cctx.canvas.height)
}

function drawCanvasBorder() {
    this.cctx.strokeStyle = 'black'
    this.cctx.lineWidth = 3
    this.cctx.strokeRect(0, 0, this.cctx.canvas.width, this.cctx.canvas.height)
}