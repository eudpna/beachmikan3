import { World } from "./obj/world";

// ゲームの状態を更新する手続き。毎フレーム呼ばれる。
// 引数keysは押されているキーのリスト

export function update(world: World, keys: string[]) {
    world.player.update(keys, world)
    world.screen.update(world.player)
    world.detectGoal()
    if (world.isGoal) world.goalCount ++
    else world.goalCount = 0
    if (world.goalCount === 25) {
        world.nextStage()
    }
    world.stageTick++
}