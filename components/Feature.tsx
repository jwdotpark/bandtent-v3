import { Divider, Box, Text } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import Router from 'next/router'
import { Key, ReactChild, ReactFragment, ReactPortal } from 'react'

const Feature = (props) => {
  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max)
  }
  const numOfPost = props.props.feed.length
  const randomPostNum = getRandomInt(numOfPost)

  console.log(props)
  return (
    <>
      {props.props.feed.map(
        (
          post: {
            id: Key
            title: boolean | ReactChild | ReactFragment | ReactPortal
            author: { name: boolean | ReactChild | ReactFragment | ReactPortal }
            content: string
          },
          index: number
        ) => (
          <Box key={post.id}>
            {index === randomPostNum && (
              <Box onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}>
                <Text fontSize="6xl" noOfLines={3}>
                  <b>{post.title}</b>
                </Text>
                <Text fontSize="sm" textAlign="right">
                  <i>{post.author.name}</i>
                </Text>
                <Divider my="2" />
                <Text fontSize="lg" noOfLines={1000}>
                  <ReactMarkdown>{post.content}</ReactMarkdown>
                </Text>
              </Box>
            )}
          </Box>
        )
      )}
    </>
  )
}

export default Feature
