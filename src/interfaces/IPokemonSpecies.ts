import { IEggGroup } from "./pokemonSpeciesData/IEggGroup"
import { IFlavorText } from "./pokemonSpeciesData/IFlavorText"
import { IFormDescription } from "./pokemonSpeciesData/IFormDescription"
import { IGenera } from "./pokemonSpeciesData/IGenera"
import { IName } from "./pokemonSpeciesData/IName"
import { IPalPark } from "./pokemonSpeciesData/IPalPark"
import { IPokedexNumber } from "./pokemonSpeciesData/IPokedexNumber"
import { IVariety } from "./pokemonSpeciesData/IVariety"

export interface IPokemonSpecies {
    base_happiness: number, 
    capture_rate: number,
    color: {
        name: string,
        url: string
    },
    egg_groups: IEggGroup[],
    evolution_chain: {
        url: string
    },
    evolves_from_species: {
        name: string,
        url: string
    },
    flavor_text_entries: IFlavorText[],
    form_descriptions: IFormDescription[],
    forms_switchable: boolean,
    gender_rate: number,
    genera: IGenera[],
    generation: {
        name: string,
        url: string
    },
    growth_rate: {
        name: string,
        url: string
    },
    habitat: {
        name: string,
        url: string
    },
    has_gender_differences: boolean,
    hatch_counter: number,
    id: number,
    is_baby: boolean,
    is_legendary: boolean,
    is_mythical: boolean,
    name: string,
    names: IName[],
    order: number,
    pal_park_encounters: IPalPark[],
    pokedex_numbers:IPokedexNumber[],
    shape: {
        name: string,
        url: string
    },
    varieties: IVariety[]
}