import { Divider, Box, Text } from '@chakra-ui/react'
import Router from 'next/router'
import { Key, ReactChild, ReactFragment, ReactPortal } from 'react'
import ImageComponent from '../components/ImageComponent'

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
            title: boolean | ReactChild | ReactFragment | ReactPortal
            author: { name: boolean | ReactChild | ReactFragment | ReactPortal }
            content: string
            imageUrl: string
          },
          index: number
        ) => (
          <Box key={post.id} m="2">
            {index === randomPostNum && (
              <Box onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}>
                <Text fontSize="6xl" noOfLines={3}>
                  <b>{post.title}</b>
                </Text>
                <Text fontSize="sm" textAlign="right">
                  <i>{post.author.name}</i>
                </Text>
                <Divider my="2" />
                {post.imageUrl && (
                  // <Image src={post.imageUrl} w="100%" objectFit="cover" />
                  <ImageComponent props={post} />
                )}
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
