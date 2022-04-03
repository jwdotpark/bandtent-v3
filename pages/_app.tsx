import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useScrollRestoration } from '../utils/useScrollRestoration'
import { MediaContextProvider } from '../utils/media'

// FIXME Player render cycle
import dynamic from 'next/dynamic'
const Player = dynamic(() => import('../components/utils/Player'), {
  ssr: false,
})

const App = ({ Component, pageProps }: AppProps) => {
  // scroll preseervation
  const router = useRouter()
  useScrollRestoration(router)
  return (
    <SessionProvider session={pageProps.session}>
      <MediaContextProvider>
        <ChakraProvider>
          <Player />
          <Component {...pageProps} />
        </ChakraProvider>
      </MediaContextProvider>
    </SessionProvider>
  )
}

export default App
