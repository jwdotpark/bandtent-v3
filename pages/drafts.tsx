import React from 'react'
import { GetServerSideProps } from 'next'
import { useSession, getSession } from 'next-auth/react'
import Layout from '../components/Layout'
import PostProps from '../types/Post'
import prisma from '../lib/prisma'
import { Box, Text, Divider, Image } from '@chakra-ui/react'
import Router from 'next/router'
import ImageComponent from '../components/ImageComponent'
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
        <Box fontSize="3xl">
          <Text>Unpublished</Text>
        </Box>
        <Box>
          {props.drafts.map((post) => (
            <Box
              p="2"
              my="2"
              border="1px solid gray"
              borderRadius="md"
              key={post.id}
              className="post"
            >
              {/* <Post post={post} /> */}
              <Box onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}>
                <Text fontSize="sm">
                  <i>{moment(post.createdAt).fromNow()}</i>
                </Text>
                <Text fontSize="3xl" noOfLines={3}>
                  {post.title}
                </Text>
                <Divider my="2" />
                {post.imageUrl && <ImageComponent props={post} />}
                <Text mb="2" fontSize="lg" noOfLines={5}>
                  {post.content}
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
