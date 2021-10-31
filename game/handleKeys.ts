import { World } from "./obj/world";

export function handleKeys(keys: string[], world: World) {
    if (keys.includes('left')) {
        world.player.move('l')
    }
    else if (keys.includes('right')) {
        world.player.move('r')
    }
    else if (keys.includes('up')) {
        world.player.move('t')
    }
    else if (keys.includes('down')) {
        world.player.move('b')
    }
}