import conf from "../conf"
import { restrict } from "../lib/math"
import { Direction4 } from "../lib/physics"
import { Player } from "./player"



export class Screen {
    x = 0
    y = 0
    w = conf.screen.w
    h = conf.screen.h
    scale = conf.screen.scale
    readonly maxV = 300
    readonly divide = 10

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    move(player: Player) {

        const target = {
            x: (player.x*conf.c) + conf.c / 2,
            y: (player.y*conf.c) + conf.c / 2
        }

        // console.log(target.x, target.y)
        // const vx = this.x - (target.x - (this.w/2))

        const vx = restrict((this.x - (target.x - (this.w/2))) / this.divide, -this.maxV, this.maxV)
        const vy = restrict((this.y - (target.y - (this.h/2))) / this.divide, -this.maxV, this.maxV)

        // console.log(vx, vy)

        let x = this.x - vx
        let y = this.y - vy

        this.x = x
        this.y = y

    }
}