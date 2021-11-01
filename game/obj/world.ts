import conf from "../conf";
import { Vec2 } from "../lib/physics";
import { renderGrid } from "../lib/renderGrid";
import { Geo } from "./geo";
import { Player } from "./player";
import { Screen } from "./screen";
import { getStageData } from "./stage/stageData";
import { stageSpecificagions } from "./stage/stageSpecification";

// ゲーム内オブジェクトの管理担当
export class World {
    geo: Geo = []
    player = new Player(0, 0)
    screen = new Screen(0, 0, {x:0,y:0}, {x:0,y:0})
    goal: Vec2 = {
        x: 0,
        y: 0
    }
    isGoal = false
    goalCount = 0

    constructor() {
        ('world')
    }

    detectGoal(): boolean {
        // ゴール判定
        if (this.goal.x * 32 < (this.player.x + 32)) {
            this.isGoal = true
        }
        return this.isGoal
    }
    
    loadStage(index: number) {
        const spec = stageSpecificagions()[index]
        const sd = getStageData(spec.geoID)
        this.goal = sd.goal
        this.player = new Player(sd.player.x, sd.player.y-100)
        this.geo = sd.geo
        this.screen = new Screen(sd.player.x, sd.player.y, {
            x: conf.c * 2,
            y: conf.c
        }, {
            x: (this.goal.x + 2) - conf.screen.w + 32,
            y: conf.c * (this.geo[0].length - 2) - conf.screen.h
        })
    }
}