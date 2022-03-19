import React from 'react'
import prisma from '../lib/prisma'
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import PostProps from '../types/Post'
import { ColorModeScript } from '@chakra-ui/react'
import theme from '../utils/theme'
import { Divider, Box, Text, Stack } from '@chakra-ui/react'
import { Media } from '../utils/media'
import Router from 'next/router'
import Feature from '../components/Feature'
import ImageComponent from '../components/ImageComponent'
import moment from 'moment'

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
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
  return (
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
                {props.feed.map((post) => (
                  <Box
                    borderRadius="md"
                    border="2px solid gray"
                    p="4"
                    m="4"
                    key={post.id}
                    boxShadow="md"
                  >
                    {/* <Post post={post} /> */}
                    <Box
                      onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}
                    >
                      <Box>
                        <Text fontSize="sm">
                          Posted by <b>{post.author.name}</b>{' '}
                          <i>{moment(post.createdAt).fromNow()}</i>
                        </Text>
                      </Box>
                      <Text fontSize="3xl" noOfLines={1}>
                        <b>{post.title}</b>
                      </Text>

                      <Divider mb="4" />
                      {post.imageUrl && <ImageComponent props={post} />}
                      <Text fontSize="lg" noOfLines={3} mx="2">
                        {post.content}
                      </Text>
                    </Box>
                  </Box>
                ))}
              </section>
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
        <Stack mx="2" mb="4">
          <Box mt="4" mb="8" boxShadow="md">
            <Box>
              <Feature props={props} />
            </Box>
          </Box>
          {/* right column */}
          <Box w="100%" borderRadius="xl" mb="2" pb="2" boxShadow="md">
            <section>
              {props.feed.map((post) => (
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
                    <Text fontSize="sm">
                      Posted by <b>{post.author.name}</b>{' '}
                      <i>{moment(post.createdAt).fromNow()}</i>
                    </Text>
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
                  </Box>
                </Box>
              ))}
            </section>
          </Box>
        </Stack>
      </Media>
    </Layout>
  )
}

export default Main
