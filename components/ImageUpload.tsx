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
} from '@chakra-ui/react'

export default function UploadPage(props) {
  let [imageUrl, setImageUrl] = useState<string>()
  let { uploadToS3, files } = useS3Upload()

  let handleFileChange = async (event) => {
    let file = event.target.files[0]
    let { url } = await uploadToS3(file)
    setImageUrl(url)
  }
  props.img(imageUrl)

  return (
    <>
      <FormControl>
        <Box>
          <Box borderRadius="xl">
            <Input variant="filled" onChange={handleFileChange} type="file" />
          </Box>
          <Box>
            {files.map((file, index) => (
              <Text key={index}>
                File #{index} progress: {file.progress}%
              </Text>
            ))}
          </Box>
        </Box>
      </FormControl>
    </>
  )
}
