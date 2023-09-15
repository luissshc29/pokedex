import React from 'react'
import styles from './Card.module.scss'
import { IPokemon } from '../../../interfaces/IPokemon'
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid'

export default function Card({ pokemon }: { pokemon: IPokemon }) {

    const router = useRouter()

    return (
        <div className={styles.card} onClick={() => router.push(`/pokemon/${pokemon.name}`)}>
            <img src={pokemon.sprites.front_default} className={styles.card__imagem}/>
            <h2 className={styles.card__nome}>{pokemon.name.includes('-mega') ? 'Mega ' + pokemon.name.replaceAll('-', ' ').replace('mega', '') : pokemon.name.replaceAll('-', ' ')}</h2>
            <p className={styles.card__numero}>Nº {pokemon.id}</p>
            <div className={styles.card__tipos}>   
                {pokemon.types.map(item => (
                    <p 
                        key={uuidv4()} 
                        className={`${styles.card__tipos__tipo} ${styles[`card__tipos__tipo__${item.type.name.toLowerCase()}`]}`}
                    >
                        {item.type.name}
                    </p>
                ))} 
            </div>
        </div>
    )
}
