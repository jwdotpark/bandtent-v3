import React, { ReactNode } from 'react'
import Header from './Header'
import { Box } from '@chakra-ui/react'
import Player from './Player'

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = (props) => (
  <Box>
    <Header />
    <Player />
    <Box>{props.children}</Box>
  </Box>
)

export default Layout
