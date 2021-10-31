import { World } from "./obj/world"
import { Facilitator } from "./facilitator"
import { Resource } from "./resource/loadResource"
import { KeyListener } from "./keyListener"
import { update } from "./update"
import { render } from "./render"

export class Manager {
    resource: Resource
    cctx: CanvasRenderingContext2D
    world = new World()
    facilitator = new Facilitator(this.update, this.render)
    keyListener = new KeyListener()
    
    constructor(cctx: CanvasRenderingContext2D, resource: Resource) {
        this.resource = resource
        this.cctx = cctx
    }

    update() {
        update(this.world, this.keyListener.keys)
    }
    
    render() {
        render(this.cctx, this.world)
    }
}