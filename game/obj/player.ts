import { Howl } from "howler"
import conf from "../conf"
import { getDistance, restrict } from "../lib/math"
import { Direction4, Rect, Vec2 } from "../lib/physics"
import { drawImage } from "../render/drawImage"
import { Resource } from "../resource/loadResource"
import { collide, isTouching } from "./bodi"
import { Geo } from "./geo"
import { Kani } from "./kani"
import { Screen } from "./screen"
import { World } from "./world"

export class Player {
    readonly accel = 3
    readonly jumpForce = 19
    readonly maxVx = 12
    readonly maxVy = 20
    readonly resistance = 3
    readonly w = 30
    readonly h = 30

    x = 0
    y = 0
    v = {
        x: 0,
        y: 0
    }
    isDead = false
    isJumping = false
    isGrounding = true

    // flags for animation
    directionCount = 0
    walkCount = 0
    isFlying = false
    jumpCount = 0
    direction: 'l' | 'r' = 'l'
    isWalking = false
    deadCount = 0
    deadDirection: 'l' | 'r' = 'l'

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    // 毎フレーム呼ばれる更新関数
    update(keys: string[], nowKeys: string[], world: World) {
        if (!this.isDead) {
            this.damage(world.kanis, keys)
        }

        if (this.isDead) this.moveDead()
        else if (world.isGoal) this.moveAtGoal(world.geo)
        else this.move(keys, nowKeys, world.geo)
        this.animate(world.geo, keys)

        if (this.isDead) this.deadCount++
        else this.deadCount = 0

        // 死んだらリトライ
        if (this.deadCount === 30) {
            this.deadCount = 0
            world.retry()
        }
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
        const touches = collide(this, geo.chips, ['l', 'r'])
        if (touches.includes('b')) this.isGrounding = true
        // フラグリセット
        if (touches.includes('b') || isTouching(this, geo.chips, 'b')) this.isJumping = false
    }

    private moveY(keys: string[], geo: Geo) {
        // y
        // y 上衝突
        if (isTouching(this, geo.chips, 't')) this.v.y = 1
        //　y 重力
        this.v.y += 1.5
        
        // y 速度制限
        this.v.y = restrict(this.v.y, -this.maxVy, this.maxVy)
        this.y += this.v.y
        // y 衝突判定
        const touches = collide(this, geo.chips, ['t', 'b'])
        if (touches.includes('b')) this.isGrounding = true
    }

    private jump(nowKeys: string[], geo: Geo) {
        const touches = collide(this, geo.chips, ['t', 'b'])
        if (touches.includes('b')) this.isGrounding = true
        if (!this.isJumping && this.isGrounding && nowKeys.includes('up')) {
            this.isJumping = true
            this.y --;
            this.v.y = -this.jumpForce
            this.playJumpSound()
        }
    }

    private move(keys: string[], nowKeys: string[], geo: Geo) {
        const isGrounding = this.isGrounding
        this.jump(nowKeys, geo)
        this.isGrounding = false
        this.moveY(keys, geo)
        this.jump(nowKeys, geo)
        this.moveX(keys, geo)
        this.jump(nowKeys, geo)
        // 落下死亡判定
        const deadLine = conf.c * (geo.h - 2)
        if (this.y > deadLine) {
            this.isDead = true
            this.playDamageSound()
        }
        // 着地音
        if (!isGrounding && this.isGrounding) this.playRunSound()
    }

    moveAtGoal(geo: Geo): void {
        this.v.x = this.maxVx

        // x 移動
        this.x += this.v.x
        // x 衝突判定
        collide(this, geo.chips, ['l', 'r'])

        //　y 重力
        this.v.y += 1.5

        // y 速度制限
        this.v.y = restrict(this.v.y, -this.maxVy, this.maxVy)
        // y 移動
        this.y += this.v.y
        // y 衝突判定
        collide(this, geo.chips, ['t', 'b'])
    }

    moveDead(): void {
        if (this.deadCount === 1) {
            this.v.y = -15
            if (this.deadDirection === 'l') this.v.x = 5
            else this.v.x = -7
        }

        this.v.y += 2
        this.v.y = restrict(this.v.y, -this.maxVy, this.maxVy)

        this.x += this.v.x
        this.y += this.v.y
    }

