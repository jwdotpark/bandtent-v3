import dynamic from 'next/dynamic'
import Header from './nav/Header'
import { Box, useColorMode } from '@chakra-ui/react'

const Layout = (props: {
  children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal
}) => {
  return (
    <>
      <Box>
        <Header />
        <Box
          sx={{
            transform: 'translateY(3.5rem)',
          }}
        >
          {props.children}
        </Box>
      </Box>
    </>
  )
}

export default Layout
