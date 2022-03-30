import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useScrollRestoration } from '../utils/useScrollRestoration'
import { MediaContextProvider } from '../utils/media'

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric)
}

const App = ({ Component, pageProps }: AppProps) => {
  // scroll preseervation
  const router = useRouter()
  useScrollRestoration(router)
  return (
    <SessionProvider session={pageProps.session}>
      <MediaContextProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </MediaContextProvider>
    </SessionProvider>
  )
}

export default App
