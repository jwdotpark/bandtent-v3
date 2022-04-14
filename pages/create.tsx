import React, { useState } from 'react'
import Layout from '../components/Layout'
import Router from 'next/router'
import {
  Center,
  Box,
  Text,
  Input,
  Textarea,
  Button,
  ButtonGroup,
  useColorMode,
} from '@chakra-ui/react'
import ImageUpload from '../components/utils/ImageUpload'
import { Media } from '../utils/media'
import dynamic from 'next/dynamic'
const FileUpload = dynamic(() => import('../components/utils/FileUpload'), {
  ssr: false,
})
// import FileUpload from '../components/FileUpload'

const Draft: React.FC = () => {
  const { colorMode } = useColorMode()

  // NOTE refactor this
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState<string>('')
  const [fileUrl, setFileUrl] = useState<string>('')

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

  return (
    <Layout>
      <Media greaterThanOrEqual="md">
        {JSON.stringify(title)}
        {JSON.stringify(imageUrl)}
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
            <form onSubmit={submitData}>
              <Text pl="2">New Item</Text>
              <Box my="4" boxShadow="md">
                <Input
                  variant="filled"
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Artist"
                  type="text"
                  value={title}
                />
              </Box>
              <Box my="4" boxShadow="md">
                <Input
                  variant="filled"
                  // cols={50}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Title"
                  // rows={8}
                  value={content}
                />
              </Box>
              {/* image */}
              <Box>
                <ImageUpload img={pullImage} />
                <Input display="none" type="file" defaultValue={imageUrl} />
              </Box>
              {/* file */}
              <Box>
                <FileUpload data={pullFile} />
                <Input display="none" type="file" defaultValue={imageUrl} />
              </Box>
              <Box mt="2">
                <ButtonGroup
                  isAttached
                  size="sm"
                  w="100%"
                  mt="2"
                  boxShadow="md"
                >
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
      </Media>
      <Media lessThan="md">
        <Center m="2" mx="2">
          <Box w="100%">
            <form onSubmit={submitData}>
              <Text>New Draft</Text>
              <Box my="4">
                <Input
                  variant="filled"
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  type="text"
                  value={title}
                />
              </Box>
              <Box my="4">
                <Textarea
                  variant="filled"
                  cols={50}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Content"
                  rows={8}
                  value={content}
                />
              </Box>
              {/* image */}
              <Box>
                <ImageUpload img={pullImage} />
                <Input display="none" type="file" defaultValue={imageUrl} />
              </Box>
              {/* file */}
              <Box>
                <FileUpload data={pullFile} />
                <Input display="none" type="file" defaultValue={imageUrl} />
              </Box>
              <Box>
                <ButtonGroup isAttached size="sm" w="100%" mt="2" mb="10">
                  <Button
                    variant="solid"
                    // mr="2"
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
                  <Button
                    variant="outline"
                    // colorScheme="yellow"
                    // mr="2"
                    w="20%"
                    onClick={() => Router.push('/')}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              </Box>
            </form>
          </Box>
        </Center>
      </Media>
    </Layout>
  )
}

export default Draft
