import conf from "../conf"
import { Geo } from "../obj/geo"
import { Screen } from "../obj/screen"

const wallColor = '#e6d367'

export function renderGeo(cctx: CanvasRenderingContext2D, geo: Geo, screen: Screen) {
    for (let i = 0; i < geo.length; i++) {
        for (let j = 0; j < geo[0].length; j++) {
            if (geo[i][j] === 0) continue
            else {
                const x = i * 32 - screen.x
                const y = j * 32 - screen.y
                const w = conf.c + 1
                const h = conf.c + 1
                cctx.fillStyle = wallColor
                cctx.fillRect(x, y, w, h)
                const outlineWidth = 2
                cctx.lineWidth = outlineWidth
                // 上の輪郭線を描画
                if (geo[i][j - 1] !== 1) {
                    cctx.strokeStyle = 'black'
                    cctx.beginPath()
                    cctx.moveTo(x, y)
                    cctx.lineTo(x + w, y)
                    cctx.stroke()
                }
                // 下の輪郭線を描画
                if (geo[i][j + 1] !== 1) {
                    cctx.strokeStyle = 'black'
                    cctx.beginPath()
                    cctx.moveTo(x, y + h)
                    cctx.lineTo(x + w, y + h)
                    cctx.stroke()
                }
                // 左の輪郭線を描画
                if (geo[i - 1][j] !== 1) {
                    cctx.strokeStyle = 'black'
                    cctx.beginPath()
                    cctx.moveTo(x, y)
                    cctx.lineTo(x, y + h)
                    cctx.stroke()
                }
                // 右の輪郭線を描画
                if (geo[i + 1][j] !== 1) {
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

