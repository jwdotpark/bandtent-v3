import dynamic from 'next/dynamic'
import Header from './nav/Header'
import { Box, useColorMode } from '@chakra-ui/react'
import FooterPlayer from './utils/FooterPlayer'

const Layout = (props: {
  children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal
}) => {
  return (
    <>
      <Header />
      <Box
        pb="6"
        sx={{
          transform: 'translateY(3.5rem)',
        }}
      >
        {props.children}
      </Box>
      {/* <FooterPlayer url={url} /> */}
    </>
  )
}

export default Layout
