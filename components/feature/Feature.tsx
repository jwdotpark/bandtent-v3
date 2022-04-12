/* eslint-disable no-unused-vars */

import { Box, Text, useColorMode, Center, Spinner } from '@chakra-ui/react'
import useSWR from 'swr'
import Carousel from './Carousel'
// import PostProps from '../../types/Post'

const Feature = ({ props }: any): JSX.Element => {
  const { colorMode } = useColorMode()

  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data, error } = useSWR('/api/post/count', fetcher, {
    refreshInterval: 1000 * 60,
  })

  if (error) return <Center h="100%">Failed to load</Center>
  if (!data)
    return (
      <Center h="100%" w="100%">
        <Spinner />
      </Center>
    )

  return (
    <Box
      w="100%"
      borderRadius="xl"
      bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
      boxShadow="md"
    >
      <Box m="2" p="2" overflow="clip">
        <Box>
          <Box
            bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
            borderRadius="xl"
            mb="2"
            boxShadow="md"
          >
            <Text mx="2" fontSize="3xl" p="2">
              <b>{!error && JSON.stringify(data)} items uploaded</b>
            </Text>
          </Box>
          <Box mt="4" w="100%">
            <Carousel props={props} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Feature
