import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './MenuOrdenador.module.scss'
import { GoListUnordered } from 'react-icons/go'
import  { IoReorderThreeOutline } from 'react-icons/io5'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useOrdenacaoContext } from '../../context/Ordenacao'
import { useFiltrosContext } from '../../context/Filtros'

export default function MenuOrdenador() {

    const [menuAtivo, setMenuAtivo] = useState<boolean>(false)

    const {ordenacao, alteraOrdenacao} = useOrdenacaoContext()
    const {aleatorizaLista} = useFiltrosContext()

    const [opcaoAtiva, setOpcaoAtiva] = useState<string>(ordenacao)

    function submeterFormulario (evento: React.FormEvent<HTMLFormElement>) {
        evento.preventDefault()

        alteraOrdenacao(opcaoAtiva)
        aleatorizaLista(false)
        setMenuAtivo(!menuAtivo)
    }

    const [opcoes, setOpcoes] = useState<string[]>(['A-Z', 'Z-A', 'Por id crescente', 'Por id decrescente'])

    
    const [tipos, setTipos] = useState<{name: string, url: string}[]>([])

    const buscaLista = () => {

        axios.get('https://pokeapi.co/api/v2/type/')
        .then(res => {
            setTipos(res.data.results)
        })
        .catch(err => console.log(err))

    }

    useEffect(() => {
        setTimeout(() => {
            buscaLista()
        }, 1800)
    }, [])

    if (tipos.length === 0) {
        return (
            <div></div>
        )
    }

    return (
        <div className={`${styles.menu} ${!menuAtivo && styles.menu__inativo}`}>
            <div className={styles.ativador} onClick={() => setMenuAtivo(!menuAtivo)}>
                
                <div>
                    <GoListUnordered/>
                    <p>Ordenar</p>
                </div>
                
            </div>
            <form
                className={`${styles.formulario} ${!menuAtivo && styles.formulario__inativo}`}
                onSubmit={evento => submeterFormulario(evento)}
            >
                <div className={styles.formulario__containerTipo}>
                    <label htmlFor="select-tipo">Ordenar por:</label>
                    <select name='select-tipo' onChange={(evento) => setOpcaoAtiva(evento.target.value)}>
                        <option value={opcaoAtiva}>{opcaoAtiva}</option>
                        {opcoes.filter(item => item !== ordenacao).map(item => (
                            <option value={item} key={item}>{item}</option>
                        ))}
                    </select>
                </div>
    
                <button type='submit' className={styles.formulario__botao}>
                    <p>Ordenar</p>
                    <IoReorderThreeOutline/>
                </button>

                <button className={styles.formulario__remover} type='submit'>
                    <p 
                        onClick={() => setOpcaoAtiva('')}
                    >
                        Remover ordenação
                    </p>
                    <AiOutlineCloseCircle/>
                </button>
            </form>
        </div>
    )
}
