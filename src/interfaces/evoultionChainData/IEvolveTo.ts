import { IEvolutionDetail } from "./IEvolutionDetail";

export interface IEvolveTo {
    evolution_details:IEvolutionDetail[],
    evolves_to: IEvolveTo[],
    is_baby: boolean,
    species: {
        name: string,
        url: string
    }
}
