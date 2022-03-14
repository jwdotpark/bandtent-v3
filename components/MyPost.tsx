import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { Box, Button, Text, Divider } from '@chakra-ui/react'
import Router from 'next/router'
import ReactMarkdown from 'react-markdown'

const MyPost = () => {
  const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json())
  const { data, error } = useSWR('/api/post/mypost', fetcher)
  console.log(data)
  return (
    <>
      <Box maxW="57vw">
        <Text fontSize="3xl" my="4">
          My Post
        </Text>
        {data?.posts.map((post) => {
          return (
            <Box
              borderRadius="md"
              border="1px solid gray"
              p="2"
              mb="2"
              // m="2"
              key={post.id}
            >
              <Box onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}>
                <Text fontSize="xl" noOfLines={3}>
                  {post.title}
                </Text>
                {/* <Text fontSize="sm">{post.author.name}</Text> */}
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
