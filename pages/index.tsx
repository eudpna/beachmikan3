
import Head from 'next/head'
import React, { useEffect } from 'react'
import { A } from '../components/A';
import { GameElAvoidSSR } from '../components/game/GameElAvoidSSR';


const Index: React.FC<{}> = () => {
    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if (['Left', 'ArrowLeft', 'Right', 'ArrowRight', 'Down', 'ArrowDown', 'Up', 'ArrowUp', 'z', 'x', ' '].includes(e.key)) {
                e.preventDefault()
            }
        })
        return () => {
            
        };
    }, []);
    return <>
        <Head>
            <title>ビーチみかん</title>
            <meta name="viewport" content=""></meta>
        </Head>
        <div lang="ja" className="w-full pt-2">
            <div className="pb-8 mx-auto" style={{
                width: 640
            }}>
                <A href="https://nyaw.net" inSite>
                    nyaw.net
                </A>
            </div>
            <div>
                <GameElAvoidSSR />
            </div>
            <div className="mx-auto" style={{
                width: 640
            }}>
                <div className="my-12 pb-16">
                    <section className="mb-6">
                        <h2 className="font-bold border-b border-black my-3">概要</h2>
                        <p className="my-4 text-sm">丸い生き物を操作してゴールを目指せ！<br />横スクロールアクションゲーム　全5ステージ</p>
                        <p className="my-4 text-sm">[操作方法]<br />矢印キーで移動</p>
                    </section>
                    <section className="mb-6">
                        <h2 className="font-bold border-b border-black my-3">更新履歴</h2>
                        <ul className="text-sm">
                            <li>2021/11/01 不具合を修正</li>
                            <li>2021/04/01 ver1.0 公開</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    </>
}

export default Index




