import {
  Box,
  Text,
  Image,
  Stack,
  HStack,
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
  FormHelperText,
  Input,
  VStack,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import Router from 'next/router'
import PostProps from '../../types/Post'

const MeEdit = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data } = useSession()

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ mode: 'onChange' })

  function onSubmit(values) {
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
      setTimeout(() => {
        resolve()
        Router.reload()
      }, 1000)
    })
  }

  return (
    <>
      <Button onClick={onOpen} size="sm">
        Edit
      </Button>
      {/* modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{data.user.name}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              {/* <VStack spacing={2}> */}
              {/* image input */}
              <Box>
                <Image borderRadius="xl" src={data.user.image} />
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
                <Input
                  id="website"
                  placeholder="http://www.example.com/"
                  // @ts-ignore location is not defined in default next-auth user table
                  defaultValue={data.user.website}
                  {...register('website', {})}
                />
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
        </ModalContent>
      </Modal>
    </>
  )
}

export default MeEdit
