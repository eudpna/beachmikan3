import { Facilitator } from "./facilitator"

export class UI {
    page: 'title' | 'game' = 'title'
    facilitator: Facilitator

    constructor(facilitator: Facilitator) {
        this.facilitator = facilitator
    }

    start() {
        this.facilitator.start()
    }
}