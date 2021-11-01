import conf from "../conf"
import { restrict } from "../lib/math"
import { Direction4, Rect, Vec2 } from "../lib/physics"
import { drawImage } from "../render/drawImage"
import { Resource } from "../resource/loadResource"
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
    // isWalking = false
    // isFlying = false
    readonly accel = 3
    readonly jumpForce = 18
    readonly maxVx = 12
    readonly maxVy = 20
    readonly resistance = 3
    // walkCount = 0
    isGrounding = false
    anime: {
        directionCount: number,
        walkCount: number,
        isFlying: boolean,
        isJumping: boolean,
        jumpCount: number,
        direction: 'l' | 'r'
        isWalking: boolean,
    } = {
        directionCount: 0,
        walkCount: 0,
        isFlying: false,
        isJumping: false,
        jumpCount: 0,
        direction: 'l',
        isWalking: false,
    }

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    // 毎フレーム呼ばれる更新関数
    update(keys: string[], world: World) {
        if (world.isGoal) this.moveAtGoal(world.geo)
        else this.move(keys, world.geo)
        this.animate(world.geo, keys)
    }

    private moveX(keys: string[], geo: Geo) {
        // x漸減
        if (!keys.includes('left') && !keys.includes('right')) {
            this.v.x += Math.abs(this.v.x) < this.resistance ? 0 : (
                this.v.x < 0 ? this.resistance : -this.resistance
            )
        }
        if (keys.includes('left') && keys.includes('right')) { }
        else if (keys.includes('left')) {
            this.v.x -= this.accel
        }
        else if (keys.includes('right')) {
            this.v.x += this.accel
        }
        // x速度制限
        this.v.x = restrict(this.v.x, -this.maxVx, this.maxVx)
        // x移動
        this.x += this.v.x
         // x 衝突判定
        const touches = collide(this, geo, ['l', 'r'])
        if (touches.includes('b')) this.isGrounding = true
        // フラグリセット
        if (touches.includes('b') || isTouching(this, geo, 'b')) this.isJumping = false
    }

    private moveY(keys: string[], geo: Geo) {
        // y
        // y 上衝突
        if (isTouching(this, geo, 't')) this.v.y = 1
        //　y 重力
        this.v.y += 1.5
        
        // y 速度制限
        this.v.y = restrict(this.v.y, -this.maxVy, this.maxVy)
        this.y += this.v.y
        // y 衝突判定
        const touches = collide(this, geo, ['t', 'b'])
        if (touches.includes('b')) this.isGrounding = true
    }

    private jump(keys: string[], geo: Geo) {
        const touches = collide(this, geo, ['t', 'b'])
        if (touches.includes('b')) this.isGrounding = true
        if (this.isGrounding && keys.includes('up')) {
            this.isJumping = true
            this.v.y = -this.jumpForce
        }
    }

    private move(keys: string[], geo: Geo) {
        this.jump(keys, geo)
        this.isGrounding = false
        this.moveY(keys, geo)
        this.jump(keys, geo)
        this.moveX(keys, geo)
        this.jump(keys, geo)
    }

    moveAtGoal(geo: Geo): void {
        this.v.x = this.maxVx

        // x 移動
        this.x += this.v.x
        // x 衝突判定
        collide(this, geo, ['l', 'r'])

        //　y 重力
        this.v.y += 1.5

        // y 速度制限
        this.v.y = restrict(this.v.y, -this.maxVy, this.maxVy)
        // y 移動
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

    render(cctx: CanvasRenderingContext2D, screen: Screen, imgs: Resource['imgs']) {
        // cctx.fillStyle = 'red'
        // cctx.fillRect(this.x - screen.x, this.y - screen.y, this.w, this.h)

        const walkStep = (() => {
            let result = 0
            let tmp = Math.floor(this.anime.walkCount / 3) % 4
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
            else if (this.anime.isFlying) return 'mikan-fly'
            else if (this.anime.isWalking) return `mikan-walk${walkStep}`
            return 'mikan-stop'
        })()

        const playerOffset: Rect = {
            x: -5,
            y: -5,
            w: 40,
            h: 40
        }

        
        drawImage(cctx, {
            img: imgs[img],
            offset: {
                x: this.anime.direction === 'l' ? (4*conf.c) : playerOffset.x,
                y: playerOffset.y
            },
            x: this.x - screen.x,
            y: this.y - screen.y,
            w: playerOffset.w,
            h: playerOffset.h,
            flipH: this.anime.direction === 'l',
            rotate: 0
        })
        
    }

    animate(geo: Geo, keys: string[]): void {

        if (!this.anime.isJumping) {
            this.anime.jumpCount = 0
        } else {
            this.anime.jumpCount += 1
        }

        if (this.anime.directionCount < 30 && this.anime.direction === 'r') {
            this.anime.directionCount += 1
        } else if (this.anime.directionCount > -30 && this.anime.direction === 'l') {
            this.anime.directionCount -= 1
        }
        // 向きを設定
        // if (gd.state.stage.isGoal) {
        //     this.anime.direction = 'r'
        // }
        if (keys.includes('left') && !keys.includes('right')) {
            this.anime.direction = 'l'
        }
        else if (!keys.includes('left') && keys.includes('right')) {
            this.anime.direction = 'r'
        }

        // 歩いているか
        if (this.v.x !== 0 && isTouching(this, geo, 'b')) {
            this.anime.isWalking = true
            this.anime.walkCount += 1
        } else {
            this.anime.isWalking = false
            this.anime.walkCount = 0
        }

        // 空中にいるか
        if (isTouching(this, geo, 'b')) {
            this.anime.isFlying = false
            this.anime.isJumping = false
        } else {
            this.anime.isFlying = true
            // ジャンプしているか
            this.anime.isJumping = (this.v.y < 0)
        }
    }

}