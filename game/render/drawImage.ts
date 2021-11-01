import { Vec2 } from "../lib/physics";

export type ImgCtx = {
    img: CanvasImageSource,
    x: number,
    y: number,
    offset: Vec2,
    w: number,
    h: number,
    flipH: boolean
    rotate: number
}

export function drawImage(cctx: CanvasRenderingContext2D, imgCtx: ImgCtx) {

    cctx.save();
    // move to the center of the canvas
    cctx.translate(imgCtx.x, imgCtx.y)
    // rotate the canvas to the specified degrees
    cctx.rotate(imgCtx.rotate * Math.PI / 180);
    cctx.translate(-imgCtx.x, -imgCtx.y)
    // draw the image


    if (imgCtx.flipH) drawImageFlipHorizontally(cctx, imgCtx.img, imgCtx.x - imgCtx.offset.x, imgCtx.y + imgCtx.offset.y, imgCtx.w, imgCtx.h)
    else cctx.drawImage(imgCtx.img, imgCtx.x + imgCtx.offset.x, imgCtx.y + imgCtx.offset.y, imgCtx.w, imgCtx.h)



    cctx.restore();

}


export function drawImageFlipHorizontally(cctx: CanvasRenderingContext2D, img: CanvasImageSource, x: number, y: number, w: number, h: number) {
    // move to x + img's width
    cctx.translate(x + Number(img.width), y);

    // scaleX by -1; this "trick" flips horizontally
    cctx.scale(-1, 1);

    // draw the img
    // no need for x,y since we've already translated
    cctx.drawImage(img, 0, 0, w, h);

    // always clean up -- reset transformations to default
    cctx.setTransform(1, 0, 0, 1, 0, 0);
}
