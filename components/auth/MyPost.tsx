import useSWR from 'swr'
import { Box, Text, Divider, useColorMode } from '@chakra-ui/react'
import Router from 'next/router'
import ImageComponent from '../utils/ImageComponent'
import { useEffect, useState } from 'react'

const MyPost = (props) => {
  const { colorMode } = useColorMode()

  const [num, setNum] = useState(0)

  const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json())
  const { data, error } = useSWR('/api/post/mypost', fetcher)

  useEffect(() => {
    if (data) {
      setNum(data.posts.length)
    }
  }, [data])

  if (error) return 'Failed to load'

  return (
    <>
      <Box my="2" mb="4">
        <Box
          bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
          borderRadius="xl"
          p="4"
          m="2"
          mb="4"
          boxShadow="md"
        >
          <Text fontSize="xl">
            {data && data.posts.length !== 1
              ? data.posts.length + ' posts uploaded.'
              : 'No item uploaded..'}
          </Text>
        </Box>

        {!error &&
          data?.posts
            .slice(0)
            .reverse()
            .map((post) => {
              return (
                <Box
                  py="2"
                  boxShadow="md"
                  borderRadius="xl"
                  bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
                  border={!post.published ? '3px dashed gray' : null}
                  p="2"
                  m="2"
                  mb="4"
                  key={post.id}
                >
                  {/* {post.published ? 'yes' : 'no'} */}
                  <Box
                    p="2"
                    onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}
                    _hover={{ cursor: 'pointer' }}
                  >
                    <Text fontSize="3xl" noOfLines={3}>
                      {post.title} {post.published ? null : '- unpublished'}
                    </Text>
                    <Text fontSize="xl">{post.content}</Text>
                    <Divider my="2" />
                    <Box>
                      {post.imageUrl && <ImageComponent props={post} />}
                    </Box>
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
