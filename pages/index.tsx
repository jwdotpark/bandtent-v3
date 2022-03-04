import React from 'react'
import prisma from '../lib/prisma'
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import Post, { PostProps } from '../components/Post'
import { ColorModeScript } from '@chakra-ui/react'
import theme from '../utils/theme'
import { Box, Text, Stack } from '@chakra-ui/react'
import { Media } from '../utils/media'
import Router from 'next/router'

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  })
  return { props: { feed } }
}

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />

      {/* desktop */}

      <Media greaterThanOrEqual="md">
        <Box m="2">
          <Text ml="2" fontSize="3xl">
            Desktop
          </Text>
          <Stack direction={['column', 'row']} w="100%">
            {/* left column */}
            <Box w="40vw" border="1px solid gray" borderRadius="md">
              <section>
                {props.feed.reverse().map((post, index) => (
                  <Box
                    borderRadius="md"
                    border="1px solid gray"
                    p="2"
                    m="2"
                    key={post.id}
                    className="post"
                  >
                    {/* <Post post={post} /> */}
                    <Box
                      onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}
                    >
                      <Text fontSize="3xl">
                        {index + 1}. {post.title}
                      </Text>
                      <Text fontSize="sm">By {post.author.name}</Text>
                      <Text fontSize="lg" children={post.content} />
                    </Box>
                  </Box>
                ))}
              </section>
            </Box>

            {/* right column */}
            <Box w="60vw" m="2" borderRadius="md" border="1px solid gray">
              <Box m="2">some other content</Box>
            </Box>
          </Stack>
        </Box>
      </Media>

      {/* mobile */}
      {/* left column */}
      <Media lessThan="md">
        <Stack mx="2">
          <Text fontSize="xl">Mobile</Text>
          <Box borderRadius="md" border="1px solid gray" m="2">
            <Box m="2">some other content</Box>
          </Box>
          <Box w="100%">
            <section>
              {props.feed.map((post, index) => (
                <Box
                  p="2"
                  borderRadius="md"
                  border="1px solid gray"
                  mb="2"
                  key={post.id}
                  className="post"
                >
                  {/* <Post post={post} /> */}
                  <Box onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}>
                    <Text fontSize="3xl">
                      {index + 1}. {post.title}
                    </Text>
                    <Text fontSize="sm">By {post.author.name}</Text>
                    <Text fontSize="lg" children={post.content} />
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

export default Blog
