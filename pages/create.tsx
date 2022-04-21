import React, { useState, useEffect } from 'react'
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
  FormErrorMessage,
} from '@chakra-ui/react'
import ImageUpload from '../components/utils/ImageUpload'
// import { useSession } from 'next-auth/react'
import FileUpload from '../components/utils/FileUpload'
import { useForm } from 'react-hook-form'

const Draft: React.FC = () => {
  const { colorMode } = useColorMode()
  // NOTE refactor this
  // const [title, setTitle] = useState('')
  // const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState<string>('')
  const [fileUrl, setFileUrl] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)

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

  // form
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      artist: '',
      title: '',
      imageUrl: '',
      fileUrl: '',
    },
  })

  const onSubmit = async (values: any) => {
    console.log('values: ', values)
    try {
      // const body = { title, content, imageUrl, fileUrl }
      // const { artist, title, imageUrl, fileUrl } = values
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      await Router.push('/drafts')
    } catch (error) {
      console.error(error)
    }
  }

  const watchFields = watch(['artist', 'title', 'imageUrl', 'fileUrl'])
  console.log('watch field: ', watchFields)

  const [isFormReady, setIsFormReady] = useState(false)
  useEffect(() => {
    if (watchFields[2] === '' || watchFields[3] === '') {
      console.log('empty')
      setIsFormReady(false)
    } else {
      console.log('ready')
      setIsFormReady(true)
    }
  }, [watchFields])

  // useEffect(() => {
  //   const subscription = watch((value, { name, type }) =>
  //     console.log(value, name, type)
  //   )
  //   return () => subscription.unsubscribe()
  // }, [watch])

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Text pl="2">New Item</Text>
            {/* artist */}
            <FormControl my="4" isInvalid={!!errors.artist}>
              <FormLabel htmlFor="artist">Artist</FormLabel>
              <Input
                boxShadow="md"
                variant="filled"
                autoFocus
                placeholder="Okgu"
                data-testid="artist"
                type="text"
                // onChange={(e) => setTitle(e.target.value)}
                // value={title}
                {...register('artist', {
                  required: 'Artist name is required.',
                  minLength: {
                    value: 2,
                    message: 'Minimum length should be more than 2 characters.',
                  },
                  maxLength: {
                    value: 100,
                    message:
                      'Maximum length should be less than 100 characters.',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.artist && errors.artist.message}
              </FormErrorMessage>
            </FormControl>
            {/* title */}
            <FormControl my="4" isInvalid={!!errors.title}>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                boxShadow="md"
                variant="filled"
                placeholder="cute dog"
                // onChange={(e) => setContent(e.target.value)}
                // value={content}
                {...register('title', {
                  required: 'Title is required.',
                  minLength: {
                    value: 2,
                    message: 'Minimum length should be more than 2 characters.',
                  },
                  maxLength: {
                    value: 100,
                    message:
                      'Maximum length should be less than 100 characters.',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.title && errors.title.message}
              </FormErrorMessage>
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
            <FormControl my="4" isInvalid={!!errors.imageUrl}>
              <FormLabel htmlFor="image">Image</FormLabel>
              <Box boxShadow="md">
                {JSON.stringify(imageUrl)}
                <ImageUpload
                  img={pullImage}
                  isUploading={isUploading}
                  setIsUploading={setIsUploading}
                />
              </Box>
              <Input
                display="none"
                type="file"
                defaultValue={imageUrl}
                {...register('imageUrl', {
                  // required: 'Image is required.',
                })}
                // onChange={() => setValue('imageUrl', imageUrl)}
              />
              <Button onClick={() => setValue('imageUrl', imageUrl)}>
                save image
              </Button>
              <FormErrorMessage>
                {errors.imageUrl && errors.imageUrl.message}
              </FormErrorMessage>
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
              <Input
                display="none"
                type="file"
                defaultValue={fileUrl}
                {...register('fileUrl', {
                  // required: 'File is required.',
                })}
                // onChange={() => setValue('fileUrl', fileUrl)}
              />
              <Button onClick={() => setValue('fileUrl', fileUrl)}>
                save file
              </Button>
              <FormErrorMessage>
                {errors.fileUrl && errors.fileUrl.message}
              </FormErrorMessage>
            </FormControl>
            <Box mt="2">
              <ButtonGroup isAttached size="sm" w="100%" mt="2" boxShadow="md">
                <Button
                  w="80%"
                  // disabled={!content && !title}
                  disabled={errors && !isFormReady}
                  type="submit"
                  value="Create"
                  onClick={handleSubmit(onSubmit)}
                >
                  {/* Create */}
                  {errors && !isFormReady ? 'Not available' : 'Submit'}
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
