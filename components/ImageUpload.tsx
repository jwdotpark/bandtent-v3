import { useCallback, useEffect } from 'react'
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
  Progress,
} from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'

export default function UploadPage(props) {
  const { colorMode } = useColorMode()
  let [imageUrl, setImageUrl] = useState<string>()
  let { uploadToS3, files } = useS3Upload()

  // FIXME move to submit handler
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
        <div {...getRootProps()}>
          <input
            {...getInputProps()}
            type="file"
            accept=".png, .bmp, .jpg, .jpeg, image/*"
            onChange={handleFileChange}
          />
          <Box my="4">
            {files.length === 0 && (
              <Center
                w="100%"
                h="10vh"
                borderRadius="md"
                bg={colorMode === 'light' ? 'gray.100' : '#242a35'}
              >
                <Text fontSize="3xl">Click to select cover</Text>
              </Center>
            )}
          </Box>
        </div>
        <Box>
          {files.length !== 0 && imageUrl && (
            <Center borderRadius="md">
              <Box
                my="2"
                boxShadow="sm"
                borderRadius="md"
                overflow="clip"
                w="50vw"
              >
                <Image src={imageUrl} objectFit="cover" />
              </Box>
            </Center>
          )}
          {files.map((file, index) => (
            <Box key={index}>
              <Text>Uploading.. </Text>
              <Progress hasStripe value={file.progress} />
            </Box>
          ))}
        </Box>
        {imageUrl && 'file uploaded!'}
      </FormControl>
    </>
  )
}
