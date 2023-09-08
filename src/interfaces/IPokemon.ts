import { IAbility } from "./pokemonData/IAbility";
import { IForm } from "./pokemonData/IForm";
import { IGameIndex } from "./pokemonData/IGameIndex";
import { IHeldItem } from "./pokemonData/IHeldItem";
import { IMove } from "./pokemonData/IMove";
import { IPastType } from "./pokemonData/IPastTypes";
import { IStat } from "./pokemonData/IStat";
import { IType } from "./pokemonData/IType";

export interface IPokemon{
    abilities: IAbility[],
    forms: IForm[],
    game_indices: IGameIndex[],
    height: number,
    held_items: IHeldItem[],
    id: number,
    is_default: boolean,
    location_area_encounters: string,
    moves: IMove[],
    name: string,
    order: number,
    past_types: IPastType[],
    species: {
        name: string,
        url: string
    }
    sprites: {
        back_default: string | null,
        back_female: string | null,
        back_shiny: string | null,
        back_shiny_female: string | null,
        front_default: string | null,
        front_female: string | null,
        front_shiny: string | null
        front_shiny_female: string | null,
    },
    stats: IStat[],
    types: IType[],
    weight: number
}
