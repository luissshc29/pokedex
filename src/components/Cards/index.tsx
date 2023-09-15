import React, { useEffect, useState } from 'react'
import { IListaPokemon } from '../../interfaces/IListaPokemon'
import Card from './Card'
import styles from './Cards.module.scss'
import { IPokemon } from '../../interfaces/IPokemon'
import axios from 'axios'
import { useFiltrosContext } from '../../context/Filtros'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { v4 as uuidv4 } from 'uuid'
import { useOrdenacaoContext } from '../../context/Ordenacao'
import Componente404 from '../404'

export default function Cards() {

    const urlBase = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=2000"

    const [listaPokemonDetalhada, setListaPokemonDetalhada] = useState<IPokemon[]>([])

    const {busca, aleatorizaLista, alteraBusca, alteraFiltro} = useFiltrosContext()

    const {filtro, aleatoria} = useFiltrosContext()

    const {ordenacao, alteraOrdenacao} = useOrdenacaoContext()

    const ordenaLista = (lista: IPokemon[]) => {

        var listaTemp = lista

        switch (ordenacao) {
            case 'Por id crescente' :
                return listaTemp.sort((a, b) => a.id - b.id)

            case 'Por id decrescente' :
                return listaTemp.sort((a, b) => b.id - a.id)

            case 'A-Z':
                return listaTemp.sort((a, b) => a.name > b.name ? 1 : -1)

            case 'Z-A':
                return listaTemp.sort((a, b) => b.name > a.name ? 1 : -1)

            default:
                return listaTemp

        }
    }

    const embaralhar = (lista) => {

        let listaTemp = lista

        for (let i = listaTemp.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let k = listaTemp[i];
            listaTemp[i] = listaTemp[j];
            listaTemp[j] = k;
        }

        return listaTemp
    }

    const getListaDetalhada = (lista: IListaPokemon[]) => {

        var listaAleatoria = lista

        if (aleatoria) {
            listaAleatoria = embaralhar(listaAleatoria)
        }

        var listaBuscada = listaAleatoria
        
        if (busca) {
            if (isNaN(Number(busca.toString()))) {
                listaBuscada = listaBuscada.filter(item => item.name.includes(busca.toLowerCase().replaceAll(' ', '-')))
            }
        }

        var URLs = []

        listaBuscada.map(item => URLs.push(item.url))

        var listaFinal = []

        axios.all(URLs.map(url => 
            axios.get(url)))
            .then(res => res.map(item => {
                listaFinal.push(item.data)
            }))
            .catch(err => console.log(err))

        setListaPokemonDetalhada(listaFinal)

        setTimeout(() => {    
            setLoading(false)
        }, 1500)
    }

    const [loading, setLoading] = useState<boolean>(true)
    
    const criaLista = (url: string) => {

        setListaPokemonDetalhada([])
        setLoading(true)

        if (filtro) {

            axios.get(`https://pokeapi.co/api/v2/type/${filtro}/`)
            .then(res => {
                var lista = res.data.pokemon

                lista = lista.map(item => item.pokemon)

                getListaDetalhada(lista)
            })
            .catch(err => console.log(err))
        } else {
            axios.get(url)
            .then(res => {
                var lista = res.data.results

                getListaDetalhada(lista)
            })
            .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        criaLista(urlBase)

    }, [filtro, aleatoria, busca])

    if (loading) {
        return (
            <div className={styles.container__loading}>
                <img className={styles.loading} src='/images/loading.svg'/>
            </div>
        )
    }

    return (
        <>   
            <div className={styles.cards}>
                {listaPokemonDetalhada.length > 0 ? <h2 
                    className={styles.mensagem}
                >
                    Exibindo todos os resultados {aleatoria ? <span>aleatórios</span> : ''} {busca ? `para "${busca}"`: ''} {filtro ? <i>do tipo <span>{filtro}</span></i> : ''} {ordenacao ? <i>ordenados <span>{ordenacao}</span></i> : ''}
                    
                    {busca || filtro || aleatoria || ordenacao ? 

                        <AiOutlineCloseCircle 
                            onClick={() => {
                                aleatorizaLista(false)
                                alteraBusca('')
                                alteraFiltro('')
                                alteraOrdenacao('')
                            }}/> : ''
                    }
                    
                </h2> :

                <Componente404/>
                }

                { 
                    ordenaLista(listaPokemonDetalhada).map(item => (
                        <Card
                            key={uuidv4()}
                            pokemon={item}
                        />
                    ))
                }

            </div>
        </>
    )
}