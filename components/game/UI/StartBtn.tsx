import { useState } from "react";
import conf from "../../../game/conf";
import { UI } from "../../../game/ui";

export const StartBtn: React.FC<{
    ui: UI
}> = (props) => {
    const [state, setstate] = useState<{
        isHover: boolean
    }>({
        isHover: false
    });

    const d = state.isHover ? 2 : 0

    if (props.ui.page !== 'title') return null

    return <>
        <div
            onClick={() => {
                setstate(state => ({
                    isHover: false
                }))
                props.ui.start()
            }}
            onMouseEnter={() => {
                setstate(state => ({
                    isHover: true
                }))
            }}
            onMouseLeave={() => {
                setstate(state => ({
                    isHover: false
                }))
            }}
            style={{
                border: 'solid 2px',
                position: 'absolute',
                left: conf.screen.w / 2 - 90 - d,
                top: 210 - d,
                borderColor: 'white',
                color: 'white',
                width: 180 + d * 2,
                padding: `${10 + d}px ${14 + d}px`,
                borderRadius: '1rem',
                textAlign: 'center',
                verticalAlign: 'middle',
                fontSize: '1.3rem',
                zIndex: 4,
                cursor: 'pointer',
            }}
        >スタート</div>
    </>
}