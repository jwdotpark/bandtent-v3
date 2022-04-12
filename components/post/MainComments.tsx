import {
  Spacer,
  Text,
  Box,
  Image,
  Center,
  Spinner,
  useColorMode,
  Flex,
} from '@chakra-ui/react'
import Router from 'next/router'
import useSWR from 'swr'
import moment from 'moment'
import { motion } from 'framer-motion'
// import { Key, ReactChild, ReactFragment, ReactPortal } from 'react'
const MainComments = () => {
  const { colorMode } = useColorMode()
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data } = useSWR('/api/post/comment/get', fetcher, {
    // NOTE interval 1hr for now
    refreshInterval: 1000 * 60,
  })

  // console.log(data)

  if (!data)
    return (
      <Center w="100%">
        <Spinner />
      </Center>
    )

  return (
    <Box
      className="comment"
      w="100%"
      p="2"
      m="2"
      borderRadius="xl"
      bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
      boxShadow="md"
    >
      <Box
        bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
        borderRadius="xl"
        mx="2"
        mt="4"
        mb="4"
        px="4"
        p="2"
        pl="4"
        boxShadow="md"
      >
        <Text fontSize="3xl">Recent Reviews</Text>
      </Box>
      <Box
        bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
        borderRadius="xl"
        p="2"
        m="2"
        boxShadow="md"
      >
        {data.map(
          // FIXME
          (comment: {
            id: number
            postId: number
            Post: {
              content: string
              title: string
            }
            content: string
            User: {
              id: number
              image: string | undefined
              name: string
            }
            createdAt: moment.MomentInput
          }) => (
            <motion.div
              whileHover={{
                scale: 1.02,
              }}
              transition={{ ease: 'circInOut', duration: 0.2 }}
              key={comment.id}
            >
              <Box
                boxShadow="md"
                p="2"
                m="2"
                mb="4"
                borderRadius="xl"
                bg={colorMode === 'light' ? 'gray.200' : 'gray.800'}
              >
                <Box my="1" m="2">
                  <Box
                    _hover={{ cursor: 'pointer' }}
                    onClick={() =>
                      Router.push('/p/[id]', `/p/${comment.postId}`)
                    }
                  >
                    <Box my="2">
                      <Text color="gray.400">
                        <b>
                          {comment.Post.content}, {comment.Post.title}
                        </b>
                      </Text>
                    </Box>
                    <Box>
                      <Text mb="4">
                        <em>{comment.content}</em>
                      </Text>
                    </Box>
                  </Box>
                  <Flex
                    w="100%"
                    _hover={{ cursor: 'pointer' }}
                    onClick={() =>
                      Router.push(
                        '/auth/[authorId]',
                        `/auth/${comment.User.id}`
                      )
                    }
                  >
                    <Spacer />
                    <Image
                      // sx={{ transform: 'translateY(6px)' }}
                      display="inline"
                      src={comment.User.image}
                      alt={comment.User.name}
                      fallbackSrc="https://picsum.photos/200"
                      boxSize="1.5rem"
                      borderRadius="full"
                      mr="2"
                    />
                    {comment.User.name}, {moment(comment.createdAt).fromNow()}
                  </Flex>
                </Box>
              </Box>
            </motion.div>
          )
        )}
      </Box>
    </Box>
  )
}

export default MainComments
