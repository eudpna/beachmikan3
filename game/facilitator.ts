import conf from "./conf"
// import { handleKeys } from "./handleKeys"
import { KeyListener } from "./keyListener"
import { World } from "./obj/world"
import { Timer } from "./timer"

// ゲームの進行役

export class Facilitator {
    timer = new Timer(conf.fps)
    update: Function
    render: Function
    world: World
    
    constructor(update: Function, render: Function, world: World) {
        this.update = update
        this.render = render
        this.world = world
        this.timer.onUpdate(() => {
            this.update(),
            this.render()
        })
    }

    start() {
        this.world.loadStage(this.world.stageIndex)
        this.timer.start()
        this.render()
    }    
}

