import urlList from '../script/resource/imgList.json'
import path from 'path'


export class Resource {
    isLoaded = false
    imgs: { [key: string]: HTMLImageElement } = {}
    onloadFn: (() => void)[] = []

    load() {
        return loadImages()
        .then(imgs => {
            this.imgs = imgs
            this.onloadFn.map(fn => fn())
            this.isLoaded = true
        })
    }

    onload(fn: () => void) {
        this.onloadFn.push(fn)
    }
}

export default async function loadImages(): Promise<Resource['imgs']> {

    const imgs = await Promise.all(urlList.map(url => getImage(path.join('images', url))))

    const results: { [key: string]: HTMLImageElement } = {}

    for (let i = 0; i < urlList.length; i++) {
        results[path.basename(urlList[i], '.png')] = imgs[i]
    }

    return results
}


function getImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const rootPath = '/'

        const image = new Image()

        image.src = rootPath + url
        image.addEventListener('load', e => {
            resolve(image)
        });
    })
}