    damage(kanis: Kani[], keys: string[]) {
        kanis.forEach(kani => {
            if (kani.isDead) return
            this.stepKani(kani, keys)
            this.hitByKani(kani)
        })
    }

    hitByKani(kani: Kani): void {
        const d = getDistance(this, kani)
        if (d > 32) return
        this.isDead = true
        if (this.x - this.x < 0) this.deadDirection = 'r'
        else this.deadDirection = 'l'
        this.playDamageSound()
    }

    stepKani(kani: Kani, keys: string[]): void {
        if (this.v.y <= 0) return
        if (kani.isDead || this.isDead) return
        if (kani.y - (this.y + this.v.y) > 32 + 6) return
        if (kani.y - (this.y + this.v.y) < 16) return
        if (Math.abs(kani.x - this.x) > 32) return
        kani.isDead = true
        this.v.y = -15
        this.y = kani.y - 32 - 15
        if (keys.includes('up')) {
            this.v.y = -31
            this.playHighJumpSound()
        }
        if (this.x - kani.x < 0) kani.deadDirection = 'l'
        kani.deadDirection = 'r'

        kani.playDamageSound()
    }    

    animate(geo: Geo, keys: string[]): void {
        if (!this.isJumping) {
            this.jumpCount = 0
        } else {
            this.jumpCount += 1
        }

        if (this.directionCount < 30 && this.direction === 'r') {
            this.directionCount += 1
        } else if (this.directionCount > -30 && this.direction === 'l') {
            this.directionCount -= 1
        }
        // 向きを設定
        // if (this.isGoal) {
        //     this.direction = 'r'
        // }
        if (keys.includes('left') && !keys.includes('right')) {
            this.direction = 'l'
        }
        else if (!keys.includes('left') && keys.includes('right')) {
            this.direction = 'r'
        }

        // 歩いているか
        if (this.v.x !== 0 && isTouching(this, geo.chips, 'b')) {
            this.isWalking = true
            this.walkCount += 1
        } else {
            this.isWalking = false
            this.walkCount = 0
        }

        if (this.isWalking && this.walkCount % 6 === 5) this.playRunSound()

        // 空中にいるか
        if (isTouching(this, geo.chips, 'b')) {
            this.isFlying = false
            this.isJumping = false
        } else {
            this.isFlying = true
            // ジャンプしているか
            this.isJumping = (this.v.y < 0)
        }
    }



    render(cctx: CanvasRenderingContext2D, screen: Screen, imgs: Resource['imgs']) {
        // cctx.fillStyle = 'red'
        // cctx.fillRect(this.x - screen.x, this.y - screen.y, this.w, this.h)

        // 死亡アニメーション
        if (this.isDead && ((this.deadCount / 4) % 1 === 0)) {
            return
        }

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
            return 'mikan-stop'
        })()

        const playerOffset: Rect = {
            x: -5,
            y: -5,
            w: 40,
            h: 40
        }

        let rotate = 0
        if (this.isDead) {
            if (this.deadDirection === 'l') rotate = this.deadCount * 6
            else rotate = this.deadCount * -6
        }

        
        drawImage(cctx, {
            img: imgs[img],
            offset: {
                x: this.direction === 'l' ? (4*conf.c) : playerOffset.x,
                y: playerOffset.y
            },
            x: this.x - screen.x,
            y: this.y - screen.y,
            w: playerOffset.w,
            h: playerOffset.h,
            flipH: this.direction === 'l',
            rotate: rotate
        })
    }

    playJumpSound() {
        const audio = new Howl({
            src: ['/audios/main/jump.mp3']
        });        
        audio.play()
    }

    playHighJumpSound() {
        const audio = new Howl({
            src: ['/audios/main/jump-high.mp3']
        });
        audio.play()
    }

    playDamageSound() {        
        const audio = new Howl({
            src: ['/audios/main/hit.mp3']
        });
        audio.volume(1)
        audio.play()
    }

    playRunSound() {
        if (this.isDead) return
        const audio = new Howl({
            src: ['/audios/main/run.mp3']
        });
        audio.volume(0.6)
        audio.play()
    }
}