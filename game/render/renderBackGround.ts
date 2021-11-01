import { Resource } from "../resource/loadResource"

export function renderBackGround(cctx: CanvasRenderingContext2D, imgs: Resource['imgs']) {
    const bgSeaScale = 800
    cctx.drawImage(imgs['bg-sea'], -150, 0, bgSeaScale, bgSeaScale * (600 / 1000))
}