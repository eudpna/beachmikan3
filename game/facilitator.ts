import conf from "./conf"
// import { handleKeys } from "./handleKeys"
import { KeyListener } from "./keyListener"
import { World } from "./obj/world"
import { Timer } from "./timer"
import { update } from "./update"

// ゲームの進行役

export class Facilitator {
    timer = new Timer(conf.fps)
    
    constructor(update: Function, render: Function) {
        this.timer.onUpdate(() => {
            update(),
            render()
        })
    }

    start() {
        this.timer.start()
    }    
}