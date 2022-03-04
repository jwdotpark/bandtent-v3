import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/react'
import { MediaContextProvider } from '../utils/media'

const App = ({ Component, pageProps }: AppProps) => {
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
