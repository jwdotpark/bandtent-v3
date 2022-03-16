import {
  Box,
  Text,
  Image,
  Stack,
  HStack,
  Button,
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
import { useForm, useFormState } from 'react-hook-form'

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
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        resolve()
      }, 3000)
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
              <VStack spacing={2}>
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
              </VStack>
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
