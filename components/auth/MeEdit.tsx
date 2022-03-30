import {
  Box,
  Image,
  Button,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  useColorMode,
  Center,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import Router from 'next/router'

type FormData = {
  name: string
  description: string
  image: string
  email: string
  id: number
}

const MeEdit = (props: { props: { user: { id: any } } }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  // @ts-ignore id is not missing?
  const user: FormData = props.props.user

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ mode: 'onChange' })

  async function onSubmit(values) {
    await fetch('/api/profile/edit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((error) => {
        console.error('Error: ', error)
      })
    Router.push('/auth/[authorId]', `/auth/${user.id}`)
    onClose()
  }

  const { colorMode } = useColorMode()

  return (
    <Center>
      <Button
        borderRadius="xl"
        onClick={onOpen}
        size="sm"
        w="100%"
        boxShadow="md"
        mx="4"
        mb="4"
      >
        Edit
      </Button>

      {/* modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="xl">
          <Box
            bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
            borderRadius="xl"
          >
            <ModalHeader>{user.name}</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                {/* <VStack spacing={2}> */}
                {/* image input */}
                <Center mb="4">
                  <Image loading="lazy" borderRadius="full" src={user.image} />
                </Center>
                {/* name */}
                <FormControl isInvalid={errors.name}>
                  <FormLabel htmlFor="name">Artist Name</FormLabel>
                  <Input
                    id="name"
                    variant="filled"
                    defaultValue={user.name}
                    {...register('name', {
                      required: 'User name is required.',
                      minLength: {
                        value: 2,
                        message: 'Minimum length should be 2',
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>
                {/* email */}
                <FormControl isInvalid={errors.email} my="2">
                  <FormLabel htmlFor="name">Email Address</FormLabel>
                  <Input
                    id="email"
                    variant="filled"
                    defaultValue={user.email}
                    {...register('email', {
                      required: 'Email address is required',
                      minLength: {
                        value: 4,
                        message: 'Minimum length should be 4',
                      },
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                {/* description */}
                <FormControl isInvalid={errors.description} my="2">
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Textarea
                    variant="filled"
                    id="description"
                    placeholder="Description"
                    // @ts-ignore description is not defined in default next-auth user table
                    defaultValue={user.description}
                    {...register('description', {
                      pattern: {
                        value: /^(?=.{0,800}$)/,
                        message: 'Too much description!',
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.description && errors.description.message}
                  </FormErrorMessage>
                </FormControl>
                {/* location */}
                <FormControl isInvalid={errors.location}>
                  <FormLabel htmlFor="location">Location</FormLabel>
                  <Input
                    variant="filled"
                    id="location"
                    placeholder="Berlin, DE"
                    // @ts-ignore location is not defined in default next-auth user table
                    defaultValue={user.location}
                    {...register('location', {})}
                  />
                  <FormErrorMessage>
                    {errors.location && errors.location.message}
                  </FormErrorMessage>
                </FormControl>

                {/* website */}
                <FormControl isInvalid={errors.website}>
                  <FormLabel htmlFor="website">Website</FormLabel>
                  <InputGroup>
                    {/* <InputLeftAddon children="https://www." /> */}
                    <Input
                      variant="filled"
                      id="website"
                      placeholder="http://www.example.com/"
                      // @ts-ignore location is not defined in default next-auth user table
                      defaultValue={user.website}
                      {...register('website', {
                        pattern: {
                          value:
                            // url validation regex
                            /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,
                          message: 'Invalid URL',
                        },
                      })}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.website && errors.website.message}
                  </FormErrorMessage>
                </FormControl>
                {/* </VStack> */}
              </ModalBody>
              <ModalFooter>
                <Button
                  disabled={!isValid || isSubmitting}
                  size="sm"
                  colorScheme="blue"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Submit
                </Button>
              </ModalFooter>
            </form>
          </Box>
        </ModalContent>
      </Modal>
    </Center>
  )
}

export default MeEdit
