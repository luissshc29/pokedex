import React, { useEffect, useState} from 'react'
import styles from './EvolutionChain.module.scss'
import { useRouter } from 'next/router'
import { IPokemonSpecies } from '../../../interfaces/IPokemonSpecies'
import { IListaPokemon } from '../../../interfaces/IListaPokemon'
import axios from 'axios'
import { IEvolutionChain } from '../../../interfaces/IEvolutionChain'
import { IPokemon } from '../../../interfaces/IPokemon'

export default function EvoulutionChain() {

    const router = useRouter()

    const [loading, setLoading] = useState<boolean>(true)

    // Arrays com a cadeia evolutiva simples e detalhada do Pokemon Atual
    const [evolutionChain, setEvolutionChain] = useState<IListaPokemon[]>([])
    const [evolutionChainDetalhada, setEvolutionChainDetalhada] = useState<IPokemonSpecies[]>([])

    const buscaEspeciePokemon = () => {
        setLoading(true)
        var lista = []

        axios.get<IPokemon>(`https://pokeapi.co/api/v2${router.asPath}`)
        .then(res => {
            lista.push(res.data)
            axios.get<IPokemonSpecies>(res.data.species.url)
            .then((res) => {
                buscaEvolucaoPokemon(res.data)
            })
        })
        .catch(err => console.log(err))
    }

    const buscaEvolucaoPokemon = (especie: IPokemonSpecies) => {

        var lista:IEvolutionChain[] = []
        setEvolutionChain([])

        axios.get(especie.evolution_chain.url)
        .then(res => {
            lista.push(res.data)
            obterEvolutionChainDetalhada(lista)
        })
        .catch(err => console.log(err))
    }
 
    const obterEvolutionChainDetalhada = (chain: IEvolutionChain[]) => {

        setEvolutionChainDetalhada([])

        var listaAleatoria:IListaPokemon[] = []

        chain.map(item => {
            listaAleatoria.push(item.chain.species)
            setEvolutionChain([item.chain.species])
            item.chain.evolves_to.map(item => {
                listaAleatoria.push(item.species)
                setEvolutionChain(lista => [...lista, item.species])
                item.evolves_to.map(item => {
                    listaAleatoria.push(item.species)
                    setEvolutionChain(lista => [...lista, item.species])
                })
            })
        })

        var URLs = []

        listaAleatoria.map(item => URLs.push(item.url))

        var listaFinal = []

        axios.all(URLs.map(url => 
            axios.get(url)))
            .then(res => res.map(item => {     
                listaFinal.push(item.data)
                setEvolutionChainDetalhada(listaFinal)
            }))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        buscaEspeciePokemon()
        setTimeout(() => {  
            setLoading(false)
        }, 1800);

    }, [router.asPath])


    if (loading) {
        return <div></div>
    }

    return (
        <div className={styles.containerEvolucao}>
            <h2>Evoluções</h2>
            { 
                evolutionChainDetalhada.map(item => (
                    <div key={item.name} onClick={() => router.push(`/pokemon/${item.name}`)} className={styles.containerEvolucao__card}>
                        <img className={styles.containerEvolucao__card__imagem} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`} />
                        <p className={styles.containerEvolucao__card__nome}>{item.name}</p>
                        <p className={styles.containerEvolucao__card__numero}>Nº {item.id < 100 ? `00${item.id}` : item.id < 1000 ? `0${item.id}` : item.id}</p>
                    </div>
                ))
            }
        </div>
    )
}