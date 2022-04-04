import useSWR from 'swr'
import {
  Box,
  Text,
  Divider,
  useColorMode,
  Center,
  Spinner,
  Image,
  Stack,
} from '@chakra-ui/react'
import Router from 'next/router'
import ImageComponent from '../utils/ImageComponent'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import musicAtom from '../../store/store'
import moment from 'moment'

const MyPost = (props) => {
  const { colorMode } = useColorMode()
  const [num, setNum] = useState(0)

  const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json())
  const { data, error } = useSWR(`/api/post/mypost/${props.uid}`, fetcher, {
    refreshInterval: 1000 * 60,
  })

  useEffect(() => {
    if (data) {
      setNum(data.posts.length)
    }
  }, [data])

  const [selectMusic, setSelectMusic] = useAtom(musicAtom)

  const handleMusic = (music) => {
    setSelectMusic(music)
  }

  if (error) return <Center h="100%">Failed to load</Center>
  if (!data)
    return (
      <Center h="100%">
        <Spinner />
      </Center>
    )

  return (
    <>
      <Box my="2" mb="4">
        <Box
          bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
          borderRadius="xl"
          p="2"
          m="2"
          mx="4"
          mb="4"
          boxShadow="md"
        >
          <Text fontSize="xl">
            {data && data.posts.length !== 1
              ? data.posts.length + ' posts uploaded.'
              : 'No item uploaded.'}
          </Text>
        </Box>

        <Box
          bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
          borderRadius="xl"
          boxShadow="md"
          mb="2"
          mx="4"
          px="2"
          pt="2"
          pr="6"
          pb="2"
        >
          {!error &&
            data.posts
              // .slice(0)
              // .reverse()
              .map((post) => {
                return (
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                    }}
                    transition={{ ease: 'easeInOut', duration: 0.2 }}
                    key={post.id}
                  >
                    <Box
                      display="inline-block"
                      bg={colorMode === 'light' ? 'gray.400' : 'gray.600'}
                      borderRadius="xl"
                      my="2"
                      mx="2"
                      mb="2"
                      boxShadow="md"
                      w="100%"
                    >
                      <Box _hover={{ cursor: 'pointer' }}>
                        <Stack direction="row" p="4">
                          <Box
                            position="relative"
                            sx={{ aspectRatio: 1 }}
                            boxSize="140px"
                            h="75px"
                          >
                            <Box
                              onClick={() => {
                                handleMusic(post)
                              }}
                            >
                              <motion.div
                                whileHover={{
                                  scale: 1.02,
                                }}
                                whileTap={{
                                  scale: 0.98,
                                }}
                                transition={{
                                  ease: 'easeInOut',
                                  duration: 0.2,
                                }}
                                key={post.id}
                              >
                                <Image
                                  boxShadow="md"
                                  borderRadius="xl"
                                  loading="lazy"
                                  src={
                                    post.imageUrl
                                      ? post.imageUrl
                                      : 'https://picsum.photos/400'
                                  }
                                  alt={post.content}
                                  objectFit="cover"
                                  boxSize="100px"
                                />
                              </motion.div>
                            </Box>
                          </Box>
                          <Box
                            borderRadius="xl"
                            bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
                            p="4"
                            h="100px"
                            w="100%"
                            onClick={() =>
                              Router.push('/p/[id]', `/p/${post.id}`)
                            }
                          >
                            <Box>
                              <Text fontSize="md" noOfLines={1}>
                                {post.title}
                              </Text>
                              <Text fontSize="2xl" noOfLines={1}>
                                {post.content}
                              </Text>
                            </Box>
                          </Box>
                        </Stack>
                      </Box>
                    </Box>
                  </motion.div>
                )
              })}
        </Box>
        {error && <Text>Failed to load</Text>}
      </Box>
    </>
  )
}

export default MyPost
