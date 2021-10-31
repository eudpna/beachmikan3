import conf from "../conf";
import { Player } from "../obj/player";
import { Screen } from "../obj/screen";

export function renderGrid(cctx: CanvasRenderingContext2D, screen: Screen, player: Player) {
    const d = conf.c * 20
    const r = {
        x: Math.ceil(((player.x*conf.c) - d) / conf.c) * conf.c,
        y: Math.ceil(((player.y*conf.c) - d) / conf.c) * conf.c,
        w: screen.w + 2*d,
        h: screen.h + 2*d,
    }


    cctx.strokeStyle = 'black'
    cctx.lineWidth = 1
    for (let x = -50; x < 50; x++) {
        cctx.beginPath()
        cctx.moveTo(x * conf.c - screen.x + r.x, 0)
        cctx.lineTo(x * conf.c - screen.x + r.x, conf.screen.h)
        cctx.stroke()
    }
    for (let y = -50; y < 50; y++) {
        cctx.beginPath()
        cctx.moveTo(-10, y * conf.c - screen.y + r.y)
        cctx.lineTo(conf.screen.w, y * conf.c - screen.y + r.y)
        cctx.stroke()
    }
}