export class KeyListener {
    keys: string[] = []

    constructor() {        
        window.addEventListener('keydown', e => {
            this.keys.push(modifyKeyName(e.key))
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
}