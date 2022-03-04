import React, { ReactNode } from 'react'
import Header from './Header'
import { Box } from '@chakra-ui/react'

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = (props) => (
  <Box border="2px solid yellow">
    <Header />
    <Box>{props.children}</Box>
  </Box>
)

export default Layout
