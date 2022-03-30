import dynamic from 'next/dynamic'
import Header from './nav/Header'
import { Box, useColorMode } from '@chakra-ui/react'
import Player from './utils/Player'
// const Player = dynamic(() => import('./utils/Player'), {
//   ssr: false,
// })

const Layout = (props: {
  children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal
}) => {
  return (
    <>
      <Box>
        <Header />
        <Player />
        <Box
          sx={{
            transform: 'translateY(4rem)',
          }}
        >
          {props.children}
        </Box>
      </Box>
    </>
  )
}

export default Layout
