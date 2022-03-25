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
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import Router from 'next/router'

const MeEdit = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data } = useSession()

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ mode: 'onChange' })

  // FIXME something's wrong with fetching but can't figure out
  function onSubmit(values: any) {
    return new Promise<void>((resolve) => {
      fetch('/api/profile/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .then((error) => {
          console.error('Error: ', error)
        })
      setTimeout(() => {
        resolve()
        Router.reload()
      }, 1000)
    })
  }

  const { colorMode } = useColorMode()

  return (
    <>
      <Button
        borderRadius="xl"
        colorScheme="blackAlpha"
        onClick={onOpen}
        size="sm"
        w="100%"
        boxShadow="md"
        my="2"
      >
        Edit
      </Button>
      {/* modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xs">
        <ModalOverlay />
        <ModalContent borderRadius="xl">
          <Box
            bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
            borderRadius="xl"
          >
            <ModalHeader>{data.user.name}</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                {/* <VStack spacing={2}> */}
                {/* image input */}
                <Box>
                  <Image
                    loading="lazy"
                    borderRadius="xl"
                    src={data.user.image}
                  />
                </Box>
                {/* name */}
                <FormControl isInvalid={errors.name}>
                  <FormLabel htmlFor="name">User Name</FormLabel>
                  <Input
                    id="name"
                    defaultValue={data.user.name}
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
                <FormControl isInvalid={errors.email}>
                  <FormLabel htmlFor="name">Email Address</FormLabel>
                  <Input
                    id="email"
                    defaultValue={data.user.email}
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
                <FormControl isInvalid={errors.description}>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Textarea
                    id="description"
                    placeholder="Description"
                    // @ts-ignore description is not defined in default next-auth user table
                    defaultValue={data.user.description}
                    {...register('description', {})}
                  />
                  <FormErrorMessage>
                    {errors.description && errors.description.message}
                  </FormErrorMessage>
                </FormControl>
                {/* location */}
                <FormControl isInvalid={errors.location}>
                  <FormLabel htmlFor="location">Location</FormLabel>
                  <Input
                    id="location"
                    placeholder="Berlin, DE"
                    // @ts-ignore location is not defined in default next-auth user table
                    defaultValue={data.user.location}
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
                      id="website"
                      placeholder="http://www.example.com/"
                      // @ts-ignore location is not defined in default next-auth user table
                      defaultValue={data.user.website}
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
    </>
  )
}

export default MeEdit
