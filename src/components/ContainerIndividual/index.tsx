import React, { useEffect, useState } from 'react'
import { IPokemon } from '../../interfaces/IPokemon'
import styles from './ContainerIndividual.module.scss'
import BotoesNav from './BotoesNav'
import { useRouter } from 'next/router'
import axios from 'axios'
import { GrUserWorker } from 'react-icons/gr'

export default function ContainerIndividual() {

    const router = useRouter()

    const [pokemons, setPokemons] = useState<IPokemon[]>([])

    const obterPokemon = () => {

        var URLs = [
            `https://pokeapi.co/api/v2/pokemon/${Number(router.query.id) - 1}`,
            `https://pokeapi.co/api/v2/pokemon/${router.query.id}`,
            `https://pokeapi.co/api/v2/pokemon/${Number(router.query.id) + 1}`
        ]

        var pokemons = []

        axios.all(URLs.map(item => axios.get(item)))
        .then(res => res.map(response => {
            pokemons.push(response.data)
        }))

        definePokemons(pokemons)

    }
    
    let pokemonAnterior: IPokemon | null = null
    let pokemonAtual: IPokemon | null = null
    let pokemonSeguinte: IPokemon | null = null

    const definePokemons = (lista: IPokemon[]) => {

        pokemonAnterior = lista[0]
        pokemonAtual = lista[1]
        pokemonSeguinte = lista[2]

        
        console.log(pokemonAtual)

    }

    useEffect(() => {
        obterPokemon()
    }, [router.query.id])

    return (
        <div className={styles.provisorio}>
            <p>Página em produção. Resultado em breve!</p>
            <GrUserWorker/>
        </div>
    )

    return (
        <>
            <div className={styles.container}>
                {/* <BotoesNav pokemonAntes={pokemonAnterior} pokemonDepois={pokemonSeguinte}/> 
                <div>{pokemonAtual.name}</div>
                <img src={pokemonAtual.sprites.front_default}/> */}
            </div>
        </>
  )

}
