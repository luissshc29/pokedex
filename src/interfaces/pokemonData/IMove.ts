interface versionGroupDetail {
    level_learned_at: number,
    move_learn_method: {
        name: string,
        url: string
    },
    version_group: {
        name: string,
        url: string
    }
}

export interface IMove {
    move: {
        name: string,
        url: string
    },
    version_group_details: versionGroupDetail[]
}