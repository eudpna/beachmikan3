import fs from 'fs'
import json from './geo-raw.json'

const entries = [
    'stage1',
    'stage2',
    'stage3',
    'stage4',
    'stage5',
]

function main() {
    const geos = loadGeos()
    fs.writeFileSync('./makeStages/geos.json', JSON.stringify(geos))
}


function loadGeos(): any {

    const result = {}
    for (const [key, value] of Object.entries(json)) {
        if (!(entries.includes(key))) continue
        result[key] = loadGeoFromCSV(value)
    }
    return result
}

function loadGeoFromCSV(csv: string): string[][] {
    const c: string[][] = []
    const m = csv.trim().split('\n').map(l => l.split(','))
    // const c = m.Geo(col => col.Geo(row => !!Number(row)))
    for (let i = 0; i < m.length; i++) {
        if (c[i] === undefined) c[i] = []
        for (let j = 0; j < m[0].length; j++) {
            c[i][j] = m[i][m[0].length - 1 - j]
        }
        c[i].reverse()
    }
    return c
}


main()