import React from 'react'
import { GetServerSideProps } from 'next'
import { useSession, getSession } from 'next-auth/react'
import Layout from '../components/Layout'
import PostProps from '../types/Post'
import prisma from '../lib/prisma'
import { Box, Text, Divider, Image, useColorMode } from '@chakra-ui/react'
import Router from 'next/router'
import ImageComponent from '../components/utils/ImageComponent'
import moment from 'moment'
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })
  if (!session) {
    res.statusCode = 403
    return { props: { drafts: [] } }
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session.user.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  })
  return {
    props: {
      drafts: JSON.parse(JSON.stringify(drafts)),
    },
  }
}

type Props = {
  drafts: PostProps[]
}

const Drafts: React.FC<Props> = (props) => {
  const { colorMode } = useColorMode()
  const { data: session } = useSession()

  if (!session) {
    return (
      <Layout>
        <Text fontSize="3xl">My Drafts</Text>
        <Text fontSize="lg">
          You need to be authenticated to view this page.
        </Text>
      </Layout>
    )
  }

  return (
    <Layout>
      <Box m="2">
        <Box>
          <Text>Unpublished</Text>
        </Box>
        <Box
          p="2"
          w="100%"
          mx="auto"
          sx={{ columnCount: [1, 2, 3], columnGap: '4' }}
        >
          {props.drafts.map((post) => (
            <Box
              bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
              p="2"
              my="2"
              // border="2px solid gray"
              borderRadius="xl"
              key={post.id}
              mb="4"
              w="100%"
              display="inline-block"
            >
              {/* <Post post={post} /> */}
              <Box
                onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}
                p="2"
              >
                <Text fontSize="3xl" noOfLines={3}>
                  {post.title}
                </Text>
                <Text mb="2" fontSize="lg" noOfLines={5}>
                  {post.content}
                </Text>
                <Divider my="2" />
                {post.imageUrl && <ImageComponent props={post} />}
                <Text textAlign="right" mr="2" fontSize="sm">
                  {moment(post.createdAt).fromNow()}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Layout>
  )
}

export default Drafts
