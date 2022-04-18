/* eslint-disable react/no-children-prop */
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
  Stack,
  Center,
  Image,
  useColorMode,
  ButtonGroup,
  Spinner,
} from '@chakra-ui/react'
import ImageComponent from '../../components/utils/ImageComponent'
import AdditionalPost from '../../components/AdditionalPost'
import Comment from '../../components/post/Comment'
import { DeleteIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useAtom } from 'jotai'
import musicAtom from '../../store/store'

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
    method: 'POST',
  })
  Router.push('/p/[id]', `/p/${id}`)
}

async function unpublishPost(id: number): Promise<void> {
  await fetch(`/api/publish/unpublish/${id}`, {
    method: 'POST',
  })
  Router.push('/p/[id]', `/p/${id}`)
}

async function deletePost(id: number): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  })
  Router.push('/')
}

const Post: React.FC<PostProps> = (props) => {
  const { colorMode } = useColorMode()
  const [, setSelectMusic] = useAtom(musicAtom)

  const { data: session, status } = useSession()
  if (status === 'loading') {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    )
  }
  const userHasValidSession = Boolean(session)
  const postBelongsToUser = session?.user?.email === props.post.author?.email

  // @ts-ignore
  const myPost = props.myPost[0].author.posts

  const handleMusic = (music: any) => {
    setSelectMusic(music)
  }

  return (
    <Layout>
      <Stack direction={['column', 'row']} w="100%" pr="2" mt="2" h="100%">
        {/* left column */}
        <Box>
          <Stack w="50vw">
            <Box
              p="4"
              ml="2"
              bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
              borderRadius="xl"
              boxShadow="md"
            >
              <Box
                borderRadius="xl"
                boxShadow="md"
                p="4"
                bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
              >
                <Box
                  borderRadius="xl"
                  boxShadow="md"
                  p="4"
                  bg={colorMode === 'light' ? 'gray.400' : 'gray.600'}
                  mb="4"
                >
                  <Box>
                    <Text mb="2" fontSize="3xl">
                      {props.post.title}
                    </Text>
                    <Text
                      fontSize="3xl"
                      children={<Text>{props.post.content}</Text>}
                    />
                    <Box
                      _hover={{ cursor: 'pointer' }}
                      onClick={() =>
                        Router.push(
                          '/auth/[authorId]',
                          `/auth/${props.post.authorId}`
                        )
                      }
                    >
                      <Text my="2" fontSize="md">
                        <Image
                          // mx="1"
                          display="inline"
                          border="1px inset  gray"
                          src={props.post.author!.image}
                          fallbackSrc="https://picsum.photos/400"
                          boxSize="1.5rem"
                          borderRadius="full"
                          alt={props.post.author!.name}
                          sx={{ transform: 'translateY(5px)' }}
                        />{' '}
                        Post by {props.post.author!.name || 'Unknown author'} on{' '}
                        {new Date(props.post.createdAt).toLocaleDateString(
                          'en-DE',
                          {
                            hour: '2-digit',
                            minute: '2-digit',
                          }
                        )}
                      </Text>
                    </Box>
                  </Box>
                </Box>
                <Box
                  borderRadius="xl"
                  // boxShadow="md"
                  p="2"
                  bg={colorMode === 'light' ? 'gray.400' : 'gray.600'}
                >
                  {/* image */}
                  <Box
                    p="2"
                    onClick={() => {
                      handleMusic(props.post)
                    }}
                  >
                    <ImageComponent props={props.post} />
                  </Box>
                  {/* button */}
                  <Box p="2">
                    <Center w="100%">
                      <ButtonGroup
                        w="100%"
                        isAttached
                        size="xs"
                        boxShadow="md"
                        overflow="clip"
                      >
                        {!props.post.published &&
                          userHasValidSession &&
                          postBelongsToUser && (
                            <Button
                              w="80%"
                              size="sm"
                              colorScheme="green"
                              onClick={() => publishPost(props.post.id)}
                              leftIcon={<ViewIcon />}
                            >
                              Publish
                            </Button>
                          )}
                        {props.post.published &&
                          userHasValidSession &&
                          postBelongsToUser && (
                            <Button
                              w="80%"
                              boxShadow="md"
                              colorScheme="yellow"
                              size="sm"
                              onClick={() => unpublishPost(props.post.id)}
                              leftIcon={<ViewOffIcon />}
                            >
                              Unpublish
                            </Button>
                          )}

                        {userHasValidSession && postBelongsToUser && (
                          <Button
                            w="20%"
                            boxShadow="md"
                            colorScheme="red"
                            size="sm"
                            onClick={() => deletePost(props.post.id)}
                            leftIcon={<DeleteIcon />}
                          >
                            Delete
                          </Button>
                        )}
                      </ButtonGroup>
                    </Center>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Box>
        {/* right column */}
        <Box
          w="100%"
          p="4"
          ml="2"
          mb="2"
          bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
          borderRadius="xl"
          boxShadow="md"
        >
          <Comment props={props} />
        </Box>
      </Stack>
      <Box
        borderRadius="xl"
        border={
          colorMode === 'light' ? 'solid 1px #edf2f7' : 'solid 1px #4a5568'
        }
        bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
        mx="2"
        mt="2"
      >
        <Box p="2">
          {myPost.length > 0 && (
            <Box mx="2" mt="2">
              <Box
                boxShadow="md"
                borderRadius="xl"
                p="2"
                my="2"
                bg={colorMode === 'light' ? 'gray.400' : 'gray.700'}
              >
                <Text size="xl" mx="2">
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  {props.post.author!.name}'s {myPost.length} more posts{' '}
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
