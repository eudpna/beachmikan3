import { Howl } from "howler";
import conf from "../conf";
import { getDistance } from "../lib/math";
import { Vec2 } from "../lib/physics";
import { renderGrid } from "../lib/renderGrid";
import { Geo } from "./geo";
import { Goal } from "./goal";
import { Kani } from "./kani";
import { Player } from "./player";
import { Screen } from "./screen";
import { getStageData } from "./stage/stageData";
import { stageSpecificagions } from "./stage/stageSpecification";

// ゲーム内オブジェクトの管理担当
export class World {
    // objects
    geo: Geo = new Geo([[0]])
    player = new Player(0, 0)
    kanis: Kani[] = []
    screen = new Screen(0, 0, {x:0,y:0}, {x:0,y:0})
    goal: Goal = new Goal(0, 0)
    // 状態
    stageIndex = 0
    isGoal = false
    goalCount = 0
    stageTick = 0
    isClear = false
    waveAudio = new Howl({
        src: ['/audios/main/wave.mp3']
    });

    constructor() {
    }

    detectGoal(): boolean {
        // ゴール判定
        if (this.goal.x < (this.player.x + 96)) {
            this.isGoal = true
        }
        return this.isGoal
    }

    nextStage() {
        this.stageIndex++
        if (this.stageIndex === 5) {
            this.isClear = true
        }
        else this.loadStage(this.stageIndex)
    }

    retry() {
        this.loadStage(this.stageIndex)
    }
    
    loadStage(index: number) {
        const spec = stageSpecificagions()[index]
        const sd = getStageData(spec.geoID)
        this.goal = new Goal(sd.goal.x, sd.goal.y)
        this.player = new Player(sd.player.x, sd.player.y+10)
        this.player.direction = (spec.player && spec.player.direction) ? spec.player.direction : 'r'
        console.log(spec)
        this.kanis = sd.kanis.map((kaniData, i) => {
            const m = spec.kanis.filter(k => k.id === kaniData.id)
            const s = (m.length === 0) ? null : m[0]
            return new Kani({
                x: kaniData.x,
                y: kaniData.y,
                isAvoidFall: s ? s.isAvoidFall : true,
                isStop: s ? s.isStop : false,
                isStopWhenOutScreen: s ? s.isStopWhenOutScreen : false,
                direction: s ? s.direction : 'l',
            })
        })
        this.geo = new Geo(sd.chips)
        const x = (this.goal.x + 2) - conf.screen.w + 32 + (index === 3 ? 30 : 0)
        this.screen = new Screen(sd.player.x, sd.player.y, {
            x: conf.c * 2,
            y: conf.c
        }, {
            x: x,
            y: conf.c * (this.geo.h - 2) - conf.screen.h
        })
        this.isGoal = false
        this.stageTick = 0
        this.goalCount = 0

        // !!
        if (this.stageIndex === 3) {
            this.goal.x += 40
        }

        
    }

    // ゲームの状態を更新する手続き。毎フレーム呼ばれる。
    // 引数keysは押されているキーのリスト
    update(keys: string[], nowKeys: string[]) {
        this.player.update(keys, nowKeys, this)
        this.kanis.map(kani => kani.update(this.geo, this.screen, this.kanis))
        this.screen.update(this.player)
        this.detectGoal()
        if (this.isGoal) this.goalCount++
        else this.goalCount = 0
        if (this.goalCount === 25) {
            this.nextStage()
        }
        this.stageTick++
        this.setWaveAudioVolume()
    }

    setWaveAudioVolume() {
        const height = this.geo.h * conf.c
        const defaultVolume = 0.3
        // 高いところでは波の音が小さくなる
        const tmp = defaultVolume - (defaultVolume * ((height - this.player.y) / 1000))
        const volume = tmp > defaultVolume ? defaultVolume : (tmp < 0.01 ? 0.01 : tmp)
        this.waveAudio.volume(volume)
    }

    playWaveAudio() {
        this.waveAudio.on('end', () => {
            this.waveAudio.play()
        })
        this.waveAudio.play()
    }
}