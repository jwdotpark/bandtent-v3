import { Divider, Box, Text, useColorMode } from '@chakra-ui/react'
import Router from 'next/router'
import { Key, ReactChild, ReactFragment, ReactPortal } from 'react'
import ImageComponent from './utils/ImageComponent'
import moment from 'moment'
import useSWR from 'swr'

const Feature = (props: { props }) => {
  const { colorMode } = useColorMode()

  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  // const numOfPost = useSWR('/api/post/count', fetcher)
  const { data, error } = useSWR('/api/post/count', fetcher)

  return (
    <Box boxShadow="md">
      <Box
        bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
        borderRadius="md"
        mb="2"
        boxShadow="md"
      >
        <Text mx="2" fontSize="3xl" p="2">
          <b>{JSON.stringify(data)} article uploaded</b>
        </Text>
      </Box>
      <Box mt="4">
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
            <>
              {index === 3 && (
                <Box key={post.id}>
                  <Box
                    onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}
                    // border="2px solid gray"
                    bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
                    borderRadius="md"
                    p="2"
                  >
                    <Text ml="2">
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
                </Box>
              )}
            </>
          )
        )}
      </Box>
    </Box>
  )
}

export default Feature
