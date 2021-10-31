import conf from "../conf"
import { Bodi, Direction4, Rect, Vec2 } from "../lib/physics"
import { Geo } from "./geo"


// 矩形の各頂点がどのマスにあるかを調べる
export const getCoordinatesOfVertexes = (r: Rect): {
    lt: Vec2,
    lb: Vec2,
    rt: Vec2,
    rb: Vec2
} => {
    const lt = {
        x: Math.floor(r.x / conf.c),
        y: Math.floor(r.y / conf.c)
    }
    const lb = {
        x: Math.floor(r.x / conf.c),
        y: Math.floor((r.y + r.h - 1) / conf.c)
    }
    const rt = {
        x: Math.floor((r.x + r.w - 1) / conf.c),
        y: Math.floor(r.y / conf.c)
    }
    const rb = {
        x: Math.floor((r.x + r.w - 1) / conf.c),
        y: Math.floor((r.y + r.h - 1) / conf.c)
    }

    return { lt, lb, rt, rb }
}

export function collide(b: Bodi, geo: Geo, check: Direction4[] = ['l', 'r', 't', 'b']): Direction4[] {

    let flag: Direction4[] = [];

    (() => {
        if (!check.includes('t')) return
        const { lt, lb, rt, rb } = getCoordinatesOfVertexes(b)
        //上にめりこんでいたら戻す
        if (geo[lt.x][lt.y] === 1 || geo[rt.x][rt.y] === 1) {
            flag.push('t')
            b.y = (lt.y + 1) * conf.c
            if (b.v.y < 0) b.v.y = 0
        }
    })();

    (() => {
        if (!check.includes('b')) return
        const { lt, lb, rt, rb } = getCoordinatesOfVertexes(b)
        //下にめりこんでいたら戻す
        if (geo[lb.x][lb.y]===1 || geo[rb.x][rb.y]===1) {
            flag.push('b')
            b.y = (lb.y) * conf.c - b.h
            if (b.v.y > 0) b.v.y = 0
        }
    })();

    (() => {
        if (!check.includes('l')) return
        const { lt, lb, rt, rb } = getCoordinatesOfVertexes(b)
        //左にめりこんでいたら戻す
        if (geo[lt.x][lt.y]===1 || geo[lb.x][lb.y]===1) {
            flag.push('l')
            b.x = (lt.x + 1) * conf.c
            if (b.v.x < 0) b.v.x = 0
        }
    })();

    (() => {
        if (!check.includes('r')) return
        const { lt, lb, rt, rb } = getCoordinatesOfVertexes(b)
        //右にめりこんでいたら戻す
        if (geo[rt.x][rt.y]===1 || geo[rb.x][rb.y]===1) {
            flag.push('r')
            b.x = (rt.x) * conf.c - b.w
            if (b.v.x > 0) b.v.x = 0
        }
    })();

    return flag
}



export function getTouchingSides(r: Rect, geo: Geo): Direction4[] {
    const { lt, lb, rt, rb } = getCoordinatesOfVertexes(r)
    const result: Direction4[] = []
    if (geo[lb.x][Math.floor((r.y + r.h) / conf.c)] || geo[rb.x][Math.floor((r.y + r.h) / conf.c)]) result.push('b')
    if (geo[lt.x][Math.floor((r.y - 1) / conf.c)] || geo[rt.x][Math.floor((r.y - 1) / conf.c)]) result.push('t')
    if (geo[Math.floor((r.x - 1) / conf.c)][lt.y] || geo[Math.floor((r.x - 1) / conf.c)][lb.y]) result.push('l')
    if (geo[Math.floor((r.x + r.w) / conf.c)][rt.y] || geo[Math.floor((r.x + r.w) / conf.c)][rb.y]) result.push('r')
    
    return result
}


export function isTouching(r: Rect, geo: Geo, direction: Direction4): boolean {
    return getTouchingSides(r, geo).includes(direction)
}


