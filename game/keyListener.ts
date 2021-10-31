export class KeyListener {
    keys: string[] = []

    constructor() {        
        window.addEventListener('keydown', e => {
            this.keys.push(modifyKeyName(e.key))
        })
        window.addEventListener('keyup', e => {
            this.keys = this.keys.filter(k => k !== modifyKeyName(e.key))
        })
    }

    clear() {
        this.keys = []
    }
}

export function modifyKeyName(key: string): string {
    return key.toLowerCase()
        .replace('arrowleft', 'left')
        .replace('arrowright', 'right')
        .replace('arrowdown', 'down')
        .replace('arrowup', 'up')

        // specific to this proejct
        .replace('z', 'up')
}