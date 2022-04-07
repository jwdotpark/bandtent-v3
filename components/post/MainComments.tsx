import { Box, useColorMode } from '@chakra-ui/react'

const MainComments = () => {
  const { colorMode } = useColorMode()

  return (
    <Box
      className="comment"
      w="100%"
      p="2"
      m="2"
      borderRadius="xl"
      bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
      boxShadow="md"
    >
      <Box
        bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
        borderRadius="xl"
        p="2"
        m="2"
        boxShadow="md"
      >
        comments
      </Box>
    </Box>
  )
}

export default MainComments
