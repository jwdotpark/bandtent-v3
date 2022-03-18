import React from 'react'
import Router from 'next/router'
import { Box, Text } from '@chakra-ui/react'
import PostProps from '../types/Post'

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : 'Unknown'
  return (
    <Box onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}>
      <Text fontSize="3xl">{post.title}</Text>
      <Text fontSize="sm">{authorName}</Text>
      <Text fontSize="lg">{post.content}</Text>
    </Box>
  )
}

export default Post
