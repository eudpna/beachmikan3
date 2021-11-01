export class KeyListener {
    keys: string[] = []
    nowKeys: string[] = []

    constructor() {        
        window.addEventListener('keydown', e => {
            if (!this.keys.includes(modifyKeyName(e.key))) {
                this.nowKeys.push(modifyKeyName(e.key))
            }
            this.keys.push(modifyKeyName(e.key))
        })
        window.addEventListener('keyup', e => {
            this.keys = this.keys.filter(k => k !== modifyKeyName(e.key))
            this.nowKeys = this.nowKeys.filter(k => k !== modifyKeyName(e.key))
        })
    }

    clear() {
        this.nowKeys = []
    }
}

export function modifyKeyName(key: string): string {
    return key.toLowerCase()
        .replace('arrowleft', 'left')
        .replace('arrowright', 'right')
        .replace('arrowdown', 'down')
        .replace('arrowup', 'up')

        // specific to this proejct
        .replace(' ', 'up')
        .replace('z', 'up')
        .replace('w', 'up')
        .replace('a', 'left')
        .replace('d', 'right')
}