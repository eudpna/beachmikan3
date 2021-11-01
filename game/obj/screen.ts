import conf from "../conf"
import { restrict } from "../lib/math"
import { Direction4, Vec2 } from "../lib/physics"
import { Player } from "./player"


export class Screen {
    x = 0
    y = 0
    w = conf.screen.w
    h = conf.screen.h
    scale = conf.screen.scale
    readonly maxV = 300
    readonly divide = 10
    min: Vec2
    max: Vec2

    constructor(x: number, y: number, min: Vec2, max: Vec2) {
        this.x = x
        this.y = y
        this.min = min
        this.max = max
    }

    update(player: Player) {
        this.move(player)
    }

    private move(player: Player) {

        const target = {
            x: (player.x) + player.w / 2 + (32 * 5 * (player.directionCount / 30)),
            y: (player.y) + player.h / 2
        }

        const vx = restrict((this.x - (target.x - (this.w/2))) / this.divide, -this.maxV, this.maxV)
        const vy = restrict((this.y - (target.y - (this.h/2))) / this.divide, -this.maxV, this.maxV)

        this.x -= vx
        this.y -= vy

        // 位置制限
        if (this.x > this.max.x) this.x = this.max.x
        if (this.x < this.min.x) this.x = this.min.x
        if (this.y > this.max.y) this.y = this.max.y
        if (this.y < this.min.y) this.y = this.min.y
    }




    
}