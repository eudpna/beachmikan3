import conf from "../conf"
import { Bodi, Direction4, Rect, Vec2 } from "../lib/physics"
import { Chips, Geo } from "./geo"


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

export function collide(b: Bodi, c: Chips, check: Direction4[] = ['l', 'r', 't', 'b']): Direction4[] {

    let flag: Direction4[] = [];

    (() => {
        if (!check.includes('t')) return
        const { lt, lb, rt, rb } = getCoordinatesOfVertexes(b)
        //上にめりこんでいたら戻す
        if (c[lt.x][lt.y] === 1 || c[rt.x][rt.y] === 1) {
            flag.push('t')
            b.y = (lt.y + 1) * conf.c
            if (b.v.y < 0) b.v.y = 0
        }
    })();

    (() => {
        if (!check.includes('b')) return
        const { lt, lb, rt, rb } = getCoordinatesOfVertexes(b)
        //下にめりこんでいたら戻す
        if (c[lb.x][lb.y]===1 || c[rb.x][rb.y]===1) {
            flag.push('b')
            b.y = (lb.y) * conf.c - b.h
            if (b.v.y > 0) b.v.y = 0
        }
    })();

    (() => {
        if (!check.includes('l')) return
        const { lt, lb, rt, rb } = getCoordinatesOfVertexes(b)
        //左にめりこんでいたら戻す
        if (c[lt.x][lt.y]===1 || c[lb.x][lb.y]===1) {
            flag.push('l')
            b.x = (lt.x + 1) * conf.c
            if (b.v.x < 0) b.v.x = 0
        }
    })();

    (() => {
        if (!check.includes('r')) return
        const { lt, lb, rt, rb } = getCoordinatesOfVertexes(b)
        //右にめりこんでいたら戻す
        if (c[rt.x][rt.y]===1 || c[rb.x][rb.y]===1) {
            flag.push('r')
            b.x = (rt.x) * conf.c - b.w
            if (b.v.x > 0) b.v.x = 0
        }
    })();

    return flag
}



export function getTouchingSides(r: Rect, c: Chips): Direction4[] {
    const { lt, lb, rt, rb } = getCoordinatesOfVertexes(r)
    const result: Direction4[] = []
    if (c[lb.x][Math.floor((r.y + r.h) / conf.c)] || c[rb.x][Math.floor((r.y + r.h) / conf.c)]) result.push('b')
    if (c[lt.x][Math.floor((r.y - 1) / conf.c)] || c[rt.x][Math.floor((r.y - 1) / conf.c)]) result.push('t')
    if (c[Math.floor((r.x - 1) / conf.c)][lt.y] || c[Math.floor((r.x - 1) / conf.c)][lb.y]) result.push('l')
    if (c[Math.floor((r.x + r.w) / conf.c)][rt.y] || c[Math.floor((r.x + r.w) / conf.c)][rb.y]) result.push('r')
    
    return result
}


export function isTouching(r: Rect, c: Chips, direction: Direction4): boolean {
    return getTouchingSides(r, c).includes(direction)
}


