export interface IEvolutionDetail {

    gender: number | null,
    held_item: {
        name: string,
        url: string
    } | null,
    item: {
        name: string,
        url: string
    } | null,
    known_move: null,
    known_move_type: null,
    location: {
        name: string,
        url: string
    } | null,
    min_affection: number,
    min_beauty: number,
    min_happiness: number,
    min_level: number,
    needs_overworld_rain: boolean,
    party_species: null,
    party_type: null,
    relative_physical_stats: null,
    time_of_day: string,
    trade_species: null,
    trigger: {
        name: string,
        url: string
    },
    turn_upside_down: boolean
}