import React, { useState } from 'react'
import Layout from '../components/Layout'
import Router from 'next/router'
import {
  Center,
  Box,
  Text,
  Input,
  Button,
  ButtonGroup,
  useColorMode,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  Spacer,
  FormLabel,
  FormControl,
} from '@chakra-ui/react'
import ImageUpload from '../components/utils/ImageUpload'
// import { Media } from '../utils/media'
import dynamic from 'next/dynamic'
// import { useSession } from 'next-auth/react'
const FileUpload = dynamic(() => import('../components/utils/FileUpload'), {
  ssr: false,
})
// import FileUpload from '../components/FileUpload'

const Draft: React.FC = () => {
  const { colorMode } = useColorMode()
  // const { data: session } = useSession()

  // NOTE refactor this
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState<string>('')
  const [fileUrl, setFileUrl] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { title, content, imageUrl, fileUrl }
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await Router.push('/drafts')
    } catch (error) {
      console.error(error)
    }
  }

  const pullImage = (data: string) => {
    if (data) {
      setImageUrl(data)
    }
  }

  const pullFile = (data: string) => {
    if (data) {
      setFileUrl(data)
    }
  }

  // if (!session) {
  //   return <>TODO: no auth, reroute to signin page</>
  // }

  return (
    <Layout>
      <Center m="2" mx="2">
        <Box
          mt="2"
          w="50%"
          maxW="600px"
          // minH="800px"
          minH="calc(100vh - 8rem)"
          bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
          borderRadius="xl"
          boxShadow="md"
          p="4"
        >
          {isUploading && 'Uploading..'}
          <form onSubmit={submitData}>
            <Text pl="2">New Item</Text>
            {/* artist */}
            <FormControl my="4">
              <FormLabel htmlFor="artist">Artist</FormLabel>
              <Input
                boxShadow="md"
                variant="filled"
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Okgu"
                type="text"
                value={title}
              />
            </FormControl>
            {/* title */}
            <FormControl my="4">
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                boxShadow="md"
                variant="filled"
                onChange={(e) => setContent(e.target.value)}
                placeholder="cute dog"
                value={content}
              />
            </FormControl>
            <Flex my="4">
              {/* price */}
              <FormControl w="45%">
                <FormLabel htmlFor="price">Price</FormLabel>
                <NumberInput variant="filled" placeholder="100" boxShadow="md">
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              {/* tag */}
              <Spacer />
              <FormControl w="45%">
                <FormLabel htmlFor="tag">Tag</FormLabel>
                <Input
                  variant="filled"
                  placeholder="ambient, techno"
                  boxShadow="md"
                />
              </FormControl>
            </Flex>

            <Flex>
              {/* price */}
              <FormControl w="45%">
                <FormLabel htmlFor="price">Price</FormLabel>
                <NumberInput variant="filled" placeholder="100" boxShadow="md">
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              {/* tag */}
              <Spacer />
              <FormControl w="45%">
                <FormLabel htmlFor="tag">Tag</FormLabel>
                <Input
                  variant="filled"
                  placeholder="ambient, techno"
                  boxShadow="md"
                />
              </FormControl>
            </Flex>
            {/* image */}
            <FormControl my="4">
              <FormLabel htmlFor="image">Image</FormLabel>
              <Box boxShadow="md">
                <ImageUpload
                  img={pullImage}
                  isUploading={isUploading}
                  setIsUploading={setIsUploading}
                />
              </Box>
              <Input display="none" type="file" defaultValue={imageUrl} />
            </FormControl>
            {/* file */}
            <FormControl my="4">
              <FormLabel>Music File</FormLabel>
              <Box boxShadow="md">
                <FileUpload
                  data={pullFile}
                  isUploading={isUploading}
                  setIsUploading={setIsUploading}
                />
              </Box>
              <Input display="none" type="file" defaultValue={imageUrl} />
            </FormControl>
            <Box mt="2">
              <ButtonGroup isAttached size="sm" w="100%" mt="2" boxShadow="md">
                <Button
                  w="80%"
                  disabled={!content || !title || !imageUrl || !fileUrl}
                  type="submit"
                  value="Create"
                >
                  {/* Create */}
                  {!content || !title || !imageUrl || !fileUrl
                    ? 'Not available'
                    : 'Submit'}
                </Button>
                <Button w="20%" onClick={() => Router.push('/')}>
                  Cancel
                </Button>
              </ButtonGroup>
            </Box>
          </form>
        </Box>
      </Center>
    </Layout>
  )
}

export default Draft
