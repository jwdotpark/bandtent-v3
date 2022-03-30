import useSWR from 'swr'
import {
  Box,
  Text,
  Divider,
  useColorMode,
  Center,
  Spinner,
} from '@chakra-ui/react'
import Router from 'next/router'
import ImageComponent from '../utils/ImageComponent'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const MyPost = (props) => {
  const { colorMode } = useColorMode()
  const [num, setNum] = useState(0)

  const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json())
  const { data, error } = useSWR(`/api/post/mypost/${props.uid}`, fetcher)

  useEffect(() => {
    if (data) {
      setNum(data.posts.length)
    }
  }, [data])

  if (error) return <Center h="100%">Failed to load</Center>
  if (!data)
    return (
      <Center h="100%">
        <Spinner />
      </Center>
    )

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
              : 'No item uploaded.'}
          </Text>
        </Box>

        <Box
          bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
          borderRadius="xl"
          boxShadow="md"
          px="2"
          pt="1"
          pr="6"
          sx={{
            boxShadow:
              'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
            columnCount: [1, 2],
            columnGap: '4',
            columnWidth: '100%',
          }}
        >
          {!error &&
            data.posts
              .slice(0)
              .reverse()
              .map((post) => {
                return (
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                    }}
                    transition={{ ease: 'easeInOut', duration: 0.2 }}
                  >
                    <Box
                      display="inline-block"
                      bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
                      borderRadius="xl"
                      p="4"
                      mt="2"
                      mb="2"
                      mx="2"
                      key={post.id}
                      boxShadow="md"
                      w="100%"
                      border={!post.published ? '3px dashed #ff79c6' : null}
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
                  </motion.div>
                )
              })}
        </Box>
        {error && <Text>Failed to load</Text>}
      </Box>
    </>
  )
}

export default MyPost
