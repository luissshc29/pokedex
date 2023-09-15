import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './MenuFiltros.module.scss'
import { BsFilterLeft } from 'react-icons/bs'
import  { BiFilterAlt } from 'react-icons/bi'
import { FaRandom } from 'react-icons/fa'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useFiltrosContext } from '../../context/Filtros'
import { useOrdenacaoContext } from '../../context/Ordenacao'

export default function MenuFiltros() {

    const [tipos, setTipos] = useState<{name: string, url: string}[]>([])
    const [menuAtivo, setMenuAtivo] = useState(false)

    const {alteraFiltro, filtro, aleatoria, aleatorizaLista} = useFiltrosContext()
    const {alteraOrdenacao} = useOrdenacaoContext()

    const [filtroAtivo, setFiltroAtivo] = useState(filtro)

    const [aleatoriaLocal, setAleatoriaLocal] = useState(aleatoria)

    function submeterFormulario (evento: React.FormEvent<HTMLFormElement>) {
        evento.preventDefault()

        alteraFiltro(filtroAtivo)

        aleatorizaLista(aleatoriaLocal)
        setMenuAtivo(!menuAtivo)

        if (aleatoriaLocal) {
            alteraOrdenacao('')
        }
    }

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
                    <p>Filtrar</p>
                    <BsFilterLeft/>
                </div>
                
            </div>
            <form
                className={`${styles.formulario} ${!menuAtivo && styles.formulario__inativo}`}
                onSubmit={evento => submeterFormulario(evento)}
            >
                <div className={styles.formulario__containerTipo}>
                    <label htmlFor="select-tipo">Por tipo:</label>
                    <select name='select-tipo' onChange={(evento) => setFiltroAtivo(evento.target.value)}>
                        <option value={filtroAtivo}>{filtroAtivo}</option>
                    {tipos.filter(tipo => tipo.name !== filtro).map(tipo => (
                        <option value={tipo.name} key={tipo.name}>{tipo.name}</option>
                    ))}
                    </select>
                </div>
                <div className={styles.formulario__containerCheckbox}>
                    <label htmlFor="checkbox">
                        <p>Ordem aleatória:</p> 
                        <FaRandom/>
                    </label>
                    <input name='checkbox' type='checkbox' checked={aleatoriaLocal} onChange={() => setAleatoriaLocal(!aleatoriaLocal)}/>
                </div>

                <button type='submit' className={styles.formulario__botao}>
                    <p>Filtrar</p>
                    <BiFilterAlt/>
                </button>

                <button className={styles.formulario__remover} type='submit'>
                    <p 
                        onClick={() => {
                            setFiltroAtivo('')
                            setAleatoriaLocal(false)
                        }}
                    >
                        Remover filtros
                    </p>
                    <AiOutlineCloseCircle/>
                </button>
            </form>
        </div>
    )
}
