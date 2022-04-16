/* eslint-disable no-unused-vars */
import '../styles/global.css'
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/react'
// import { useRouter } from 'next/router'
// import { useScrollRestoration } from '../utils/useScrollRestoration'
import { MediaContextProvider } from '../utils/media'

// FIXME Player render cycle
import dynamic from 'next/dynamic'
const Player = dynamic(() => import('../components/utils/Player'), {
  ssr: false,
})

// export function reportWebVitals(metric: NextWebVitalsMetric) {
//   const body = JSON.stringify(metric)
//   const url =
//     process.env.NODE === 'development'
//       ? 'localhost:3000'
//       : 'https://bandtent-v3.vercel.app'
//   if (navigator.sendBeacon) {
//     navigator.sendBeacon(url, body)
//   } else {
//     fetch(url, { body, method: 'POST', keepalive: true })
//   }
// }

const App = ({ Component, pageProps }: AppProps) => {
  // scroll preseervation when routing
  // const router = useRouter()
  // useScrollRestoration(router)
  return (
    <SessionProvider session={pageProps.session}>
      <MediaContextProvider>
        <ChakraProvider>
          <Component {...pageProps} />
          <Player />
        </ChakraProvider>
      </MediaContextProvider>
    </SessionProvider>
  )
}

export default App
