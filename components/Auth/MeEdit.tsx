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

const MeEdit = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data } = useSession()
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('submitted')
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
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <VStack spacing={2}>
                {/* form */}
                <Image src={data.user.image} />
                <FormControl>
                  {/* name */}
                  <FormLabel htmlFor="name">User Name</FormLabel>
                  <Input id="name" type="name" defaultValue={data.user.name} />
                  {/* email */}
                  <FormLabel htmlFor="email">Email address</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={data.user.email}
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button size="sm" colorScheme="blue" type="submit">
                Submit Change
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MeEdit
