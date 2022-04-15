// @ts-nocheck
// FIXME

import { useS3Upload } from 'next-s3-upload'
import { useState } from 'react'
import {
  Box,
  Text,
  FormControl,
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
  const { files } = useS3Upload()

  // const [, setFile] = useState()
  const [imageUrl, setImageUrl] = useState<string>('')
  const [preview, setPreview] = useState<string>('')

  // const { setIsUploading } = props

  const handleFileChange = async (event) => {
    // console.log('image upload init')
    setPreview(URL.createObjectURL(event.target.files[0]))
    let file = event.target.files[0]
    let { url } = await uploadToS3(file)
    // console.log('imageurl: ', url)
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
                  bg={colorMode === 'light' ? 'gray.100' : '#394353'}
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
                    border="1rem solid"
                    borderBottom="4rem solid"
                    borderColor={
                      colorMode === 'light' ? 'gray.100' : 'gray.300'
                    }
                    borderTopRadius="md"
                    src={preview}
                    alt="preview"
                  />
                </Center>
              )}
            </Box>
            {files &&
              files.map((file, index) => (
                <Center key={index}>
                  <Box boxSize="50vw" h="100%">
                    <Progress
                      // border="2px solid gray"
                      borderTop="none"
                      borderBottomRadius="md"
                      boxShadow="md"
                      size="lg"
                      colorScheme="gray"
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
                    alt="preview"
                  />
                </Center>
              )}
            </Box>
            {files.map((file, index) => (
              <Center key={index}>
                <Box boxSize="100vw" h="100%">
                  <Progress
                    // border="2px solid gray"
                    borderTop="none"
                    borderBottomRadius="md"
                    boxShadow="md"
                    size="lg"
                    colorScheme="gray"
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
