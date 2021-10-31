import { World } from "./obj/world"
import { renderLoadingScreen } from "./renderLoadingScreen"

export class Renderer {
    cctx: CanvasRenderingContext2D

    constructor(cctx: CanvasRenderingContext2D) {
        this.cctx = cctx
    }

    renderLoadingScreen() {
        renderLoadingScreen(this.cctx)
    }

    render(world: World) {
        // canvasを真っ白にリセット
        this.cctx.fillStyle = 'white'
        this.cctx.fillRect(0, 0, this.cctx.canvas.width, this.cctx.canvas.height)

        world.render(this.cctx)

        // border
        this.cctx.strokeStyle = 'black'
        this.cctx.lineWidth = 3
        this.cctx.strokeRect(0, 0, this.cctx.canvas.width, this.cctx.canvas.height)
    }
}