import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { IPokemon } from '../src/interfaces/IPokemon'
import ContainerIndividual from '../src/components/ContainerIndividual'
import { GrUserWorker } from 'react-icons/gr'

export default function PokemonPage() {

    return (
        <>
            <ContainerIndividual/>
        </>
    )
}
