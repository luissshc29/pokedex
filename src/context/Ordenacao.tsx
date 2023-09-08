import { createContext, useContext, useState } from "react";

export const OrdenacaoContext = createContext<any>('')
OrdenacaoContext.displayName = 'Ordenação'

export default function OrdenacaoProvider ({children}) {

    const [ordenacao, setOrdenacao] = useState<string>('')

    return (
        <OrdenacaoContext.Provider value={{ordenacao, setOrdenacao}}>
            {children}
        </OrdenacaoContext.Provider>
    )
}

export const useOrdenacaoContext = () => {

    const {ordenacao, setOrdenacao} = useContext(OrdenacaoContext)
    
    function alteraOrdenacao (valor: string) {
        setOrdenacao(valor)   
    }

    return {
        ordenacao, 
        alteraOrdenacao
    }
}
