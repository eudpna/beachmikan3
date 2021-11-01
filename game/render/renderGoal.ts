import { Vec2 } from "../lib/physics"
import { Screen } from "../obj/screen"
import { Resource } from "../resource/loadResource"
import { ImgCtx, drawImage } from "./drawImage"

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