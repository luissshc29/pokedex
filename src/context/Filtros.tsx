import { createContext, useContext, useState } from "react";

export const FiltrosContext = createContext<any>('')
FiltrosContext.displayName = 'Filtros'

export default function FiltrosProvider ({children}) {

    const [busca, setBusca] = useState<string>('')
    const [filtro, setFiltro] = useState<string>('')
    const [aleatoria, setAleatoria] = useState<boolean>(false)

    return (
        <FiltrosContext.Provider value={{filtro, setFiltro, aleatoria, setAleatoria, busca, setBusca}}>
            {children}
        </FiltrosContext.Provider>
    )
}

export const useFiltrosContext = () => {

    const {filtro, setFiltro, aleatoria, setAleatoria, busca, setBusca} = useContext(FiltrosContext)

    function alteraFiltro (valor: string) {
        setFiltro(valor)
    }

    function aleatorizaLista (valor: boolean) {
        setAleatoria(valor)
    }
    
    function alteraBusca (valor: string) {
        setBusca(valor)      
    }

    return {
        alteraFiltro,
        filtro,
        aleatorizaLista,
        aleatoria,
        setAleatoria,
        busca,
        alteraBusca
    }
}
