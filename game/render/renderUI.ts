import { World } from "../obj/world"
import { Resource } from "../resource/loadResource"
import { renderBackGround } from "./renderBackGround"

const w = 100
const h = 100

export function renderUI(cctx: CanvasRenderingContext2D, imgs: Resource['imgs'], world: World) {
    // ステージ名表示
    cctx.fillStyle = 'white'
    cctx.font = 'bold 16px sans-serif'
    cctx.textAlign = 'left'
    cctx.textBaseline = 'middle'
    cctx.fillText(`STAGE ${world.stageIndex + 1}`, 8, cctx.canvas.height - 18)


    // ゴール時 暗転エフェクト
    
    if (world.isGoal) {
        const shadow = {
            x: cctx.canvas.width * (1 - (world.goalCount - 15) / 10),
            y: 0,
            w: 1500,
            h: cctx.canvas.height
        }
        cctx.fillStyle = 'black'
        cctx.fillRect(shadow.x, shadow.y, shadow.w, shadow.h)
    }

    // 死亡時 暗転エフェクト
    if (
        world.deadCount > 25) {
        cctx.fillStyle = `rgba(0, 0, 0, ${((world.deadCount - 25) / 5)})`
        cctx.fillRect(0, 0, cctx.canvas.width, cctx.canvas.height)
    }

    // スタート時    
    if (world.stageTick < 15) {
        // 黒く塗りつぶす
        cctx.fillStyle = 'black'
        cctx.fillRect(0, 0, cctx.canvas.width, cctx.canvas.height)
        // ステージ名を真ん中に表示
        if ((world.stageTick % 3) === 0) {}
        else {
            cctx.fillStyle = 'white'
            cctx.font = 'bold 32px sans-serif'
            cctx.textAlign = 'center'
            cctx.textBaseline = 'middle'
            cctx.fillText(`STAGE ${world.stageIndex + 1}`, cctx.canvas.width / 2, cctx.canvas.height / 2)
        }
    }
    else if (world.stageTick < 30) {
        // 明転エフェクト
        cctx.fillStyle = `rgba(0, 0, 0, ${1 - ((world.stageTick - 15) / 15)})`
        cctx.fillRect(0, 0, cctx.canvas.width, cctx.canvas.height)
    }

    // クリア時の表示
    if (world.isClear) {
        renderBackGround(cctx, imgs)
        cctx.fillStyle = `rgba(0,0,0,0.4)`
        cctx.fillRect(0, 0, cctx.canvas.width, cctx.canvas.height)
        // 文字
        cctx.fillStyle = 'white'
        cctx.font = 'bold 32px sans-serif'
        cctx.textAlign = 'center'
        cctx.textBaseline = 'middle'
        cctx.fillText(`ALL CLEAR!`, cctx.canvas.width / 2, cctx.canvas.height / 2 - 10)

        cctx.fillStyle = 'white'
        cctx.font = '16px sans-serif'
        cctx.textAlign = 'center'
        cctx.textBaseline = 'middle'
        cctx.fillText(`Thank you for your playing.`, cctx.canvas.width / 2, cctx.canvas.height / 2 + (20 * 2))

        cctx.fillStyle = 'white'
        cctx.font = '16px sans-serif'
        cctx.textAlign = 'left'
        cctx.textBaseline = 'middle'
        cctx.fillText(`おしまい`, 8, cctx.canvas.height - 18)
    }    
}