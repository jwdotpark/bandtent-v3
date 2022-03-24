import React, { useEffect, useState, useCallback } from 'react'
import prisma from '../lib/prisma'
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import PostProps from '../types/Post'
import { ColorModeScript } from '@chakra-ui/react'
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
} from '@chakra-ui/react'
import { Media } from '../utils/media'
import Router from 'next/router'
import Feature from '../components/Feature'
import ImageComponent from '../components/utils/ImageComponent'
import moment from 'moment'

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true, image: true },
      },
    },
    // skip: 4,
    take: 6,
    orderBy: { id: 'desc' },
  })
  return {
    // https://github.com/vercel/next.js/issues/11993
    props: {
      feed: JSON.parse(JSON.stringify(feed)),
    },
  }
}

type Props = {
  feed: PostProps[]
}

const Main: React.FC<Props> = (props) => {
  const { colorMode, toggleColorMode } = useColorMode()

  // pagination load more callback
  const [feed, setFeed] = useState(props.feed)
  const [, updateState] = useState()

  // @ts-ignore
  const forceUpdate = useCallback(() => updateState({}), [])

  const handleMore = () => {
    fetch('/api/post/loadmore')
      .then((response) => response.json())
      .then((data) => {
        // currently it does shallow copy and force rerender
        // it needs to be deep copy to feed
        props.feed.push(...data)
        setFeed(props.feed)
        console.log(feed)
      })
    // FIXME rerender trigger is very fish
    forceUpdate()
  }

  useEffect(() => {
    setFeed(props.feed)
  })

  return (
    <>
      <Layout>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />

        {/* desktop */}
        <Media greaterThanOrEqual="md">
          <Box m="2" boxShadow="md">
            <Stack direction={['column', 'row']} w="100%">
              {/* left column */}
              <Box
                w="40vw"
                border="2px solid gray"
                borderRadius="md"
                boxShadow="md"
              >
                <section>
                  {feed.map((post) => (
                    <Box
                      bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
                      borderRadius="md"
                      border="2px solid gray"
                      p="4"
                      m="4"
                      key={post.id}
                      boxShadow="md"
                    >
                      <Box
                        onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}
                      >
                        <Text fontSize="3xl" noOfLines={1}>
                          <b>
                            {post.id}. {post.title}
                          </b>
                        </Text>

                        <Divider mb="4" />
                        {/* cover */}
                        <Box>
                          <ImageComponent props={post} />
                        </Box>
                        {/* audio */}
                        {/* <audio controls src={post.fileUrl}>
                        Your browser does not support the
                        <code>audio</code> element.
                      </audio> */}
                        <Text fontSize="lg" noOfLines={3} mx="2">
                          {post.content}
                        </Text>
                      </Box>
                      {/* info */}
                      <Box
                        mt="4"
                        mb="-1"
                        mx="1"
                        p="1"
                        boxShadow="md"
                        border="2px solid gray"
                        borderRadius="md"
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
                              // alt={post.author.name}
                            />
                            <b>{post.author.name}</b>,{' '}
                            {moment(post.createdAt).fromNow()}
                          </Center>
                        </Text>
                      </Box>
                    </Box>
                  ))}
                </section>
                <Center my="4">
                  <Button mx="4" w="100%" size="sm" onClick={handleMore}>
                    Load More
                  </Button>
                </Center>
              </Box>

              {/* right column */}
              <Box w="60vw" m="2" borderRadius="md" border="2px solid gray">
                <Box m="2" p="2">
                  <Feature props={props} />
                </Box>
              </Box>
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
                      borderRadius="md"
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
                        borderRadius="md"
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
                    borderRadius="md"
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
                        borderRadius="md"
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
                              // alt={post.author.name}
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
