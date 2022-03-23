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
  const [fileUrl, setFileUrl] = useState<string>()
  const { uploadToS3, files } = useS3Upload()

  // TODO trasncode before upload
  let handleFileChange = async (event) => {
    let file = event.target.files[0]
    let { url } = await uploadToS3(file)
    setFileUrl(url)
  }

  props.data(fileUrl)

  const { getRootProps, getInputProps } = useDropzone()

  return (
    <>
      <FormControl>
        <div {...getRootProps()}>
          <input
            {...getInputProps()}
            type="file"
            accept=".mp3, .wav, .aiff, audio/*"
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
                <Text fontSize="3xl">Click to select music</Text>
              </Center>
            )}
          </Box>
        </div>
        <Box>
          {files.map((file, index) => (
            <Box key={index}>
              <Text>Uploading file.. </Text>
              <Progress hasStripe value={file.progress} />
            </Box>
          ))}
        </Box>
        {fileUrl && 'file uploaded!'}
      </FormControl>
    </>
  )
}
