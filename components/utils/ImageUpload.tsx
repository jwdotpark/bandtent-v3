import { useCallback, useEffect } from 'react'
import { useS3Upload } from 'next-s3-upload'
import ImageComponent from './ImageComponent'
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
  AspectRatio,
} from '@chakra-ui/react'
import { Media } from '../../utils/media'
import { useDropzone } from 'react-dropzone'

export default function UploadPage(props) {
  const { colorMode } = useColorMode()
  const { uploadToS3, files } = useS3Upload()

  const [imageUrl, setImageUrl] = useState<string>('')
  const [preview, setPreview] = useState<string>('')

  // FIXME fix submit handler
  const handleFileChange = async (event) => {
    setPreview(URL.createObjectURL(event.target.files[0]))
    let file = event.target.files[0]
    let { url } = await uploadToS3(file)
    console.log('imageurl: ', url)
    setImageUrl(url)
  }

  props.img(imageUrl)

  const { getRootProps, getInputProps } = useDropzone()

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
                  bg={colorMode === 'light' ? 'gray.100' : '#242a35'}
                >
                  <Text fontSize="3xl">Click to select cover</Text>
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
                <Center>
                  <Image
                    objectFit="cover"
                    boxSize="50vw"
                    border="2px solid gray"
                    borderBottom="none"
                    borderTopRadius="md"
                    src={preview}
                  />
                </Center>
              )}
            </Box>
            {files.map((file, index) => (
              <Center>
                <Box key={index} boxSize="50vw" h="100%">
                  <Progress
                    border="2px solid gray"
                    borderTop="none"
                    borderBottomRadius="md"
                    boxShadow="md"
                    size="lg"
                    colorScheme="green"
                    value={file.progress}
                  />
                </Box>
              </Center>
            ))}
          </Box>
        </Media>
        <Media lessThan="md">
          <Box>
            <Box>
              {preview && (
                <Center>
                  <Image
                    objectFit="cover"
                    boxSize="100vw"
                    border="2px solid gray"
                    borderBottom="none"
                    borderTopRadius="md"
                    src={preview}
                  />
                </Center>
              )}
            </Box>
            {files.map((file, index) => (
              <Center>
                <Box key={index} boxSize="100vw" h="100%">
                  <Progress
                    border="2px solid gray"
                    borderTop="none"
                    borderBottomRadius="md"
                    boxShadow="md"
                    size="lg"
                    colorScheme="green"
                    value={file.progress}
                  />
                  {/* <Text my="2">
                    {file.progress}
                    <br />
                    {file.progress === 100 ? 'Done!' : 'Uploading'}
                  </Text> */}
                </Box>
              </Center>
            ))}
          </Box>
        </Media>
      </FormControl>
    </>
  )
}
