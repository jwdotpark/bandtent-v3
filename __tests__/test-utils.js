import { render } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/react'

// Add in any providers here if necessary:
const Providers = ({ children, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider>{children}</ChakraProvider>
    </SessionProvider>
  )
}

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
