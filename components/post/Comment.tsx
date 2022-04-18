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
  Center,
  FormControl,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ChevronUpIcon } from '@chakra-ui/icons'
import moment from 'moment'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import Router from 'next/router'
import { DeleteIcon } from '@chakra-ui/icons'

const Comment = (props: { props: { post: any } }) => {
  const { data: session } = useSession()
  const { colorMode } = useColorMode()
  const [commentFeed, setCommentFeed] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const myPost = props.props.post
  const { authorId, id } = myPost

  const uid = session?.user.id

  // getting all comment from the post
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

  const deleteComment = async (id: number) => {
    // console.log(id)
    await fetch(`/api/post/comment/delete/${id}`, {
      method: 'DELETE',
    })
    // const data = await result.json()
    fetchComment()
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
    // console.log(data)
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
            {isFetching && (
              <Center h="100%">
                <Spinner />
              </Center>
            )}
            {commentFeed.map(
              (comment: any): JSX.Element => (
                <Flex key={comment.id} my="1">
                  <Box w="70%">
                    <Text>
                      {comment.content}{' '}
                      {comment.User.id === uid && (
                        <Button
                          display="inline-block"
                          variant="ghost"
                          ml="1"
                          size="xs"
                          onClick={() => deleteComment(comment.id)}
                        >
                          <DeleteIcon />
                        </Button>
                      )}
                    </Text>
                  </Box>

                  <Spacer />
                  <Text
                    _hover={{ cursor: 'pointer' }}
                    fontSize="sm"
                    mx="2"
                    onClick={() =>
                      Router.push(
                        '/auth/[authorId]',
                        `/auth/${comment.User.id}`
                      )
                    }
                  >
                    {comment.User.name}
                  </Text>
                  <Text fontSize="sm">
                    {moment(comment.createdAt).fromNow(true)}
                  </Text>
                </Flex>
              )
            )}
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
                  <Text mb="1" fontSize="md" mx="2" color="gray.500">
                    {errors.comment.message}
                  </Text>
                )}
                <InputGroup
                  size="md"
                  borderRadius="xl"
                  boxShadow="md"
                  border={colorMode === 'light' ? 'gray.400' : 'gray.600'}
                  bg={colorMode === 'light' ? 'gray.400' : 'gray.600'}
                >
                  <Input
                    size="md"
                    variant="filled"
                    autoComplete="false"
                    placeholder="Comment here"
                    _placeholder={{ color: 'gray.400' }}
                    borderRadius="xl"
                    border="none"
                    {...register('comment', {
                      required: "This can't be empty.",
                      minLength: {
                        value: 4,
                        message: 'Too short!',
                      },
                      maxLength: {
                        value: 400,
                        message: 'Too long!',
                      },
                    })}
                  />

                  <InputRightElement w="10%">
                    <Button
                      disabled={isLoading}
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
