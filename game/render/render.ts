import { Vec2 } from "../lib/physics"
import { Screen } from "../obj/screen"
import { World } from "../obj/world"
import { Resource } from "../resource/loadResource"
import { drawImage, ImgCtx } from "./drawImage"
import { renderGeo } from "./renderGeo"

// 描画手続き

export function render(cctx: CanvasRenderingContext2D, world: World, imgs: Resource['imgs']) {
    clearCanvas(cctx)
    renderBackGround(cctx, imgs)
    renderGeo(cctx, world.geo, world.screen)
    world.player.render(cctx, world.screen, imgs)
    renderGoal(cctx, imgs, world.goal, world.screen)
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




function renderBackGround(cctx: CanvasRenderingContext2D, imgs: Resource['imgs']) {
    const bgSeaScale = 800
    cctx.drawImage(imgs['bg-sea'], -150, 0, bgSeaScale, bgSeaScale * (600 / 1000))
}


export function renderGoal(cctx: CanvasRenderingContext2D, imgs: Resource['imgs'], goal: Vec2, screen: Screen) {
    const w = 100
    const h = 100

    const goalImgCtx: ImgCtx = {
        img: imgs['goal'],
        offset: {
            x: -(w),
            y: -(h / 2) + 3
        },
        x: goal.x - screen.x,
        y: goal.y - screen.y,
        w: w,
        h: h,
        flipH: false,
        rotate: 20
    }

    drawImage(cctx, goalImgCtx)
}