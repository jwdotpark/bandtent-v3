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
  const [previewFile, setPreviewFile] = useState<Blob>()
  const [previewAudio, setPreviewAudio] = useState<string>()

  const { uploadToS3, files } = useS3Upload()

  // function that trim the given audio into given second
  
  const trimAudio = (file) => {
    const blob = new Blob([file], { type: 'audio/mp3' })
    const newBlob = new Blob([blob.slice(0, blob.size / 50)], {
      type: 'audio/mp3',
    })
    return newBlob
  }

  // FIXME move to submit handler
  let handleFileChange = async (event) => {
    let file = event.target.files[0]
    // trim the mp3 above into 60 second trimmed audio
    const trimmedFile = trimAudio(file)
    const prevUrl = URL.createObjectURL(trimmedFile)
    setPreviewAudio(prevUrl)
    console.log('prev url ', previewAudio)
    // let { url } = await uploadToS3(file)
    // setFileUrl(url)
  }

  console.log('trimmed: ', previewFile)

  props.data(fileUrl)

  const { getRootProps, getInputProps } = useDropzone()

  return (
    <>
      hi
      <audio src={previewAudio} />
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
              {/* <Text>{JSON.stringify(files)}</Text> */}
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
