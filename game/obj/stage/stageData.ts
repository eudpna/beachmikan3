import conf from '../../conf'
import { Vec2 } from '../../lib/physics'
import { Geo } from '../geo'
import geoDatas from './geos.json'
import { StageSpecification } from './stageSpecification'

// GeoDataからStageDataを取得する
export type StageData = {
    id: string,
    geo: Geo,
    goal: Vec2,
    player: Vec2,
    kanis: {
        id: string
        x: number
        y: number 
    }[]
}


export function getStageData(geoID: string): StageData {
    const geoData = (geoDatas as {[key: string]: string[][]})[geoID] as string[][]
    const m = geoData

    const ks: StageData['kanis'] = []
    let p: StageData['player'] | null = null
    let g: StageData['goal'] | null = null
    const c: (0 | 1)[][] = []
    for (let i = 0; i < m.length; i++) {
        if (c[i] === undefined) c[i] = []
        for (let j = 0; j < m[0].length; j++) {
            const cell = m[i][m[0].length - 1 - j]
            if (cell === '0' || cell === '' || cell === 'd') {
                c[i][j] = 0

                continue
            } else if (cell === '1') {
                c[i][j] = 1
                continue
            } else if (cell === 'p') {
                p = {
                    x: i*conf.c,
                    y: j*conf.c
                }
                c[i][j] = 0
                continue
            } else if (cell.slice(0, 1) === 'k') {
                ks.push({
                    id: cell.slice(1),
                    x: i*conf.c,
                    y: j*conf.c,
                })
                c[i][j] = 0
                continue
            } else if (cell === 'g') {
                g = {
                    x: i*conf.c,
                    y: j*conf.c
                }
                c[i][j] = 0
                continue
            }
        }
    }
    if (!p) {
        throw new Error('player position is not defined in MapTable.')
    }
    if (!g) {
        throw new Error('goal position is not defined in MapTable.')
    }
    return {
        id: geoID,
        geo: c,
        // geo: {
        //     c: c,
        //     w: c.length,
        //     h: c[0].length
        // },
        goal: g,
        player: p,
        kanis: ks
    }
}
