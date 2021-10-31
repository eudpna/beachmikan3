import { World } from "./obj/world"
import { Facilitator } from "./facilitator"
import { Resource } from "./resource/loadResource"
import { KeyListener } from "./keyListener"
import { update } from "./update"
import { render } from "./render"
import { UI } from "./ui"

// ゲーム全体を統括

export class Game {
    resource: Resource
    cctx: CanvasRenderingContext2D
    world = new World()
    keyListener = new KeyListener()
    facilitator = new Facilitator(this.update.bind(this), this.render.bind(this))
    ui = new UI(this.facilitator)
    
    constructor(cctx: CanvasRenderingContext2D, resource: Resource) {
        console.log('construct', cctx)
        this.resource = resource
        this.cctx = cctx
        this.render()
    }

    private update() {
        update(this.world, this.keyListener.keys)
    }
    
    private render() {
        console.log('this is', this)
         render(this.cctx, this.world)
    }
}