import { useCallback } from 'react'
import { useS3Upload } from 'next-s3-upload'
import { useState } from 'react'
import {
  Box,
  Text,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  Code,
  Icon,
  Center,
  Image,
  useColorMode,
} from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'

export default function UploadPage(props) {
  const { colorMode } = useColorMode()
  let [imageUrl, setImageUrl] = useState<string>()
  let { uploadToS3, files } = useS3Upload()

  let handleFileChange = async (event) => {
    let file = event.target.files[0]
    let { url } = await uploadToS3(file)
    setImageUrl(url)
  }
  props.img(imageUrl)

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <>
      <FormControl>
        <Box>
          <Box borderRadius="xl">
            {/* <Input variant="filled" onChange={handleFileChange} type="file" /> */}
          </Box>
          <Box>
            {files.map((file, index) => (
              <Text key={index}>
                File #{index} progress: {file.progress}%
              </Text>
            ))}
          </Box>
        </Box>
        <div {...getRootProps()}>
          <input {...getInputProps()} onChange={handleFileChange} />
          <Box my="4">
            {imageUrl ? (
              <Box border="2px solid gray" borderRadius="md">
                <Image src={imageUrl} objectFit="cover" />
              </Box>
            ) : (
              <Center
                w="100%"
                h="10vh"
                borderRadius="md"
                // border="2px dashed gray"
                bg={colorMode === 'light' ? 'gray.100' : '#242a35'}
              >
                <Text fontSize="3xl">Click to select image</Text>
              </Center>
            )}
          </Box>
        </div>
        {imageUrl && 'file uploaded!'}
      </FormControl>
    </>
  )
}
