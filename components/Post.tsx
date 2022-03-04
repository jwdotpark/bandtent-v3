import React from 'react'
import Router from 'next/router'
import ReactMarkdown from 'react-markdown'
import { Box, Text } from '@chakra-ui/react'

export type PostProps = {
  id: number
  title: string
  author: {
    name: string
    email: string
  } | null
  content: string
  published: boolean
}

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : 'Unknown'
  return (
    <Box onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}>
      <Text fontSize="xl">{post.title}</Text>
      <Text fontSize="lg">By {authorName}</Text>
      <Text fontSize="md" children={post.content} />
    </Box>
  )
}

export default Post
