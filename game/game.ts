import { World } from "./obj/world"
import { Facilitator } from "./facilitator"
import { Resource } from "./resource/loadResource"
import { KeyListener } from "./keyListener"
import { update } from "./update"
import { render } from "./render/render"
import { UI } from "./ui"

// ゲーム全体を統括

export class Game {
    resource: Resource
    cctx: CanvasRenderingContext2D
    world = new World()
    keyListener = new KeyListener()
    facilitator = new Facilitator(this.update.bind(this), this.render.bind(this), this.world)
    ui: UI
    
    constructor(cctx: CanvasRenderingContext2D, resource: Resource, rerenderUI: Function) {
        this.resource = resource
        this.cctx = cctx
        this.ui = new UI(this.facilitator, rerenderUI)
        this.render()
    }

    private update() {
        update(this.world, this.keyListener.keys)
    }
    
    private render() {
         render(this.cctx, this.world)
    }
}