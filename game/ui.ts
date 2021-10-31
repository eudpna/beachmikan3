import { Facilitator } from "./facilitator"

export class UI {
    page: 'title' | 'game' = 'title'
    facilitator: Facilitator
    rerenderUI: Function

    constructor(facilitator: Facilitator, rerenderUI: Function) {
        this.facilitator = facilitator
        this.rerenderUI = rerenderUI
        // console.log(rerenderUI)
    }

    start() {
        this.facilitator.start()
        this.page = 'game'
        this.rerenderUI()
    }
}