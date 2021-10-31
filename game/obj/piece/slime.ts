import conf from "../../conf"
import { Direction4 } from "../../lib/physics"
import { Player } from "../player"
import { Screen } from "../screen"
import { Piece } from "./piece"

export class Slime extends Piece {
    hp = 2
    maxHP = 2

    constructor(x: number, y: number) {
        super('slime', x, y)
    }

    render(cctx: CanvasRenderingContext2D, screen: Screen) {
        cctx.fillStyle = 'blue'
        cctx.fillRect(this.x * conf.c - screen.x, this.y * conf.c - screen.y, conf.c, conf.c)
    }

    action(player: Player) {
        player.hp--
        return false
    }
}