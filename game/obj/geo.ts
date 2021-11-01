import conf from "../conf"
import { Screen } from "./screen"

export type Chips = (0 | 1)[][]

const wallColor = '#e6d367'

export class Geo {
    chips: Chips
    w: number
    h: number

    constructor(chips: Chips) {
        this.chips = chips
        this.w = chips.length
        this.h = chips[0].length
    }

    render(cctx: CanvasRenderingContext2D, screen: Screen) {
        for (let i = 0; i < this.w; i++) {
            for (let j = 0; j < this.h; j++) {
                if (this.chips[i][j] === 0) continue
                else {
                    const x = i * conf.c - screen.x
                    const y = j * conf.c - screen.y
                    const w = conf.c + 1
                    const h = conf.c + 1
                    cctx.fillStyle = wallColor
                    cctx.fillRect(x, y, w, h)
                    const outlineWidth = 2
                    cctx.lineWidth = outlineWidth
                    // 上の輪郭線を描画
                    if (this.chips[i][j - 1] !== 1) {
                        cctx.strokeStyle = 'black'
                        cctx.beginPath()
                        cctx.moveTo(x, y)
                        cctx.lineTo(x + w, y)
                        cctx.stroke()
                    }
                    // 下の輪郭線を描画
                    if (this.chips[i][j + 1] !== 1) {
                        cctx.strokeStyle = 'black'
                        cctx.beginPath()
                        cctx.moveTo(x, y + h)
                        cctx.lineTo(x + w, y + h)
                        cctx.stroke()
                    }
                    // 左の輪郭線を描画
                    if (this.chips[i - 1][j] !== 1) {
                        cctx.strokeStyle = 'black'
                        cctx.beginPath()
                        cctx.moveTo(x, y)
                        cctx.lineTo(x, y + h)
                        cctx.stroke()
                    }
                    // 右の輪郭線を描画
                    if (this.chips[i + 1][j] !== 1) {
                        cctx.strokeStyle = 'black'
                        cctx.beginPath()
                        cctx.moveTo(x + w, y)
                        cctx.lineTo(x + w, y + h)
                        cctx.stroke()
                    }
                }
            }
        }
    }
}
