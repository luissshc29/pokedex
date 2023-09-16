import React from 'react'
import styles from './Card.module.scss'
import { IPokemon } from '../../../interfaces/IPokemon'
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid'

export default function Card({ pokemon }: { pokemon: IPokemon }) {

    const router = useRouter()

    function trataNomes (name: string) {

        var nomeNovo = name

        if (name.includes('-mega')) {
            nomeNovo = 'Mega ' + name.replaceAll('-', ' ').replace('mega', '')
        } else if (name.includes('-primal')) {
            nomeNovo = 'Primal ' + name.replaceAll('-', ' ').replace('primal', '')
        } else if (name.includes('-galar')) {
            nomeNovo = 'Galarian ' + name.replaceAll('-', ' ').replace('galar', '')
        } else if (name.includes('-alola')) {
            nomeNovo = 'Alolan ' + name.replaceAll('-', ' ').replace('alola', '')
        } else if (name.includes('-gmax')) {
            nomeNovo = 'Gigantamax ' + name.replaceAll('-', ' ').replace('gmax', '')
        } else if (name.includes('-paldea')) {
            nomeNovo = 'Paldean ' + name.replaceAll('-', ' ').replace('paldea', '')
        } else if (name.includes('-hisui')) {
            nomeNovo = 'Hisui ' + name.replaceAll('-', ' ').replace('hisui', '')
        } else if (name.includes('-totem')) {
            nomeNovo = 'Totem ' + name.replaceAll('-', ' ').replace('totem', '')
        }   else {            
            nomeNovo = pokemon.name.replaceAll('-', ' ')
        }
        return nomeNovo
    }

    return (
        <div className={styles.card} onClick={() => router.push(`/pokemon/${pokemon.name}`)}>
            <img src={pokemon.sprites.front_default} className={styles.card__imagem}/>
            <h2 className={styles.card__nome}>{trataNomes(pokemon.name)}</h2>
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
