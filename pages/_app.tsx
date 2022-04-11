// @ts-nocheck
// FIXME
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/react'
// import { useRouter } from 'next/router'
// import { useScrollRestoration } from '../utils/useScrollRestoration'
import { MediaContextProvider } from '../utils/media'

// FIXME Player render cycle
// import dynamic from 'next/dynamic'
// const Player = dynamic(() => import('../components/utils/Player'), {
//   ssr: false,
// })

export function reportWebVitals(metric: NextWebVitalsMetric) {
  const body = JSON.stringify(metric)
  const url = 'https://bandtent-v3.vercel.app'

  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body)
  } else {
    fetch(url, { body, method: 'POST', keepalive: true })
  }
}

const App = ({ Component, pageProps }: AppProps) => {
  // scroll preseervation when routing
  // const router = useRouter()
  // useScrollRestoration(router)
  return (
    <SessionProvider session={pageProps.session}>
      <MediaContextProvider>
        <ChakraProvider>
          {/* <Player /> */}
          <Component {...pageProps} />
        </ChakraProvider>
      </MediaContextProvider>
    </SessionProvider>
  )
}

export default App
