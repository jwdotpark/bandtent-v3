import dynamic from 'next/dynamic'
import Header from './nav/Header'
import { Box, useColorMode } from '@chakra-ui/react'
import FooterPlayer from './utils/FooterPlayer'

const Layout = (props: {
  children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal
}) => {
  let url = './audio.mp3'
  return (
    <>
      <Header />
      <Box
      // sx={{
      //   transform: 'translateY(3.5rem)',
      // }}
      >
        {props.children}
      </Box>
      <FooterPlayer url={url} />
    </>
  )
}

export default Layout
