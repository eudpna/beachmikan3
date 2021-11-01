import { ImgCtx, drawImage } from "../render/drawImage"
import { Resource } from "../resource/loadResource"
import { Screen } from "./screen"

export class Goal {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    render(cctx: CanvasRenderingContext2D, imgs: Resource['imgs'], screen: Screen) {
        const w = 100
        const h = 100

        const goalImgCtx: ImgCtx = {
            img: imgs['goal'],
            offset: {
                x: -(w),
                y: -(h / 2) + 3
            },
            x: this.x - screen.x,
            y: this.y - screen.y,
            w: w,
            h: h,
            flipH: false,
            rotate: 20
        }

        drawImage(cctx, goalImgCtx)
    }
}