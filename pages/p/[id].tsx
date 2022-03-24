// @ts-nocheck
// FIXME

// pages/p/[id].tsx

import React from 'react'
import { GetServerSideProps } from 'next'
import Router from 'next/router'
import Layout from '../../components/Layout'
import PostProps from '../../types/Post'
import { useSession } from 'next-auth/react'
import prisma from '../../lib/prisma'
import {
  Box,
  Button,
  Text,
  HStack,
  Divider,
  Stack,
  Center,
} from '@chakra-ui/react'
import ImageComponent from '../../components/utils/ImageComponent'
import AdditionalPost from '../../components/AdditionalPost'

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
  const myPost = await prisma.post.findMany({
    where: {
      id: Number(params?.id),
    },
    select: {
      author: {
        select: {
          posts: true,
        },
      },
    },
  })
  return {
    props: {
      // post,
      post: JSON.parse(JSON.stringify(post)),
      myPost: JSON.parse(JSON.stringify(myPost)),
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
  const postBelongsToUser = session?.user?.email === props.post.author?.email
  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }

  const myPost = props.myPost[0].author.posts

  return (
    <Layout>
      {/* <Text fontSize="6xl" ml="2">
        Posted by <b>{props.post.author.name}</b>
      </Text> */}
      <Stack w="100%">
        <Box
          p="4"
          m="2"
          mx="2"
          border="2px solid gray"
          borderRadius="md"
          boxShadow="md"
          // w="60%"
        >
          <Text my="2" fontSize="3xl">
            {props.post.title}
          </Text>
          <Text my="2" fontSize="sm">
            Posted by {props.post.author.name || 'Unknown author'} on{' '}
            <i>
              {new Date(props.post.createdAt).toLocaleDateString('en-DE', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </i>
          </Text>

          <Divider mb="4" />
          {/* {props.post.imageUrl && <ImageComponent props={props.post} />} */}
          <Box>
            <ImageComponent props={props.post} />
          </Box>
          {/* audio */}
          {props.post.fileUrl && (
            <Box>
              <audio controls src={props.post.fileUrl}>
                Your browser does not support the
                <code>audio</code> element.
              </audio>
            </Box>
          )}

          <Box>
            <Text
              my="4"
              mx="2"
              fontSize="lg"
              children={<Text>{props.post.content}</Text>}
            />
          </Box>
          <Divider mb="4" />

          {/* button */}
          <HStack spacing={2}>
            {!props.post.published && userHasValidSession && postBelongsToUser && (
              <Button size="sm" onClick={() => publishPost(props.post.id)}>
                Publish
              </Button>
            )}

            {userHasValidSession && postBelongsToUser && (
              <Button size="sm" onClick={() => deletePost(props.post.id)}>
                Delete
              </Button>
            )}
          </HStack>
        </Box>

        <Box mx="2">
          <Box borderRadius="md" border="2px solid gray" mx="2">
            {myPost.length > 0 && (
              <Box mx="2" boxShadow="md">
                <Box
                  border="2px solid gray"
                  borderRadius="md"
                  p="2"
                  mt="4"
                  mb="2"
                >
                  <Text size="xl">
                    {props.post.author.name}'s {myPost.length} more posts{' '}
                  </Text>
                </Box>
              </Box>
            )}
            <AdditionalPost myPost={myPost} />
          </Box>
        </Box>
      </Stack>
    </Layout>
  )
}

export default Post
