import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { Box, Button, Text, Divider } from '@chakra-ui/react'
import Router from 'next/router'
import ReactMarkdown from 'react-markdown'
import { getSession } from 'next-auth/react'

const MyPost = () => {
  const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json())
  const { data, error } = useSWR('/api/post/mypost', fetcher)

  return (
    <>
      <Box>
        <Text fontSize="3xl" my="4">
          My Post
        </Text>
        {!error &&
          data?.posts.reverse().map((post) => {
            return (
              <Box
                borderRadius="md"
                border="1px solid gray"
                p="2"
                mb="2"
                key={post.id}
              >
                <Box
                  onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}
                  _hover={{ cursor: 'pointer' }}
                >
                  <Text fontSize="xl" noOfLines={3}>
                    {post.title}
                  </Text>
                  <Divider my="2" />
                  <Text fontSize="md" noOfLines={3}>
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                  </Text>
                </Box>
              </Box>
            )
          })}
        {error && <Text>failed to load</Text>}
      </Box>
    </>
  )
}

export default MyPost
