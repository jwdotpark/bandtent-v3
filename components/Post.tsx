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
  // console.log(post)
  return (
    <Box onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}>
      <Text fontSize="3xl">{post.title}</Text>
      <Text fontSize="sm">By {authorName}</Text>
      <Text fontSize="lg" children={post.content} />
    </Box>
  )
}

export default Post
