import React from 'react'
import Cards from '../src/components/Cards'
import MenuFiltros from '../src/components/MenuFiltros'
import MenuOrdenador from '../src/components/MenuOrdenador'
import Head from 'next/head'
 

export default function HomePage() {

    return (
        <>
            <Head>
                <title>Pokédex</title>
            </Head>
            <MenuFiltros/>
            <MenuOrdenador/>
            <Cards/>
        </>
    )
}