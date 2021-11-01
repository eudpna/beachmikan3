import React, { useEffect, useState } from "react";
import useCanvas from "../../lib/useCanvas";
import { Game } from "../../game/game";
import { loadResource } from "../../game/resource/loadResource";
import conf from "../../game/conf";
import { UIEl } from "./UI/UIEl";
import { renderLoadingScreen } from "../../game/renderLoadingScreen";


export const GameEl: React.FC<{}> = () => {
    const [state, setState] = useState<{
        game: Game | null
    }>({
        game: null
    })

    const [_, setState0] = useState<{}>({})
    
    function rerenderUI() {
        setState0(state => ({ ...state }))
    }

    const [canvasRef, cctx] = useCanvas()
    
    useEffect(() => {
        if (!cctx) return
        renderLoadingScreen(cctx)
        loadResource()
        .then(resource => {
            setState(state => ({
                game: new Game(cctx, resource, rerenderUI)
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
