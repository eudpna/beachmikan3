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
    screen = new Screen(0, 0)
    goal: Vec2 = {
        x: 0,
        y: 0
    }

    constructor() {
        console.log('world')
    }
    
    loadStage(index: number) {
        const spec = stageSpecificagions()[index]
        const sd = getStageData(spec.geoID)

        this.player = new Player(sd.player.x, sd.player.y)
        this.geo = sd.geo
        this.screen = new Screen(sd.player.x, sd.player.y)
    }
}