import React from 'react'
import prisma from '../lib/prisma'
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import Post, { PostProps } from '../components/Post'
import { ColorModeScript } from '@chakra-ui/react'
import theme from '../utils/theme'
import { Box, Text } from '@chakra-ui/react'

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
      <Box m="2">
        <Text>Public Feed</Text>
        <main>
          {props.feed.map((post) => (
            <Box mt="4" key={post.id} className="post">
              <Post post={post} />
            </Box>
          ))}
        </main>
      </Box>
    </Layout>
  )
}

export default Blog
