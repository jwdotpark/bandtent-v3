import React, { useEffect, useState } from 'react'
import prisma from '../lib/prisma'
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import PostProps from '../types/Post'
import theme from '../utils/theme'
import {
  Box,
  Text,
  Stack,
  Image,
  Center,
  Button,
  useColorMode,
  ColorModeScript,
  Spacer,
  VStack,
} from '@chakra-ui/react'
// import { Media } from '../utils/media'
import Router from 'next/router'
import Feature from '../components/feature/Feature'
// import ImageComponent from '../components/utils/ImageComponent'
import moment from 'moment'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import musicAtom from '../store/store'
import MainComments from '../components/post/MainComments'
// import Header from '../components/nav/Header'
// import { server } from '../utils/server'

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true, image: true, id: true },
      },
      comments: true,
    },
    take: 20,
    orderBy: { id: 'desc' },
  })
  // const feed = await fetch(`${server}/api/serverside/get-post`)

  const feature = await prisma.post.findMany({
    take: 5,
    orderBy: {
      comments: {
        _count: 'desc',
      },
    },
    include: {
      comments: true,
    },
  })

  return {
    props: {
      feed: JSON.parse(JSON.stringify(feed)),
      feature: JSON.parse(JSON.stringify(feature)),
    },
  }
}

type Props = {
  feed: PostProps[]
}

const Main: React.FC<Props> = (props) => {
  const { colorMode } = useColorMode()

  // load more posts with pagination query
  const [feed, setFeed] = useState(props.feed)
  // const [cursor, setCursor] = useState(props.feed[props.feed.length - 1].id)
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false)
  const [, setSelectMusic] = useAtom(musicAtom)

  // const handleMore = async (e: React.SyntheticEvent) => {
  //   e.preventDefault()
  //   setIsLoading(true)
  //   try {
  //     const result = await fetch('api/post/loadmore', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(cursor),
  //     })
  //     const data = await result.json()
  //     setCursor(feed[feed.length - 1].id)
  //     setFeed([...feed, ...data])
  //   } catch (error) {
  //     console.error(error)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  // console.log(feed)

  useEffect(() => {
    setFeed(props.feed)
  }, [props.feed])

  const handleMusic = (music: any) => {
    setSelectMusic(music)
  }

  return (
    <>
      <Layout>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        {/* desktop */}
        {/* navbar space */}
        {/* <Header /> */}
        <Box m="2">
          <Stack direction={['column', 'row']} w="100%">
            <Box>
              {/* left column */}
              <Box
                w="50vw"
                bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
                borderRadius="xl"
                boxShadow="md"
                px="2"
                py="2"
                pr="6"
              >
                <section>
                  {feed &&
                    feed.map((post) => (
                      <motion.div
                        whileHover={{
                          scale: 1.02,
                        }}
                        transition={{ ease: 'easeInOut', duration: 0.2 }}
                        key={post.id}
                      >
                        <Box
                          display="inline-block"
                          bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
                          borderRadius="xl"
                          my="2"
                          mx="2"
                          boxShadow="md"
                          w="100%"
                        >
                          <Box _hover={{ cursor: 'pointer' }}>
                            <Stack direction="row" p="4">
                              <Box
                                position="relative"
                                // border="1px solid red"
                                sx={{ aspectRatio: 1 }}
                                boxSize="150px"
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
                                boxShadow="md"
                                bg={
                                  colorMode === 'light'
                                    ? 'gray.400'
                                    : 'gray.600'
                                }
                                p="2"
                                h="100px"
                                w="100%"
                                onClick={() =>
                                  Router.push('/p/[id]', `/p/${post.id}`)
                                }
                              >
                                <Box ml="2" mt="1">
                                  <Text fontSize="xl" noOfLines={1}>
                                    {post.title}
                                  </Text>
                                  <Text fontSize="xl" noOfLines={1}>
                                    {post.content}
                                  </Text>
                                </Box>
                              </Box>
                            </Stack>
                            {/* info */}
                            <motion.div
                              whileHover={{
                                scale: 1.02,
                              }}
                              transition={{
                                ease: 'easeInOut',
                                duration: 0.2,
                              }}
                            >
                              <Box
                                alignContent="right"
                                borderRadius="xl"
                                p="1"
                                mb="4"
                                // mt="1"
                                mx="4"
                                boxShadow="md"
                                bg={
                                  colorMode === 'light'
                                    ? 'gray.400'
                                    : 'gray.600'
                                }
                                onClick={() =>
                                  Router.push(
                                    '/auth/[authorId]',
                                    `/auth/${post.authorId}`
                                  )
                                }
                              >
                                <Box>
                                  <Center justifyContent="left" mx="2">
                                    <Image
                                      display="inline"
                                      border="2px inset  gray"
                                      src={post.author!.image}
                                      alt={post.author!.name}
                                      fallbackSrc="https://picsum.photos/200"
                                      boxSize="1.5rem"
                                      borderRadius="full"
                                      mr="2"
                                    />
                                    <Text fontSize="xs" textAlign="right">
                                      {post.author!.name},{' '}
                                      {moment(post.createdAt).fromNow()}
                                    </Text>
                                    <Spacer />
                                    <Box mx="4">
                                      <Text fontSize="xs">
                                        {post.comments.length === 1 &&
                                          '1 review'}
                                        {post.comments.length > 1 &&
                                          post.comments.length + ' reviews'}
                                      </Text>
                                    </Box>
                                  </Center>
                                </Box>
                              </Box>
                            </motion.div>
                          </Box>
                        </Box>
                      </motion.div>
                    ))}
                </section>
              </Box>
              <Center my="4">
                <Button
                  // mx="4"
                  w="100%"
                  size="sm"
                  colorScheme="gray"
                  borderRadius="xl"
                  // onClick={handleMore}
                  boxShadow="md"
                >
                  <Text fontSize="sm">
                    {isLoading ? 'Loading..' : 'Load More'}
                  </Text>
                </Button>
              </Center>
            </Box>

            {/* right column */}
            <VStack w="100%">
              {/* @ts-ignore */}
              <Feature props={props.feature} />
              <MainComments />
            </VStack>
          </Stack>
        </Box>
      </Layout>
    </>
  )
}

export default Main
