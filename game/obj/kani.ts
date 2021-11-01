import conf from "../conf"
import { isInScreen } from "../lib/isInScreen"
import { getDistance, restrict } from "../lib/math"
import { collide, isTouching, getCoordinatesOfVertexes } from "./bodi"
import { Geo } from "./geo"
import { Screen } from "./screen"

export class Kani {
    readonly maxVy = 20
    readonly speed = 3

    x = 0
    y = 0
    v = {
        x: 0,
        y: 0
    }
    w = 30
    h = 30
    direction: 'l' | 'r' = 'l'
    isDead = false
    isAvoidFall = true
    isStopWhenOutScreen = false
    isStop = false
    // flags for animation
    deadDirection: 'l' | 'r' = 'l'
    deadCount = 0

    constructor(props: {
        x: number,
        y: number,
        direction: 'l' | 'r',
        isAvoidFall: boolean
        isStopWhenOutScreen: boolean
        isStop: boolean
    }) {
        this.direction = props.direction
        this.isAvoidFall = props.isAvoidFall
        this.isStopWhenOutScreen = props.isStopWhenOutScreen
        this.isStop = props.isStop
    }

    move(geo: Geo, screen: Screen, kanis: Kani[]): void {
        if (this.isDead) {
            this.moveDead()
            return
        }
        if (this.isStopWhenOutScreen && !isInScreen(screen, this, 30)) return
        this.isStopWhenOutScreen = false

        const deadLine = conf.c * (geo.h - 2)

        // 横移動

        if (!this.isStop) {
            if (this.direction === 'l') this.v.x = -this.speed
            else this.v.x = this.speed
            // x 移動
            this.x += this.v.x
            // x 衝突判定
            const collision = collide(this, geo.chips, ['l', 'r'])
            // 衝突したら向きを変える
            if (collision.includes('l')) this.direction = 'r'
            else if (collision.includes('r')) this.direction = 'l'

            // 落下しそうになったら向きを変える
            if (isTouching(this, geo.chips, 'b') && this.isAvoidFall) {
                const { lb, rb } = getCoordinatesOfVertexes(this)
                if (this.direction === 'l') {
                    if (geo.chips[lb.x][lb.y + 1] === 0) this.direction = 'r'
                } else {
                    if (geo.chips[rb.x][rb.y + 1] === 0) this.direction = 'l'
                }
            }
        }

        // 他の蟹との衝突
        const kaniHit = isHittingWithOtherKani(kanis).filter(h => h)
        if (kaniHit.length !== 0) {
            if (this.direction === 'l') this.direction = 'r'
            else this.direction = 'l'
        }

        // 重力
        this.v.y += 1.5
        this.v.y = restrict(this.v.y, -this.maxVy, this.maxVy)
        if (isTouching(this, geo.chips, 'b')) this.v.y = 0
        this.y += this.v.y
        collide(this, geo.chips, ['t', 'b'])

        // 落下したら消滅
        if (this.y > deadLine) {
            kanis.splice(kanis.indexOf(this), 1)
        }
    }


    moveDead() {
        if (!this.isDead) return

        this.deadCount += 1

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

    isHittingWithOtherKani(kanis: Kani[]) {
        let ks = kanis.filter(k => k !== this && !k.isDead)
        if (this.direction === 'l') ks = ks.filter(k => k.x <= this.x)
        else ks = ks.filter(k => k.x >= this.x)
        return ks.map(k => {
            const d = getDistance(this, k)
            if (d > 32) return false
            if (k.x - this.x < 0) return 'r'
            else return 'l'
        })
    }

    


}



function isHittingWithOtherKani(kanis: Kani[]) {
    let ks = kanis.filter(k => k !== this && !k.isDead)
    if (this.direction === 'l') ks = ks.filter(k => k.x <= this.x)
    else ks = ks.filter(k => k.x >= this.x)
    return ks.map(k => {
        const d = getDistance(this.r, k)
        if (d > 32) return false
        if (k.x - this.x < 0) return 'r'
        else return 'l'
    })
}

