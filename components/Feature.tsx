import { Divider, Box, Text } from '@chakra-ui/react'
import Router from 'next/router'
import { Key, ReactChild, ReactFragment, ReactPortal } from 'react'
import ImageComponent from '../components/ImageComponent'
import moment from 'moment'

const Feature = (props) => {
  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max)
  }
  const numOfPost = props.props.feed.length
  const randomPostNum = getRandomInt(numOfPost)

  // console.log(props)
  return (
    <>
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
          <Box key={post.id} m="2">
            {index === randomPostNum && (
              <Box onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}>
                <Box textAlign="left">
                  <Text fontSize="sm">
                    Posted by <b>{post.author.name}</b>{' '}
                    <i>{moment(post.createdAt).fromNow()}</i>
                  </Text>
                </Box>
                <Text fontSize="3xl" noOfLines={3} textAlign="left">
                  <b>{post.title}</b>
                </Text>

                <Divider my="2" />
                {post.imageUrl && <ImageComponent props={post} />}
                <Text fontSize="lg" noOfLines={1000}>
                  {post.content}
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
