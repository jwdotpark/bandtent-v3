import React from 'react'
import Router from 'next/router'
import ReactMarkdown from 'react-markdown'
// import remarkGfm from 'remark-gfm'
import { Box, Text } from '@chakra-ui/react'

export type PostProps = {
  id: number
  title: string
  author: {
    name: string
    email: string
    description: string
    location: string
    website: string
  } | null
  content: string
  published: boolean
}

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : 'Unknown'
  return (
    <Box onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}>
      <Text fontSize="3xl">{post.title}</Text>
      <Text fontSize="sm">{authorName}</Text>
      <Text fontSize="lg">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </Text>
    </Box>
  )
}

export default Post
