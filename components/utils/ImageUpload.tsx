// FIXME
// @ts-nocheck

import { useS3Upload } from 'next-s3-upload'
import { useEffect, useState } from 'react'
import {
  Box,
  Text,
  FormControl,
  Center,
  Image,
  useColorMode,
  Progress,
  AspectRatio,
  useToast,
} from '@chakra-ui/react'
import { Media } from '../../utils/media'
import { useDropzone } from 'react-dropzone'

export default function UploadPage(props) {
  const { colorMode } = useColorMode()
  const { uploadToS3, files } = useS3Upload()
  const toast = useToast()

  const [imageUrl, setImageUrl] = useState(null)
  const [preview, setPreview] = useState<string>('')
  const [progress, setProgress] = useState<number>(0)
  const [isUploading, setIsUploading] = useState(false)

  const onProgressToast = () => {
    toast({
      title: 'Image uploading..',
      status: 'info',
      position: 'bottom-right',
      isClosable: true,
    })
  }

  const onFinishToast = () => {
    toast({
      title: 'Image uploaded!',
      status: 'success',
      position: 'bottom-right',
      isClosable: true,
    })
  }

  const handleFileChange = async (event) => {
    setIsUploading(true)
    onProgressToast()
    setPreview(URL.createObjectURL(event.target.files[0]))
    let file = event.target.files[0]
    let { url } = await uploadToS3(file)
    setImageUrl(url)
    setIsUploading(false)
    onFinishToast()
  }

  props.img(imageUrl)

  const { getRootProps, getInputProps } = useDropzone()

  useEffect(() => {
    if (files) {
      setProgress(files[0]?.progress)
      // console.log(progress)
    }
  }, [files, progress])

  return (
    <>
      <FormControl>
        <div {...getRootProps()}>
          <input
            {...getInputProps()}
            type="file"
            accept=".png, .bmp, .jpg, .jpeg, image/*"
            onChange={handleFileChange}
          />
          <Box my="4">
            {!preview && (
              <AspectRatio ratio={1}>
                <Center
                  borderRadius="md"
                  bg={colorMode === 'light' ? 'gray.100' : '#394353'}
                >
                  <Text fontSize="3xl">Add Cover(*.png, *.jpg, *.bmp)</Text>
                </Center>
              </AspectRatio>
            )}
          </Box>
        </div>
        {/* preview upload */}
        <Media greaterThanOrEqual="md">
          <Box>
            <Box>
              {preview && (
                <Center
                  // border={imageUrl ? '3px solid green' : '3px solid red'}
                  borderTopRadius="xl"
                  overflow="clip"
                >
                  <Image
                    objectFit="cover"
                    boxSize="50vw"
                    borderColor={
                      colorMode === 'light' ? 'gray.100' : 'gray.300'
                    }
                    borderTopRadius="xl"
                    src={preview}
                    alt="preview"
                    sx={{ filter: `brightness(${progress}%)` }}
                  />
                </Center>
              )}
            </Box>
            {files &&
              files.map((file, index) => (
                <Center key={index}>
                  <Box boxSize="50vw" h="100%">
                    {isUploading && (
                      <Progress
                        borderTop="none"
                        boxShadow="md"
                        size="lg"
                        colorScheme={
                          colorMode === 'light' ? 'gray.400' : 'gray.600'
                        }
                        value={file.progress}
                      />
                    )}
                  </Box>
                </Center>
              ))}
          </Box>
        </Media>
        <Media lessThan="md">
          <Box>
            <Box border={imageUrl ? '2px solid green' : '2px solid red'}>
              {preview && (
                <Center border={imageUrl ? '2px solid green' : '2px solid red'}>
                  <Image
                    objectFit="cover"
                    boxSize="100vw"
                    borderBottom="none"
                    borderTopRadius="md"
                    src={preview}
                    alt="preview"
                  />
                </Center>
              )}
            </Box>
            {files.map((file, index) => (
              <Center key={index}>
                <Box boxSize="100vw" h="100%">
                  <Progress
                    borderTop="none"
                    borderBottomRadius="md"
                    boxShadow="md"
                    size="lg"
                    colorScheme="gray"
                    value={file.progress}
                    hasStripe={isUploading}
                  />
                </Box>
              </Center>
            ))}
          </Box>
        </Media>
      </FormControl>
    </>
  )
}
