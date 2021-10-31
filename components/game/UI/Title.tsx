import conf from "../../../game/conf"
import { UI } from "../../../game/ui"

export const Title: React.FC<{
    ui: UI
}> = (props) => {

    if (props.ui.page !== 'title') return null

    const color = 'white'

    return <>
        <div
            style={{
                backgroundColor: 'rgba(0,0,0,0.6)',
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                zIndex: 3,
                color: color,
                cursor: 'default',
            }}
        >
            <StartBtn onClick={() => {
                props.ui.start()
            }} />
        </div>

    </>
}


const StartBtn: React.FC<{
    onClick: Function
}> = (props) => {

    const color = 'white'

    return <>
        <div
            onClick={() => {
                props.onClick()
            }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                borderColor: color,
                color: color,
                width: '100%',
                height: '100%',
                margin: 'auto', textAlign: 'center',
                lineHeight: conf.screen.h - 40 + 'px',
                verticalAlign: 'middle',
                fontWeight: 'bold',
                fontSize: '1.8rem',
                zIndex: 4,
                cursor: 'pointer',
            }}
        >クリックしてスタート</div>
    </>
}