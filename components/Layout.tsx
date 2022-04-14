import Header from './nav/Header'
import dynamic from 'next/dynamic'
import { Box } from '@chakra-ui/react'
const Player = dynamic(() => import('../components/utils/Player'), {
  ssr: false,
})

const Layout = (props: {
  children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal
}) => {
  return (
    <>
      <Header />
      <Box
        pb="10"
        sx={{
          transform: 'translateY(3.5rem)',
        }}
      >
        {props.children}
      </Box>
      {/* @ts-ignore */}
      {/* <Player /> */}
    </>
  )
}

export default Layout
