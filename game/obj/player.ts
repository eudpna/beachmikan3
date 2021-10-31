import conf from "../conf"
import { restrict } from "../lib/math"
import { Direction4 } from "../lib/physics"
import { collide, isTouching } from "./bodi"
import { Geo } from "./geo"
import { Screen } from "./screen"
import { World } from "./world"

export class Player {
    x = 0
    y = 0
    w = 30
    h = 30
    v = {
        x: 0,
        y: 0
    }
    isDead = false
    isJumping = false
    isWalking = false
    isFlying = false
    readonly accel = 3
    readonly jumpForce = 17
    readonly maxVx = 12
    readonly maxVy = 20
    readonly resistance = 3
    walkCount = 0

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    // 毎フレーム呼ばれる更新関数
    update(keys: string[], world: World) {
        this.move(keys, world.geo)
    }

    move(keys: string[], geo: Geo) {
        let vx = 0
        if (keys.includes('left') && keys.includes('right')) {}
        else if (keys.includes('left')) {
            vx -= this.accel
        }
        else if (keys.includes('right')) {
            vx += this.accel
        }
        // x速度制限
        vx = restrict(vx, -this.maxVx, this.maxVx)
        // x移動
        this.x += vx
        // x 衝突判定
        collide(this, geo, ['l', 'r'])


        // y
        let vy = 0
        // y 上衝突
        if (isTouching(this, geo, 't')) vy = 1
        //　y 重力
        vy += 1.5
        // y ジャンプ
        if (isTouching(this, geo, 'b') && !this.isJumping && keys.includes('up')) {
            this.isJumping = true
            vy = -this.jumpForce
        }
        // y 速度制限
        vy = restrict(vy, -this.maxVy, this.maxVy)
        this.v.y += vy
        this.y += this.v.y
        // y 衝突判定
        collide(this, geo, ['t', 'b'])
    }

    // move(direction: Direction4) {
    //     switch (direction) {
    //         case 'left': {
    //             this.x--
    //             break
    //         }
    //         case 'right': {
    //             this.x++
    //             break
    //         }
    //         case 't': {
    //             this.y--
    //             break
    //         }
    //         case 'b': {
    //             this.y++
    //             break
    //         }
    //     }
    // }

    render(cctx: CanvasRenderingContext2D, screen: Screen) {
        console.log(this.x, this.y)
        cctx.fillStyle = 'red'
        cctx.fillRect(this.x - screen.x, this.y - screen.y, this.w, this.h)


        const walkStep = (() => {
            let result = 0
            let tmp = Math.floor(this.walkCount / 3) % 4
            switch (tmp) {
                case 0: {
                    return 2
                }
                case 1: {
                    return 0
                }
                case 2: {
                    return 1
                }
                case 3: {
                    return 0
                }
            }
        })()

        const img = (() => {
            if (this.isDead) return 'mikan-fly'
            else if (this.isJumping) return 'mikan-jump'
            else if (this.isFlying) return 'mikan-fly'
            else if (this.isWalking) return `mikan-walk${walkStep}`
        })()
        
        // drawImage(cctx, {
        //     img: gd.preset.imgs[playerImg],
        //     offset: {
        //         x: playerOffset.x,
        //         y: gd.state.stage.player.isMikan ? -3 : playerOffset.y
        //     },
        //     x: gd.state.stage.player.r.x - gd.state.stage.screen.p.x,
        //     y: gd.state.stage.player.r.y - gd.state.stage.screen.p.y,
        //     w: playerOffset.w,
        //     h: playerOffset.h,
        //     flipH: gd.state.stage.anime.player.direction === 'left',
        //     rotate: rotate
        // })
        
    }

}