import React, { useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { IPokemon } from '../../../interfaces/IPokemon'
import axios from 'axios'
import { useRouter } from 'next/router'
import styles from './BotoesNav.module.scss'

export default function BotoesNav() {

    const router = useRouter()
    
    // Array com os Pokemons anterior e posterior
    const [pokemonAnterior, setPokemonAnterior] = useState<IPokemon[]>([])
    const [pokemonSeguinte, setPokemonSeguinte] = useState<IPokemon[]>([])

    const [loading, setLoading] = useState<boolean>(true)

    const buscaPokemon = () => {

        var lista = []

        axios.get(`https://pokeapi.co/api/v2${router.asPath}`)
        .then(res => {
            lista.push(res.data)
            buscaPokemonAnt(res.data)
            buscaPokemonSeg(res.data)
        })
        .catch(err => console.log(err))
    }

    const buscaPokemonAnt = (pokemon: IPokemon) => {

        var pokeAnt = []

        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id - 1}`)
        .then(res => {
            pokeAnt.push(res.data)
            setPokemonAnterior(pokeAnt)
        })
        .catch(err => console.log(err))

    }

    const buscaPokemonSeg = (pokemon: IPokemon) => {

        var pokeSeg = []

        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id + 1}`)
        .then(res => {
            pokeSeg.push(res.data)
            setPokemonSeguinte(pokeSeg)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        buscaPokemon()

        setTimeout(() => {      
            setLoading(false)
        }, 1800);
    }, [router])

    if(loading) {
        return (
            <div></div>
        )
    }

    return (
        <div className={styles.botoes}>
            {pokemonAnterior.map(pokeAnt => (
                <div key={pokeAnt.id} className={styles.botoes__botao} onClick={() => router.push(`/pokemon/${pokeAnt.name}`)}>
                    <IoIosArrowBack className={styles.svg_esq}/>
                    <p className={styles.botoes__botao__id}>Nº {pokeAnt.id < 100 ? `00${pokeAnt.id}` : pokeAnt.id < 1000 ? `0${pokeAnt.id}`: pokeAnt.id}</p>
                    <p className={styles.botoes__botao__nome}>{pokeAnt.name.includes('-mega') ? 'Mega ' + pokeAnt.name.replaceAll('-', ' ').replace('mega', '') : pokeAnt.name.replaceAll('-', ' ')}</p>
                </div>
            ))}
            {pokemonSeguinte.map(pokeDep => (
                <div key={pokeDep.id} className={styles.botoes__botao} onClick={() => router.push(`/pokemon/${pokeDep.name}`)}>
                    <p className={styles.botoes__botao__nome}>{pokeDep.name.includes('-mega') ? 'Mega ' + pokeDep.name.replaceAll('-', ' ').replace('mega', '') : pokeDep.name.replaceAll('-', ' ')}</p>
                    <p className={styles.botoes__botao__id}>Nº {pokeDep.id < 100 ? `00${pokeDep.id}` : pokeDep.id < 1000 ? `0${pokeDep.id}`: pokeDep.id}</p>
                    <IoIosArrowForward className={styles.svg_dir}/>
                </div>
            ))}
        </div>
    )
}
