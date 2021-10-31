export type StageSpecification = {
    // 参照するGeoDataを指定
    geoID: string
    // オブジェクトの初期設定
    player?: {
        direction: 'r' | 'l'
    },
    kanis: {
        id: string,
        isAvoidFall?: boolean,
        direction?: 'l' | 'r',
        isStopWhenOutScreen?: boolean,
        isStop?: boolean,
    }[]
}

export const stageSpecificagions = (): StageSpecification[] => {
    return [
        {
            geoID: 'stage1',
            kanis: [
            ]
        },
        {
            geoID: 'stage2',
            kanis: [
                {
                    id: '2',
                    isAvoidFall: false,
                    direction: 'r',
                    isStopWhenOutScreen: true,
                },
            ]
        },
        {
            geoID: 'stage3',
            kanis: [
                {
                    id: '1',
                    isAvoidFall: false,
                    isStopWhenOutScreen: true,
                    direction: 'l',
                },
                {
                    id: '2',
                    isAvoidFall: false,
                    direction: 'r',
                    isStopWhenOutScreen: true,
                },
                {
                    id: '10',
                    isAvoidFall: false,
                    direction: 'r',
                    isStopWhenOutScreen: true,
                },
                {
                    id: '11',
                    isAvoidFall: false,
                    direction: 'l',
                    isStopWhenOutScreen: true,
                },
                {
                    id: '12',
                    isAvoidFall: false,
                    isStopWhenOutScreen: true,
                },
                {
                    id: '13',
                    isAvoidFall: false,
                    isStopWhenOutScreen: true,
                },
                {
                    id: '14',
                    isAvoidFall: false,
                    isStopWhenOutScreen: true,
                },
                {
                    id: '15',
                    isAvoidFall: false,
                    isStopWhenOutScreen: true,
                },
                {
                    id: '14',
                    isAvoidFall: false,
                    isStopWhenOutScreen: true,
                },
                {
                    id: '16',
                    isAvoidFall: false,
                    isStopWhenOutScreen: true,
                },

                {
                    id: '17',
                    isAvoidFall: false,
                    isStopWhenOutScreen: true,
                },
            ]
        },
        {
            geoID: 'stage4',
            player: {
                direction: 'l'
            },
            kanis: [
                {
                    id: '1',
                    isAvoidFall: false,
                    isStop: true,
                },
                {
                    id: '2',
                    isAvoidFall: false,
                    isStopWhenOutScreen: true,
                },
                {
                    id: '3',
                    isAvoidFall: false,
                    isStopWhenOutScreen: true,
                },
                {
                    id: '4',
                    isAvoidFall: false,
                    isStopWhenOutScreen: true,
                },
                {
                    id: '5',
                    isAvoidFall: false,
                    isStopWhenOutScreen: true,
                },
                {
                    id: '6',
                    isAvoidFall: false,
                    isStopWhenOutScreen: true,
                },
                {
                    id: '7',
                    isAvoidFall: false,
                    isStopWhenOutScreen: true,
                },
                {
                    id: '8',
                    isAvoidFall: false,
                    isStopWhenOutScreen: true,
                },
                {
                    id: '9',
                    isAvoidFall: false,
                    isStopWhenOutScreen: true,
                },
                {
                    id: '10',
                    isAvoidFall: false,
                    isStopWhenOutScreen: true,
                },
                {
                    id: '11',
                    isAvoidFall: false,
                    isStopWhenOutScreen: true,
                },
                {
                    id: '12',
                    isAvoidFall: false,
                    isStopWhenOutScreen: true,
                },
                {
                    id: '12',
                    isAvoidFall: false,
                    isStopWhenOutScreen: true,
                },
                {
                    id: '13',
                    isAvoidFall: false,
                    isStopWhenOutScreen: true,
                },
                {
                    id: '14',
                    isAvoidFall: false,
                    isStopWhenOutScreen: true,
                },
                {
                    id: '15',
                    isAvoidFall: false,
                    isStopWhenOutScreen: true,
                },
                {
                    id: '16',
                    isAvoidFall: false,
                    isStopWhenOutScreen: true,
                },
            ]
        },
        {
            geoID: 'stage5',
            kanis: [
                {
                    id: '1',
                    isStop: true,

                },
                {
                    id: '2',
                    isAvoidFall: false,
                    direction: 'r',
                    isStopWhenOutScreen: true,
                },
                {
                    id: '3',
                    isAvoidFall: false,
                    direction: 'r',
                    isStopWhenOutScreen: true,
                },
                {
                    id: '4',
                    isStop: true
                },
                {
                    id: '5',
                    isStop: true
                },
                {
                    id: '6',
                    isStop: true
                },
                {
                    id: '7',
                    isAvoidFall: false,
                    isStopWhenOutScreen: true,
                },
            ]
        },
    ]
}