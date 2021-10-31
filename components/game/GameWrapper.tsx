import React from "react"
import dynamic from "next/dynamic"

const AvoidSSRComponent = dynamic(
    () => import('./Game')
        .then(modules => modules.Game),
    { ssr: false }
)

export const GameWrapper: React.FC<{
}> = (props) => {
    if (typeof window === 'undefined') return null
    return <AvoidSSRComponent />
}
