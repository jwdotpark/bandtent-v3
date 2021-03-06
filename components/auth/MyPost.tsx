import useSWR from 'swr'
import {
  Box,
  Text,
  useColorMode,
  Center,
  Spinner,
  Image,
  Stack,
} from '@chakra-ui/react'
import Router from 'next/router'
import { Key, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import musicAtom from '../../store/store'

const MyPost = (props: { uid: any }) => {
  const { colorMode } = useColorMode()
  const [, setNum] = useState(0)

  const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json())
  const { data, error } = useSWR(`/api/post/mypost/${props.uid}`, fetcher, {
    refreshInterval: 1000 * 60,
  })

  useEffect(() => {
    if (data) {
      setNum(data.posts.length)
    }
  }, [data])

  const [, setSelectMusic] = useAtom(musicAtom)

  // FIXME
  const handleMusic = (music: any) => {
    setSelectMusic(music)
  }

  const Unpublished = () => {
    return (
      <>
        <Box display="inline">
          {' '}
          <b>UNPUBLISHED</b>
        </Box>
      </>
    )
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
          <Text fontSize="xl" ml="2" data-testid="uploaded">
            {data && data.posts.length !== 1
              ? data.posts.length + ' articles uploaded.'
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
            data.posts.map(
              (post: {
                id: Key | null | undefined
                published: any
                imageUrl: string | undefined
                content: {} | null | undefined
                title: string
              }) => {
                return (
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                    }}
                    transition={{ ease: 'easeInOut', duration: 0.2 }}
                    key={post.id}
                  >
                    <Box
                      // FIXME fix the logic later not to fetch unpublished post from API
                      display={post.published ? 'inline-block' : 'none'}
                      // border={post.published ? null : '3px dashed #f61d98'}
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
                                  // FIXME
                                  // @ts-ignore
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
                                {!post.published && <Unpublished />}
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
              }
            )}
        </Box>
        {error && <Text>Failed to load</Text>}
      </Box>
    </>
  )
}

export default MyPost
