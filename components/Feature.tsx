import {
  Box,
  Text,
  useColorMode,
  Center,
  Spinner,
  VStack,
  Spacer,
} from '@chakra-ui/react'
import Router from 'next/router'
import { Key } from 'react'
import ImageComponent from './utils/ImageComponent'
import useSWR from 'swr'
import { motion } from 'framer-motion'

const Feature = (props: { props }) => {
  const { colorMode } = useColorMode()
  // const [randomPost, setRandomPost] = useState(null)

  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data, error } = useSWR('/api/post/count', fetcher, {
    // NOTE interval 1hr for now
    refreshInterval: 1000 * 60,
  })

  // const randomPost = (data: number): number => {
  //   const random = Math.floor(Math.random() * data)
  //   return random
  // }

  // useEffect(() => {
  //   setRandomPost(Math.floor(Math.random() * data))
  //   console.log(randomPost)
  // }, [data, randomPost])

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
              <b>{!error && JSON.stringify(data)} uploaded</b>
            </Text>
          </Box>
          <Box mt="4">
            {props.props.feed.map(
              (
                post: {
                  id: Key
                  title: string
                  author: { name: string }
                  content: string
                  imageUrl: string
                  createdAt: Date
                },
                index: number
              ) => (
                <>
                  {index === 2 && (
                    <Box key={post.id}>
                      <motion.div
                        whileHover={{
                          scale: 1.02,
                        }}
                        transition={{ ease: 'easeInOut', duration: 0.2 }}
                      >
                        <Box
                          _hover={{ cursor: 'pointer' }}
                          onClick={() =>
                            Router.push('/p/[id]', `/p/${post.id}`)
                          }
                          bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
                          boxShadow="md"
                          borderRadius="xl"
                          p="2"
                        >
                          <Box position="relative" p="2" m="2">
                            <Box sx={{ filter: 'blur(2px) brightness(75%)' }}>
                              {post.imageUrl && <ImageComponent props={post} />}
                            </Box>
                            <Center
                              top="0"
                              position="absolute"
                              h="100%"
                              w="100%"
                            >
                              <VStack>
                                <Spacer />
                                <Box>
                                  <Text fontSize="6xl" textShadow="md">
                                    <b>{post.title}</b>
                                  </Text>
                                </Box>
                                <Box>
                                  <Text fontSize="4xl" textShadow="md">
                                    <b>{post.content}</b>
                                  </Text>
                                </Box>
                              </VStack>
                            </Center>
                          </Box>
                        </Box>
                      </motion.div>
                    </Box>
                  )}
                </>
              )
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Feature
