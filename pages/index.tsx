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
        <Box m="2">
          <Stack direction={['column', 'row']} w="100%">
            {/* left column */}
            <Box w="40vw" border="1px solid gray" borderRadius="md">
              <section>
                {props.feed.map((post) => (
                  <Box
                    borderRadius="md"
                    border="1px solid gray"
                    p="4"
                    m="4"
                    key={post.id}
                    className="post"
                  >
                    {/* <Post post={post} /> */}
                    <Box
                      onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}
                    >
                      <Text fontSize="3xl" noOfLines={1}>
                        <b>{post.title}</b>
                      </Text>
                      <Text fontSize="sm">
                        <i>{post.author.name}</i>
                      </Text>
                      {/* <Text fontSize="sm">
                        {new Date(post.createdAt).toLocaleDateString('en-DE', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Text> */}
                      <Divider my="2" />
                      {post.imageUrl && <ImageComponent props={post} />}
                      <Text fontSize="lg" noOfLines={3}>
                        {post.content}
                      </Text>
                    </Box>
                  </Box>
                ))}
              </section>
            </Box>

            {/* right column */}
            <Box w="60vw" m="2" borderRadius="md" border="1px solid gray">
              <Box m="4" p="2">
                <Feature props={props} />
              </Box>
            </Box>
          </Stack>
        </Box>
      </Media>

      {/* mobile */}
      {/* left column */}
      <Media lessThan="md">
        <Stack mx="2">
          <Box borderRadius="md" border="1px solid gray" p="2" m="1" my="4">
            <Box m="2">
              <Feature props={props} />
            </Box>
          </Box>
          <Box w="100%">
            <section>
              {props.feed.map((post) => (
                <Box
                  p="2"
                  m="1"
                  borderRadius="md"
                  border="1px solid gray"
                  mb="2"
                  key={post.id}
                  className="post"
                >
                  {/* <Post post={post} /> */}
                  <Box onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}>
                    <Text fontSize="xl" noOfLines={1}>
                      <b>{post.title}</b>
                    </Text>
                    <Text mb="2" fontSize="sm">
                      <i>{post.author.name}</i>
                    </Text>
                    <Divider my="2" />
                    {post.imageUrl && <ImageComponent props={post} />}
                    <Text fontSize="md" noOfLines={3}>
                      {post.content}
                    </Text>
                  </Box>
                </Box>
              ))}
            </section>
          </Box>
          {/* right column */}
        </Stack>
      </Media>
    </Layout>
  )
}

export default Main
