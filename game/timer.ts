export class Timer {
    fps: number
    count = 0
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
        this.count++
        this.onUpdateFn.map(fn => fn())
        window.setTimeout(() => {
            this.update()
        }, 1000 / this.fps)
    }

    onUpdate(fn: () => void) {
        this.onUpdateFn.push(fn)
    }
}