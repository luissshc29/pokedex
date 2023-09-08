import type { AppProps } from 'next/app'
import GlobalStyles from '../src/styles/commons/GlobalStyles'
import Banner from '../src/components/Banner'
import Rodape from '../src/components/Rodape'
import FiltrosProvider from '../src/context/Filtros'
import OrdenacaoProvider from '../src/context/Ordenacao'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <GlobalStyles/>
            <OrdenacaoProvider>
                <FiltrosProvider>
                    <Banner/>
                    <Component {...pageProps} />
                </FiltrosProvider>
            </OrdenacaoProvider>
            <Rodape/>
        </>
    )
}