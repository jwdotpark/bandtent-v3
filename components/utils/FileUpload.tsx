// FIXME
// @ts-nocheck

import { useS3Upload } from 'next-s3-upload'
import { useState } from 'react'
import {
  Box,
  Text,
  Center,
  useColorMode,
  Progress,
  useToast,
} from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
// import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'

export default function UploadPage(props) {
  const { colorMode } = useColorMode()
  const [fileUrl, setFileUrl] = useState<string>()
  const { uploadToS3, files } = useS3Upload()
  const toast = useToast()

  const [isUploading, setIsUploading] = useState(false)

  const onProgressToast = () => {
    toast({
      title: 'File uploading..',
      position: 'bottom-right',
      status: 'info',
      isClosable: true,
    })
  }

  const onFinishToast = () => {
    toast({
      title: 'File uploaded!',
      position: 'bottom-right',
      status: 'success',
      isClosable: true,
    })
  }

  // TODO trasncode before upload
  let handleFileChange = async (event) => {
    setIsUploading(true)
    onProgressToast()
    let file = event.target.files[0]
    let { url } = await uploadToS3(file)
    setFileUrl(url)
    setIsUploading(false)
    onFinishToast()
  }

  props.data(fileUrl)

  const { getRootProps, getInputProps } = useDropzone()

  return (
    <>
      {/* <FormControl> */}
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
              boxShadow="md"
              w="100%"
              h="10vh"
              borderRadius="md"
              bg={colorMode === 'light' ? 'gray.100' : '#394353'}
            >
              <Text fontSize="3xl">Add Audio(*.mp3, *.wav, *.aiff)</Text>
            </Center>
          )}
        </Box>
      </div>
      <Box>
        {files &&
          files.map((file, index) => (
            <Box
              key={index}
              borderRadius="md"
              border={fileUrl ? '3px solid green' : '3px solid red'}
            >
              <Progress
                h="2vh"
                value={file.progress}
                colorScheme="blackAlpha"
                isIndeterminate={isUploading}
              />
            </Box>
          ))}
      </Box>
      {/* </FormControl> */}
    </>
  )
}
