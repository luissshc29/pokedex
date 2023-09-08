import React, { useState } from 'react'
import styles from './Banner.module.scss'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { useRouter } from 'next/router'
import { useFiltrosContext } from '../../context/Filtros'

export default function Banner() {

    const router = useRouter()

    const {alteraBusca} = useFiltrosContext()

    const [buscaLocal, setBuscaLocal] = useState('')

    const submeterFormulario = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        alteraBusca(buscaLocal)
        setBuscaLocal('')

        if (window.location.pathname !== '/') {
            router.push('/')
        }

    }

    return (
        <div className={styles.banner}>
            <div className={styles.banner__container}>
                <img 
                    src='/images/pokemon-logo.png' 
                    className={styles.banner__container__logo} 
                    onClick={() => router.push('/')}
                />
                <h1 className={styles.banner__container__texto}>Tudo sobre Pokémon em um só lugar!</h1>
            </div>
            <form onSubmit={evento => submeterFormulario(evento)}>
                <input className={styles.banner__input} placeholder='Pesquise por um Pokémon...' value={buscaLocal} onChange={(evento) => setBuscaLocal(evento.target.value)}/>
                <button type='submit'>
                    <FaMagnifyingGlass />
                </button>
            </form>
        </div>
    )
}
