import conf from "./conf"
import { Controller } from "./controller"
import { handleKeys } from "./handleKeys"
import { KeyListener } from "./keyListener"
import { renderLoadingScreen } from "./renderLoadingScreen"
import { World } from "./obj/world"
import { Resource } from "./reousrce"
import { Timer } from "./timer"
import { renderGrid } from "./lib/renderGrid"
import { Screen } from "./obj/screen"
import { Renderer } from "./renderer"

export class Game {
    resource = new Resource()
    world = new World()
    keyListener = new KeyListener()
    timer = new Timer(conf.fps)
    renderer: null | Renderer = null

    constructor() {
        this.resource.load()
        .then(() => {
            console.log('loaded')
            this.render()
        })
    }

    start() {
        this.timer.onUpdate(() => {            
            handleKeys(this.keyListener.keys, this.world)
            this.keyListener.clear()
            this.world.update()
            this.render()
        })
        this.timer.start()
    }

    setCanvasContext(cctx: CanvasRenderingContext2D) {
        this.renderer = new Renderer(cctx)
    }

    render() {
        if (!this.renderer) return
        if (!this.resource.isLoaded) {
            this.renderer.renderLoadingScreen
            return
        }
        this.renderer.render(this.world)
    }
}