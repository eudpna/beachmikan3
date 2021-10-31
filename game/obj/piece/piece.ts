import conf from "../../conf"
import { Direction4 } from "../../lib/physics"
import { Player } from "../player"
import { Screen } from "../screen"

export class Piece {
    name: string
    x: number
    y: number

    constructor(name: string, x: number, y: number) {
        this.name = name
        this.x = x
        this.y = y
    }

    render(cctx: CanvasRenderingContext2D, screen: Screen) {
        
    }

    action(player: Player): boolean {
        return true
    }

}