interface versionDetail {
    rarity: number,
    version: {
        name: string,
        url: string
    }
}

export interface IHeldItem {
    item: {
        name: string,
        url: string
    },
    version_details: versionDetail[]
}