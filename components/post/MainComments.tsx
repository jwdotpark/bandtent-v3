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
const MainComments = () => {
  const { colorMode } = useColorMode()
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data, error } = useSWR('/api/post/comment/get', fetcher, {
    // NOTE interval 1hr for now
    refreshInterval: 1000 * 60,
  })

  console.log(data)

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
        {data.map((comment) => (
          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            transition={{ ease: 'easeInOut', duration: 0.2 }}
            key={comment.id}
          >
            <Box
              boxShadow="md"
              p="2"
              m="2"
              mb="4"
              borderRadius="xl"
              bg={colorMode === 'light' ? 'gray.200' : 'gray.600'}
            >
              <Box my="1" m="2">
                <Text
                  _hover={{ cursor: 'pointer' }}
                  onClick={() => Router.push('/p/[id]', `/p/${comment.postId}`)}
                >
                  <em>{comment.content}</em>
                </Text>
                <Flex
                  w="100%"
                  _hover={{ cursor: 'pointer' }}
                  onClick={() =>
                    Router.push('/auth/[authorId]', `/auth/${comment.User.id}`)
                  }
                >
                  <Spacer />
                  <Box>
                    <Image
                      sx={{ transform: 'translateY(6px)' }}
                      display="inline"
                      src={comment.User.image}
                      alt={comment.User.name}
                      fallbackSrc="https://picsum.photos/200"
                      boxSize="1.5rem"
                      borderRadius="full"
                      mr="2"
                    />
                    {comment.User.name}, {moment(comment.createdAt).fromNow()}
                  </Box>
                </Flex>
              </Box>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  )
}

export default MainComments
