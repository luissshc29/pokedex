import React from 'react'
import Cards from '../src/components/Cards'
import MenuFiltros from '../src/components/MenuFiltros'
import MenuOrdenador from '../src/components/MenuOrdenador'

export default function HomePage() {

    return (
        <>
            <MenuFiltros/>
            <MenuOrdenador/>
            <Cards/>
        </>
    )
}