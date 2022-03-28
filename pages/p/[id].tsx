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
  Image,
  useColorMode,
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
        select: { name: true, email: true, image: true },
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
  const { colorMode } = useColorMode()

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

  // @ts-ignore
  const myPost = props.myPost[0].author.posts

  return (
    // FIXME layout navbar weirdly Y translated..?
    <Layout>
      <Stack direction={['column', 'row']} w="100%" pr="2" mt="2">
        {/* left column */}
        <Box>
          <Stack w="75vw">
            <Box
              p="4"
              ml="2"
              mb="2"
              bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
              borderRadius="xl"
              boxShadow="md"
            >
              <Text mb="2" fontSize="3xl">
                {props.post.title}
              </Text>
              <Box>
                <Text
                  fontSize="lg"
                  children={<Text>{props.post.content}</Text>}
                />
              </Box>
              <Box
                _hover={{ cursor: 'pointer' }}
                onClick={() =>
                  Router.push(
                    '/auth/[authorId]',
                    `/auth/${props.post.authorId}`
                  )
                }
              >
                <Text my="2" fontSize="md" textAlign="right">
                  Posted by{' '}
                  <Image
                    mx="1"
                    display="inline"
                    border="1px inset  gray"
                    src={props.post.author.image}
                    fallbackSrc="https://picsum.photos/400"
                    boxSize="1.5rem"
                    borderRadius="full"
                    alt={props.post.author.name}
                    sx={{ transform: 'translateY(5px)' }}
                  />{' '}
                  {props.post.author.name || 'Unknown author'} on{' '}
                  <i>
                    {new Date(props.post.createdAt).toLocaleDateString(
                      'en-DE',
                      {
                        hour: '2-digit',
                        minute: '2-digit',
                      }
                    )}
                  </i>
                </Text>
              </Box>
              <Divider mb="2" />
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
              <Divider mb="4" />
              {/* button */}
              <HStack spacing={2}>
                {!props.post.published &&
                  userHasValidSession &&
                  postBelongsToUser && (
                    <Button
                      size="sm"
                      onClick={() => publishPost(props.post.id)}
                    >
                      Publish
                    </Button>
                  )}

                {userHasValidSession && postBelongsToUser && (
                  <Button
                    colorScheme="blackAlpha"
                    size="sm"
                    onClick={() => deletePost(props.post.id)}
                  >
                    Delete
                  </Button>
                )}
              </HStack>
            </Box>
          </Stack>
        </Box>
        {/* right column */}
        <Box
          w="25vw"
          p="4"
          ml="2"
          mb="2"
          bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
          borderRadius="xl"
          boxShadow="md"
        >
          
        </Box>
      </Stack>
      <Box mx="2">
        <Box borderRadius="md" border="2px solid gray" mt="2">
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
    </Layout>
  )
}

export default Post
