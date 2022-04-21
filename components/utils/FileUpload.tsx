/* eslint-disable no-unused-vars */
// FIXME
// @ts-nocheck

import { useS3Upload } from 'next-s3-upload'
import { useState } from 'react'
import {
  HStack,
  Box,
  Button,
  Text,
  Center,
  useColorMode,
  useToast,
} from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
// import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import Wavesurfer from 'react-wavesurfer.js'
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'

export default function UploadPage(props) {
  const { colorMode } = useColorMode()
  const [fileUrl, setFileUrl] = useState<string>()
  const [preview, setPreview] = useState()
  const [playing, setPlaying] = useState(false)
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
    setPreview(URL.createObjectURL(event.target.files[0]))
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
        <Box>
          {!preview && (
            <Center
              boxShadow="md"
              w="100%"
              h="10vh"
              borderRadius="xl"
              // bg={colorMode === 'light' ? 'gray.100' : '#394353'}
            >
              <Text fontSize="3xl">Add Audio(*.mp3, *.wav, *.aiff, *.ogg)</Text>
            </Center>
          )}
        </Box>
      </div>
      <Box
        borderTopRadius="xl"
        // bg={colorMode === 'light' ? 'gray.300' : 'gray.600'}
      >
        {preview && (
          <HStack mx="2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setPlaying(!playing)}
            >
              {playing ? (
                <BsFillPauseFill size={30} />
              ) : (
                <BsFillPlayFill size={30} />
              )}
            </Button>
            <Box w="100%" h="auto" mx="4">
              <Wavesurfer
                src={preview}
                h="100%"
                cursorWidth={0}
                barHeight={2}
                responsive={true}
                playing={playing}
                normalize={true}
                waveColor={colorMode === 'light' ? '#ff5555' : '#50fa7b'}
                progressColor={colorMode === 'light' ? '#8a2d2d' : '#2f9747'}
              />
            </Box>
          </HStack>
        )}
      </Box>
      {/* </FormControl> */}
    </>
  )
}
