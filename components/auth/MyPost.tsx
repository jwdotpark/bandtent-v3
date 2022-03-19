import useSWR from 'swr'
import { Box, Text, Divider } from '@chakra-ui/react'
import Router from 'next/router'
import ImageComponent from '../../components/ImageComponent'

const MyPost = () => {
  const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json())
  const { data, error } = useSWR('/api/post/mypost', fetcher)
  return (
    <>
      <Box>
        <Text fontSize="3xl" my="4">
          My Post
        </Text>
        {!error &&
          data?.posts
            .slice(0)
            .reverse()
            .map((post) => {
              return (
                <Box
                  borderRadius="md"
                  border={post.published ? '2px solid' : '2px dashed'}
                  borderColor={post.published ? 'gray' : 'gray.400'}
                  p="2"
                  mb="2"
                  key={post.id}
                >
                  {!post.published ? 'Unpublished' : 'Published'}
                  <Box
                    onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}
                    _hover={{ cursor: 'pointer' }}
                  >
                    <Text fontSize="xl" noOfLines={3}>
                      {post.title}
                    </Text>
                    <Divider my="2" />
                    {post.imageUrl && <ImageComponent props={post} />}
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
