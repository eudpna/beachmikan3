export class Timer {
    fps: number
    tick = 0
    onUpdateFn: (() => void)[] = []
    

    constructor(fps: number) {
        this.fps = fps
    }

    start() {
        window.setTimeout(() => {
            this.update()
        }, 1000 / this.fps)
    }

    update() {
        this.tick++
        this.onUpdateFn.map(fn => fn())
        window.setTimeout(() => {
            this.update()
        }, 1000 / this.fps)
    }

    onUpdate(fn: () => void) {
        this.onUpdateFn.push(fn)
    }
}