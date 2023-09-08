import NextLink from 'next/link'
import React from 'react'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'
import { IPokemon } from '../../../interfaces/IPokemon'

export default function BotoesNav({pokemonAntes, pokemonDepois}: {pokemonAntes: IPokemon, pokemonDepois: IPokemon}) {

    return (
        <div>
            <NextLink href={`/${pokemonAntes.id}`}>
                <AiOutlineArrowLeft/>
                <p>{pokemonAntes.id}</p>
                <p>{pokemonAntes.name}</p>
            </NextLink>
            <NextLink href={`/${pokemonDepois.id}`}>
                <AiOutlineArrowRight/>
                    <p>{pokemonDepois.id}</p>
                    <p>{pokemonDepois.name}</p>
            </NextLink>
        </div>
    )
}
