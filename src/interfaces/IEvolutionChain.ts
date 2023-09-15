import { IEvolutionDetail } from "./evoultionChainData/IEvolutionDetail"
import { IEvolveTo } from "./evoultionChainData/IEvolveTo"

export interface IEvolutionChain {
    baby_trigger_item: null
    chain: {
        evolution_details:IEvolutionDetail[],
        evolves_to: IEvolveTo[],
        is_baby: boolean,
        species: {
            name: string,
            url: string
        }
    },
    id: number
}