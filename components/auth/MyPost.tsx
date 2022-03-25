import useSWR from 'swr'
import { Box, Text, Divider } from '@chakra-ui/react'
import Router from 'next/router'
import ImageComponent from '../utils/ImageComponent'
import { useEffect, useState } from 'react'

const MyPost = (props) => {
  const [num, setNum] = useState(0)

  const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json())
  const { data, error } = useSWR('/api/post/mypost', fetcher)

  useEffect(() => {
    if (data) {
      setNum(data.posts.length)
    }
  }, [data])

  props.func(num)

  return (
    <>
      <Box boxShadow="md" mb="2">
        <Box
          border="2px solid gray"
          borderRadius="md"
          p="2"
          mb="2"
          boxShadow="md"
        >
          <Text fontSize="md">
            {data && data.posts.length !== 1
              ? data.posts.length + ' posts uploaded..'
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
                  boxShadow="md"
                  borderRadius="md"
                  border={post.published ? '2px solid' : '4px dashed'}
                  borderColor={post.published ? 'gray' : 'gray.400'}
                  p="2"
                  mb="2"
                  key={post.id}
                >
                  <Box
                    onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}
                    _hover={{ cursor: 'pointer' }}
                  >
                    <Text fontSize="xl" noOfLines={3}>
                      {post.title}
                    </Text>
                    <Divider my="2" />
                    <Box m="2">
                      {post.imageUrl && <ImageComponent props={post} />}
                    </Box>
                    <Text fontSize="md" noOfLines={3}>
                      {post.content}
                    </Text>
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
