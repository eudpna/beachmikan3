import React from "react"
import { Game } from "../../../game/game"
import { UI } from "../../../game/ui"
import { Title } from "./Title"


export const UIEl: React.FC<{
    ui: UI
}> = (props) => {
    return <>
    <Title ui={props.ui}/>
    </>
}