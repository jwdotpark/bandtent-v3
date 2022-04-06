import {
  Box,
  Button,
  Input,
  Spacer,
  Flex,
  Stack,
  InputGroup,
  InputRightElement,
  useColorMode,
  Spinner,
  Center,
  Text,
  FormControl,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ChevronUpIcon } from '@chakra-ui/icons'
import moment from 'moment'
import { useSession } from 'next-auth/react'
import Router from 'next/router'

const Comment = (props) => {
  const { data: session } = useSession()
  const { colorMode } = useColorMode()
  const [commentFeed, setCommentFeed] = useState([])
  const [comment, setComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const myPost = props.props.post
  const { authorId, id } = myPost

  const uid = session?.user.id

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const body = { comment, authorId, uid, id }
      await fetch('/api/post/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
      setComment('')
      fetchComment()
    }
  }

  const fetchComment = async () => {
    setIsFetching(true)
    const body = { id }
    const result = await fetch('/api/post/comment', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await result.json()
    setCommentFeed(data.comments)
    setIsFetching(false)
  }

  useEffect(() => {
    fetchComment()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  
  return (
    <Flex
      direction="column"
      h="100%"
      p="2"
      bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
      borderRadius="xl"
      boxShadow="md"
    >
      <Box
        m="2"
        p="2"
        bg={colorMode === 'light' ? 'gray.400' : 'gray.600'}
        borderRadius="xl"
        boxShadow="md"
      >
        <Stack direction="column" mx="2" h="auto">
          <Box h="auto" overflowY="auto">
            {commentFeed.length === 0 && 'Nothing to see here'}
            {commentFeed.length !== 0 &&
              commentFeed.map((comment) => (
                <Flex key={comment.id}>
                  <Text>{comment.content}</Text>
                  <Spacer />
                  <Text
                    fontSize="xs"
                    mx="2"
                    _hover={{ cursor: 'pointer' }}
                    onClick={() =>
                      Router.push(
                        '/auth/[authorId]',
                        `/auth/${comment.User.id}`
                      )
                    }
                  >
                    {comment.User.name}
                  </Text>
                  <Text fontSize="xs">
                    {moment(comment.createdAt).fromNow()}
                  </Text>
                </Flex>
              ))}
          </Box>
        </Stack>
      </Box>
      <Spacer />
      {/* typing comment */}
      {session && (
        <Box p="2" border="none">
          <form onSubmit={submitData}>
            <FormControl isRequired>
              <motion.div
                whileHover={{
                  scale: 1.03,
                }}
                transition={{ ease: 'easeInOut', duration: 0.2 }}
                whileFocus={{
                  scale: 1.03,
                }}
              >
                <InputGroup
                  size="md"
                  borderRadius="xl"
                  boxShadow="md"
                  border={colorMode === 'light' ? 'gray.400' : '#383a59'}
                  bg={colorMode === 'light' ? 'gray.400' : '#383a59'}
                >
                  <Input
                    placeholder="Comment here"
                    _placeholder={{ color: 'gray.500' }}
                    borderRadius="xl"
                    border="none"
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value)
                    }}
                  />

                  <InputRightElement w="10%">
                    <Button
                      variant="linked"
                      size="md"
                      w="100%"
                      borderLeftRadius="none"
                      borderRadius="xl"
                      onClick={submitData}
                    >
                      {/* <Text fontSize="xs">Send</Text> */}
                      {isLoading ? <Spinner size="xs" /> : <ChevronUpIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </motion.div>
            </FormControl>
          </form>
        </Box>
      )}
    </Flex>
  )
}

export default Comment
