import { GetStaticPaths, GetStaticProps } from "next";
import ContainerIndividual from "../../src/components/ContainerIndividual";
import React from "react";
import axios from "axios";
import Head from "next/head";
import EvoulutionChain from "../../src/components/ContainerIndividual/EvolutionChain";
import BotoesNav from "../../src/components/ContainerIndividual/BotoesNav";

export const getStaticPaths: GetStaticPaths = async () => {

    var lista = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0`)

    var data = await lista.data.results

    const paths = data.map(item => {
        return {params: {nome: item.name}}
    })

    return {
      paths,
      fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async (context) => {

    const pokemonAtual = context.params.nome.toString()
    var words = pokemonAtual.split('-')
    var pokemonCapitalizado = []

    words.forEach(item => {
        pokemonCapitalizado.push(item.slice(0, 1).toUpperCase() + item.slice(1))
    })

    var pokemon = pokemonCapitalizado.join(' ')

    pokemon.includes(' Mega') ? pokemon = 'Mega ' + pokemon.replaceAll('-', ' ').replace('Mega', '') : pokemon = pokemon.replaceAll('-', ' ')
    
    return {
        props: {
            pokemon: pokemon
        }
    }
}

export default function PokemonPage(props) {

    const pokemon: string = props.pokemon

    return (
        <> 
            <Head>
                <title>{`Pokédex ${pokemon === undefined ? '' : '- ' + pokemon}`}</title>
            </Head>
            <BotoesNav/>
            <ContainerIndividual/> 
            <EvoulutionChain/>
        </>
    )
}