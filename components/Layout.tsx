import dynamic from 'next/dynamic'
import Header from './nav/Header'
import { Box, useColorMode } from '@chakra-ui/react'
const Player = dynamic(() => import('./utils/Player'), {
  ssr: false,
})

const Layout = (props: {
  children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal
}) => {
  const { colorMode } = useColorMode()
  return (
    <>
      <Box>
        <Header />
        {/* <Player /> */}
        <Box>{props.children}</Box>
      </Box>
    </>
  )
}

export default Layout
