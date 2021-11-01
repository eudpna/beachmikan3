import loadAudios from "./loadAudios";
import loadImages from "./loadImages";
import { Howl } from 'howler'

export type Resource = {
    imgs: { [key: string]: HTMLImageElement }
    audios: { [key: string]: Howl }
}

export async function loadResource(): Promise<Resource> {
    // const a = await new Promise((resolve) => {
    //     setTimeout(resolve, 5000)
    // })
    return {
        imgs: await loadImages(),
        audios: await loadAudios(),
    }
}