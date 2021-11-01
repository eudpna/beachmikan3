import { Vec2 } from "../lib/physics"
import { Screen } from "../obj/screen"
import { World } from "../obj/world"
import { Resource } from "../resource/loadResource"
import { drawImage, ImgCtx } from "./drawImage"
import { renderBackGround } from "./renderBackGround"
import { renderGeo } from "./renderGeo"
import { renderUI } from "./renderUI"

// 描画手続き

export function render(cctx: CanvasRenderingContext2D, world: World, imgs: Resource['imgs']) {
    clearCanvas(cctx)
    renderBackGround(cctx, imgs)
    renderGeo(cctx, world.geo, world.screen)
    world.player.render(cctx, world.screen, imgs)
    world.goal.render(cctx, imgs, world.screen)
    renderUI(cctx, imgs, world)
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






