import Header from './nav/Header'
import { Box } from '@chakra-ui/react'

const Layout = (props: {
  children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal
}) => {
  return (
    <Box>
      <Header />
      <Box
        pb="10"
        sx={{
          transform: 'translateY(3.5rem)',
        }}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export default Layout
