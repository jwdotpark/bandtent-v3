import React, { useEffect, useState } from 'react'
import prisma from '../lib/prisma'
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import PostProps from '../types/Post'
import theme from '../utils/theme'
import {
  Divider,
  Box,
  Text,
  Stack,
  Image,
  Center,
  Button,
  useColorMode,
  ColorModeScript,
  HStack,
  VStack,
  Flex,
  AspectRatio,
} from '@chakra-ui/react'
import { Media } from '../utils/media'
import Router from 'next/router'
import Feature from '../components/Feature'
import ImageComponent from '../components/utils/ImageComponent'
import moment from 'moment'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
// import WaveSurferComponent from '../components/utils/WaveSurferComponent'
const WaveSurferComponent = dynamic(
  import('../components/utils/WaveSurferComponent'),
  { ssr: false }
)

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  res.setHeader('Cache-Control', 'Access-Control-Allow-Origin: *')
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true, image: true, id: true },
      },
    },
    take: 10,
    orderBy: { id: 'desc' },
  })
  return {
    props: {
      feed: JSON.parse(JSON.stringify(feed)),
    },
  }
}

type Props = {
  feed: PostProps[]
}

const Main: React.FC<Props> = (props) => {
  const { colorMode } = useColorMode()

  // pagination load more callback
  const [feed, setFeed] = useState(props.feed)
  const [cursor, setCursor] = useState(props.feed[props.feed.length - 1].id)
  const [isLoading, setIsLoading] = useState(false)

  // data[(data.length - 1)] is undefined after third load...
  const handleMore = async () => {
    setIsLoading(true)
    try {
      const result = await fetch('api/post/loadmore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cursor),
      })
      const data = await result.json()
      setCursor(feed[feed.length - 1].id)
      setFeed([...feed, ...data])
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setFeed(props.feed)
  }, [props.feed])

  return (
    <>
      <Layout>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />

        {/* desktop */}
        <Media greaterThanOrEqual="md">
          {/* navbar space */}
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
                    {feed.map((post) => (
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
                          <Box
                            _hover={{ cursor: 'pointer' }}
                            alignContent="baseline"
                          >
                            <Stack direction="row" p="4">
                              <Box
                                sx={{ aspectRatio: 1 }}
                                boxSize="150px"
                                onClick={() =>
                                  Router.push('/p/[id]', `/p/${post.id}`)
                                }
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
                                  boxSize="150px"
                                />
                              </Box>
                              <Box w="100%">
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
                                    onClick={() =>
                                      Router.push(
                                        '/auth/[authorId]',
                                        `/auth/${post.authorId}`
                                      )
                                    }
                                  >
                                    <Text
                                      fontSize="sm"
                                      sx={{ transform: 'translateX(-8px)' }}
                                    >
                                      <Center justifyContent="left" mx="2">
                                        <Image
                                          display="inline"
                                          border="2px inset  gray"
                                          src={post.author.image}
                                          alt={post.author.name}
                                          fallbackSrc="https://picsum.photos/200"
                                          boxSize="1.5rem"
                                          borderRadius="full"
                                          mr="1"
                                        />
                                        <b> {post.author.name}</b>,{' '}
                                        {moment(post.createdAt).fromNow()}
                                      </Center>
                                    </Text>
                                  </Box>
                                </motion.div>
                                <Box
                                  onClick={() =>
                                    Router.push('/p/[id]', `/p/${post.id}`)
                                  }
                                >
                                  <Text fontSize="xl" noOfLines={1}>
                                    {post.title} - {post.content}
                                  </Text>
                                </Box>
                                {/* audio */}
                                <Box>
                                  insert audio play here
                                  {/* <WaveSurferComponent url={post.fileUrl} /> */}
                                  {/* <audio
                                    preload="none"
                                    controls
                                    src={post.fileUrl}
                                  >
                                    Your browser does not support the
                                    <code>audio</code> element.
                                  </audio> */}
                                </Box>
                              </Box>
                            </Stack>
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
                    onClick={handleMore}
                    boxShadow="md"
                  >
                    <Text fontSize="sm">
                      {isLoading ? 'Loading..' : 'Load More'}
                    </Text>
                  </Button>
                </Center>
              </Box>

              {/* right column */}
              <Feature props={props} />
            </Stack>
          </Box>
        </Media>

        {/* mobile */}
        {/* left column */}
        <Media lessThan="md">
          <Box>
            <Stack mx="2" mb="4">
              <Box mt="4" mb="8" boxShadow="md">
                <Box>
                  <Feature props={props} />
                </Box>
              </Box>
              {/* right column */}
              <Box w="100%" borderRadius="xl" mb="2" pb="2" boxShadow="md">
                <section>
                  {feed.map((post) => (
                    <Box
                      p="1"
                      borderRadius="xl"
                      border="2px solid gray"
                      mb="2"
                      key={post.id}
                      boxShadow="md"
                    >
                      <Box
                        onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}
                        my="4"
                      >
                        <Text fontSize="3xl" noOfLines={1}>
                          <b>{post.title}</b>
                        </Text>
                        <Divider my="2" />
                        <Box mx="1">
                          {post.imageUrl && <ImageComponent props={post} />}
                        </Box>
                        <Text fontSize="md" noOfLines={3} mx="1">
                          {post.content}
                        </Text>
                      </Box>

                      {/* info */}
                      <Box
                        mt="4"
                        mb="2"
                        mx="1"
                        p="1"
                        boxShadow="md"
                        border="2px solid gray"
                        borderRadius="xl"
                      >
                        <Text
                          fontSize="sm"
                          sx={{ transform: 'translateX(-8px)' }}
                        >
                          <Center justifyContent="left" mx="2">
                            <Image
                              mr="2"
                              display="inline"
                              border="2px inset  gray"
                              src={post.author.image}
                              fallbackSrc="https://picsum.photos/200"
                              boxSize="1.5rem"
                              borderRadius="full"
                              alt={post.author.name}
                            />
                            <b>{post.author.name}</b>,{' '}
                            {moment(post.createdAt).fromNow()}
                          </Center>
                        </Text>
                      </Box>
                    </Box>
                  ))}
                </section>
              </Box>
            </Stack>
          </Box>
        </Media>

        {/* mobile */}
        {/* left column */}
        <Media lessThan="md">
          <Stack mx="2" mb="4">
            <Box mt="4" mb="8" boxShadow="md">
              <Box>
                <Feature props={props} />
              </Box>
            </Box>
            {/* right column */}
            <Box w="100%" borderRadius="xl" mb="2" pb="2" boxShadow="md">
              <section>
                {feed.map((post) => (
                  <Box
                    p="1"
                    borderRadius="xl"
                    border="2px solid gray"
                    mb="2"
                    key={post.id}
                    boxShadow="md"
                  >
                    <Box
                      onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}
                      my="4"
                    >
                      <Text fontSize="xl" noOfLines={1}>
                        <b>{post.title}</b>
                      </Text>
                      <Divider my="2" />
                      <Box mx="1">
                        {post.imageUrl && <ImageComponent props={post} />}
                      </Box>
                      <Text fontSize="md" noOfLines={3} mx="1">
                        {post.content}
                      </Text>
                      {/* info */}
                      <Box
                        mt="4"
                        mb="-1"
                        mx="1"
                        p="1"
                        boxShadow="md"
                        border="2px solid gray"
                        borderRadius="xl"
                      >
                        <Text
                          fontSize="sm"
                          sx={{ transform: 'translateX(-8px)' }}
                        >
                          <Center justifyContent="left" mx="2">
                            <Image
                              mr="2"
                              display="inline"
                              border="2px inset  gray"
                              src={post.author.image}
                              fallbackSrc="https://picsum.photos/200"
                              boxSize="1.5rem"
                              borderRadius="full"
                              alt={post.author.name}
                            />
                            <b>{post.author.name}</b>,{' '}
                            {moment(post.createdAt).fromNow()}
                          </Center>
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </section>
            </Box>
          </Stack>
        </Media>
      </Layout>
    </>
  )
}

export default Main
