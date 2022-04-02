import dynamic from 'next/dynamic'
import Header from './nav/Header'
import { Box, useColorMode } from '@chakra-ui/react'
import FooterPlayer from './utils/FooterPlayer'
// import { Provider } from 'jotai'

const Layout = (props: {
  children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal
}) => {
  return (
    <>
      {/* <Provider> */}
      <Header />
      <Box
        pb="6"
        sx={{
          transform: 'translateY(3.5rem)',
        }}
      >
        {props.children}
      </Box>
      {/* <FooterPlayer /> */}
      {/* </Provider> */}
    </>
  )
}

export default Layout
