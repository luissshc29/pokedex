import React from 'react'
import styles from './404.module.scss'
import { TbPokeballOff } from 'react-icons/tb'

export default function Componente404() {
  return (
        <div className={styles.notFound}>
            <TbPokeballOff/>
            <h2>Não encontramos nenhum Pokémon.</h2>
            <p>Recomendamos que tente:</p>
            <ul>
                <li>Modificar a busca</li>
                <li>Modificar os filtros</li>
                <li>Inserir uma URL válida (eg.: "/", "/pokemon/...")</li>
            </ul>
        </div>
  )
}
