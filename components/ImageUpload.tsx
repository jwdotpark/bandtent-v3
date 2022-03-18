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
} from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'

export default function UploadPage(props) {
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
          {isDragActive && !imageUrl ? (
            <Center w="100%" h="200px" border="1px solid red">
              Drop the files here
            </Center>
          ) : (
            <Center w="100%" h="20vh" border="1px solid red">
              Click to select image
            </Center>
          )}

          <img src={imageUrl} />
        </div>
        {imageUrl && 'file uploaded!'}
      </FormControl>
    </>
  )
}
