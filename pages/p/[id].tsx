// pages/p/[id].tsx

import React from 'react'
import { GetServerSideProps } from 'next'
import ReactMarkdown from 'react-markdown'
import Router from 'next/router'
import Layout from '../../components/Layout'
// import { PostProps } from '../../components/Post'
import PostProps from '../../types/Post'
import { useSession } from 'next-auth/react'
import prisma from '../../lib/prisma'
import { Box, Button, Text, HStack, Divider } from '@chakra-ui/react'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  })
  return {
    props: {
      // post,
      post: JSON.parse(JSON.stringify(post)),
    },
  }
}

async function publishPost(id: number): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: 'PUT',
  })
  await Router.push('/')
}

async function deletePost(id: number): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  })
  Router.push('/')
}

const Post: React.FC<PostProps> = (props) => {
  const { data: session, status } = useSession()
  if (status === 'loading') {
    return <div>Authenticating ...</div>
  }
  const userHasValidSession = Boolean(session)
  const postBelongsToUser = session?.user?.email === props.author?.email
  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }

  return (
    <Layout>
      <Box p="4" m="2" mx="2" border="1px solid gray" borderRadius="md">
        <Text my="2" fontSize="3xl">
          {props.post.title}
        </Text>
        <Text my="2" fontSize="sm">
          {props.post.author?.name || 'Unknown author'}
        </Text>
        <Divider my="2" />
        <Box>
          <Text
            my="4"
            fontSize="lg"
            children={
              <Text>
                <ReactMarkdown>{props.post.content}</ReactMarkdown>
              </Text>
            }
          />
        </Box>
        <Divider my="2" />

        {/* button */}
        <HStack spacing={2}>
          <Button size="sm" onClick={() => publishPost(props.post.id)}>
            Publish
          </Button>

          {/* {!props.post.published && userHasValidSession && postBelongsToUser && (
            <Button size="sm" onClick={() => publishPost(props.post.id)}>
              Publish
            </Button>
          )} */}

          <Button size="sm" onClick={() => deletePost(props.post.id)}>
            Delete
          </Button>

          {/* {userHasValidSession && postBelongsToUser && (
            <Button size="sm" onClick={() => deletePost(props.post.id)}>
              Delete
            </Button>
          )} */}
        </HStack>
      </Box>
    </Layout>
  )
}

export default Post
