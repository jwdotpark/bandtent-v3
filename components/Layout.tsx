// import Header from './nav/Header'
// import { Box } from '@chakra-ui/react'
// import FooterPlayer from './utils/FooterPlayer'

const Layout = (props: {
  children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal
}) => {
  return <>{props.children}</>
}

export default Layout
