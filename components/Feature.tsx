import { Divider, Box, Text } from '@chakra-ui/react'
import Router from 'next/router'
import { Key, ReactChild, ReactFragment, ReactPortal } from 'react'
import ImageComponent from './utils/ImageComponent'
import moment from 'moment'

const Feature = (props: {
  props: {
    feed: {
      id: Key
      title: string
      author: { name: string }
      content: string
      imageUrl: string
      createdAt: Date
    }[]
  }
}) => {
  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max)
  }
  const numOfPost = props.props.feed.length
  const randomPostNum = getRandomInt(numOfPost)

  return (
    <Box boxShadow="md">
      <Box border="2px solid gray" borderRadius="md" mb="2" boxShadow="md">
        <Text m="2" fontSize="3xl" as="kbd">
          {props.props.feed.length} article uploaded
        </Text>
      </Box>
      {props.props.feed.map(
        (
          post: {
            id: Key
            title: string
            author: { name: string }
            content: string
            imageUrl: string
            createdAt: Date
          },
          index: number
        ) => (
          <Box key={post.id}>
            {index === 3 && (
              <Box
                onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}
                border="2px solid gray"
                borderRadius="md"
                p="2"
              >
                <Text textAlign="right">
                  <i>FEATURE</i>
                </Text>
                <Text ml="2" fontSize="3xl" noOfLines={3} textAlign="left">
                  <b>{post.title}</b>
                </Text>
                <Divider mb="4" />
                <Box m="2">
                  {post.imageUrl && <ImageComponent props={post} />}
                </Box>
                <Text fontSize="md" noOfLines={1000} mx="4">
                  {post.content}
                </Text>
              </Box>
            )}
          </Box>
        )
      )}
    </Box>
  )
}

export default Feature
