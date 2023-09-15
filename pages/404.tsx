import React from 'react'
import Head from "next/head";
import Componente404 from '../src/components/404';

export default function Page404() {
  return (
        <>
            <Head>
                <title>Pokédex - Pokemon não encontrado</title>
            </Head>
            <Componente404/>
        </>
  )
}
