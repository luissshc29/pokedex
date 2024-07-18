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
import { useRouter } from 'next/router'

export default function Cards() {

    const urlBase = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=2000"

    const [listaPokemonDetalhada, setListaPokemonDetalhada] = useState<IPokemon[]>([])

    const {busca, aleatorizaLista, alteraBusca, alteraFiltro} = useFiltrosContext()

    const {filtro, aleatoria} = useFiltrosContext()

    const {ordenacao, alteraOrdenacao} = useOrdenacaoContext()

    const router = useRouter()

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
            listaBuscada = listaBuscada.filter(item => {
                if (busca.toLowerCase().includes('mega ')) {
                    var buscaFormatada = busca.toLowerCase().replace('mega ', '')

                    if (buscaFormatada.toLowerCase().includes(' y')) {                           
                        buscaFormatada = buscaFormatada.replace(' y', ' mega y')
                    }

                    else if (buscaFormatada.toLowerCase().includes(' x')) {                           
                        buscaFormatada = buscaFormatada.replace(' x', ' mega x')
                    } else {
                        buscaFormatada = buscaFormatada + ' mega'
                    }

                    return item.name.includes(buscaFormatada.toLowerCase().replaceAll(' ', '-'))

                } else if (busca.toLowerCase().includes('primal ')) {
                    var buscaFormatada = busca.toLowerCase().replace('primal ', '')
                    buscaFormatada = buscaFormatada + ' primal'

                    return item.name.includes(buscaFormatada.toLowerCase().replaceAll(' ', '-'))

                } else if (busca.toLowerCase().includes('galarian')) {
                    var buscaFormatada = busca.toLowerCase().replace('galarian', '').replace(' ', '')
                    buscaFormatada = buscaFormatada + ' galar'

                    return item.name.includes(buscaFormatada.toLowerCase().replaceAll(' ', '-'))

                } else if (busca.toLowerCase().includes('alolan')) {
                    var buscaFormatada = busca.toLowerCase().replace('alolan', '').replace(' ', '')
                    buscaFormatada = buscaFormatada + ' alola'

                    return item.name.includes(buscaFormatada.toLowerCase().replaceAll(' ', '-'))

                } else if (busca.toLowerCase().includes('gigantamax') || busca.toLowerCase().includes('gmax')) {
                    var buscaFormatada = busca.toLowerCase().replace('gigantamax', '').replace(' ', '').replace('gmax', '').replace(' ', '')
                    buscaFormatada = buscaFormatada + ' gmax'

                    return item.name.includes(buscaFormatada.toLowerCase().replaceAll(' ', '-'))

                } else if (busca.toLowerCase().includes('paldean')) {
                    var buscaFormatada = busca.toLowerCase().replace('paldean', '').replace(' ', '')
                    buscaFormatada = buscaFormatada + ' paldea'

                    return item.name.includes(buscaFormatada.toLowerCase().replaceAll(' ', '-'))

                } else if (busca.toLowerCase().includes('hisui')) {
                    var buscaFormatada = busca.toLowerCase().replace('hisui', '').replace(' ', '')
                    buscaFormatada = buscaFormatada + ' hisui'

                    return item.name.includes(buscaFormatada.toLowerCase().replaceAll(' ', '-'))

                } else if (busca.toLowerCase().includes('totem')) {
                    var buscaFormatada = busca.toLowerCase().replace('totem', '').replace(' ', '')
                    buscaFormatada = buscaFormatada + ' totem'

                    return item.name.includes(buscaFormatada.toLowerCase().replaceAll(' ', '-'))

                } else {
                    return item.name.includes(busca.toLowerCase().replaceAll(' ', '-'))
                }
            })
        }

        if(listaBuscada.length === 0) {
            setTimeout(() => {
                router.push('/404')
            }, 1500)
        }

        var URLs = []

        listaBuscada.map(item => URLs.push(item.url))

        var listaFinal:IPokemon[] = []

        axios.all(URLs.map(url => 
            axios.get(url)))
            .then(res => res.map(item => {
                listaFinal.push(item.data) 
                setLoading(false)
            }))
            .catch(err => console.log(err))

        setListaPokemonDetalhada(listaFinal)
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
                    ordenaLista(listaPokemonDetalhada).map(item => {
                        if (item)  {
                            return (
                        <Card
                            key={uuidv4()}
                            pokemon={item}
                        />
                    )
                        }
                    })
                }

            </div>
        </>
    )
}