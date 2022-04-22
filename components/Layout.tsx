import Header from './nav/Header'
import { Box } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
const Player = dynamic(() => import('../components/utils/Player'), {
  ssr: false,
})

const Layout = (props: {
  children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal
}) => {
  return (
    <Box>
      <Header data-testid="header" />
      <Box
        pb="10"
        sx={{
          transform: 'translateY(3.5rem)',
        }}
      >
        {props.children}
      </Box>
      <Player />
    </Box>
  )
}

export default Layout
