import React, { useEffect, useState } from "react";
import useCanvas from "../../lib/useCanvas";
import { UI } from "./UI/UI";
import { Manager } from "../../game/game";
import { loadResource } from "../../game/resource/loadResource";
import conf from "../../game/conf";


export const GameEl: React.FC<{}> = () => {
    const [state, setState] = useState<{
        game: Manager | null
    }>({
        game: null
    })

    const [canvasRef, cctx] = useCanvas()
    
    useEffect(() => {
        if (!cctx) return
        loadResource()
        .then(resource => {
            setState(state => ({
                game: new Manager(cctx, resource)
            }))
        })
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
            <UI game={state.game} />
        </div>
    </>
}
