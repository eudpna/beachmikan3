import React, { useEffect, useState } from "react";
import useCanvas from "../../lib/useCanvas";
import { Game } from "../../game/game";
import { loadResource } from "../../game/resource/loadResource";
import conf from "../../game/conf";
import { UIEl } from "./UI/UIEl";


export const GameEl: React.FC<{}> = () => {
    const [state, setState] = useState<{
        game: Game | null
    }>({
        game: null
    })

    const [canvasRef, cctx] = useCanvas()
    
    useEffect(() => {
        if (!cctx) return
        loadResource()
        .then(resource => {
            setState(state => ({
                game: new Game(cctx, resource)
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
            {state.game ? <UIEl ui={state.game.ui} /> : null}
        </div>
    </>
}
