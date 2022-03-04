// pages/p/[id].tsx

import React from 'react'
import { GetServerSideProps } from 'next'
import ReactMarkdown from 'react-markdown'
import Router from 'next/router'
import Layout from '../../components/Layout'
import { PostProps } from '../../components/Post'
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
    props: post,
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
          {title}
        </Text>
        <Text my="2" fontSize="sm">
          {props?.author?.name || 'Unknown author'}
        </Text>
        <Divider my="2" />
        <Text
          my="4"
          fontSize="lg"
          children={
            <Text>
              <ReactMarkdown>{props.content}</ReactMarkdown>
            </Text>
          }
        />
        <Divider my="2" />

        {/* button */}
        <HStack spacing={2}>
          {!props.published && userHasValidSession && postBelongsToUser && (
            <Button size="sm" onClick={() => publishPost(props.id)}>
              Publish
            </Button>
          )}
          {userHasValidSession && postBelongsToUser && (
            <Button size="sm" onClick={() => deletePost(props.id)}>
              Delete
            </Button>
          )}
        </HStack>
      </Box>
    </Layout>
  )
}

export default Post
