import conf from "../conf"
import { Screen } from "../obj/screen"
import { Rect } from "./physics"

export const isInScreen = (screen: Screen, r: Rect, margin: number): boolean => {
    return screen.x < r.x + r.w + margin && screen.y < r.y + r.h + margin && screen.x + conf.screen.w + margin > r.x && screen.y + conf.screen.h + margin > r.y
}