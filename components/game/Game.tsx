import React, { useEffect, useState } from "react";
import conf from "../../g/conf";
import { G } from "../../g/G";
import useCanvas from "../../lib/useCanvas";
import { UI } from "./UI/UI";

export const Game: React.FC<{}> = () => {
    const [state, _] = useState<{
        g: G
    }>({
        g: new G
    })

    const [canvasRef, cctx] = useCanvas()
    
    useEffect(() => {
        if (!cctx) return
        state.g.setCanvasContext(cctx)
        state.g.render()
        state.g.start()
    }, [cctx])
    
    return <>
        <div className="mx-auto noselect"
            style={{
                position: 'relative',
                width: conf.screen.w,
                height: conf.screen.h
            }}
        >
            <canvas
                className="border-black mx-auto"
                ref={canvasRef}
                width={conf.screen.w}
                height={conf.screen.h}
            ></canvas>
            <UI g={state.g} />
        </div>
    </>
}
