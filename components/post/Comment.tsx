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
  Text,
  FormControl,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ChevronUpIcon } from '@chakra-ui/icons'
import moment from 'moment'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'

const Comment = (props) => {
  const { data: session } = useSession()
  const { colorMode } = useColorMode()
  const [commentFeed, setCommentFeed] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const myPost = props.props.post
  const { authorId, id } = myPost

  const uid = session?.user.id

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { comment: '' } })

  type IFormData = {
    comment: string
  }

  const onSubmit = async (data: IFormData) => {
    console.log(data)
    setIsLoading(true)
    const { comment } = data
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
      reset({ comment: '' })
      fetchComment()
    }
  }

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
        <Stack direction="column" m="2" h="auto">
          <Box h="auto" overflowY="auto">
            {commentFeed.map((comment) => (
              <Flex key={comment.id} my="1">
                <Box w="70%">
                  <Text>{comment.content}</Text>
                </Box>
                <Spacer />
                <Text fontSize="xs" mx="2">
                  {comment.User.name}
                </Text>
                <Text fontSize="xs">
                  {moment(comment.createdAt).fromNow(true)}
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
          <form onSubmit={handleSubmit(onSubmit)}>
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
                {errors.comment && (
                  <Text fontSize="xs" mx="2">
                    {errors.comment.message}
                  </Text>
                )}
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
                    {...register('comment', {
                      minLength: {
                        value: 4,
                        message:
                          'Minimum character length should be more than 4 characters.',
                      },
                      maxLength: {
                        value: 180,
                        message:
                          'Maximum character length should be less than 180 characters.',
                      },
                    })}
                  />

                  <InputRightElement w="10%">
                    <Button
                      variant="linked"
                      size="md"
                      w="100%"
                      borderLeftRadius="none"
                      borderRadius="xl"
                      onClick={handleSubmit(onSubmit)}
                    >
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
