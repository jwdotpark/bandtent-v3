import { useS3Upload } from 'next-s3-upload'
import { useState } from 'react'
import {
  Box,
  Text,
  FormControl,
  Center,
  useColorMode,
  Progress,
} from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
// import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'

export default function UploadPage(props) {
  const { colorMode } = useColorMode()
  const [fileUrl, setFileUrl] = useState<string>()
  const { uploadToS3, files } = useS3Upload()
  props.data(fileUrl)

  // TODO trasncode before upload
  let handleFileChange = async (event) => {
    console.log('file upload init')
    let file = event.target.files[0]
    let { url } = await uploadToS3(file)
    setFileUrl(url)
  }

  const { getRootProps, getInputProps } = useDropzone()

  // // ffmpeg
  // const [audio, setAudio] = useState('./audio.mp3')
  // const [message, setMessage] = useState('Click to transcode')
  // const ffmpeg = createFFmpeg({
  //   log: true,
  // })

  // const doTranscode = async () => {
  //   setMessage('Loading ffmpeg-core.js')
  //   await ffmpeg.load()
  //   setMessage('Start transcoding')
  //   ffmpeg.FS('writeFile', 'audio.mp3', await fetchFile(audio))
  //   await ffmpeg.run('-i', 'audio.mp3', 'someother.wav')
  //   setMessage('Complete transcoding')
  //   const data = ffmpeg.FS('readFile', 'test.mp4')
  //   setAudio(
  //     URL.createObjectURL(new Blob([data.buffer], { type: 'audio/mp3' }))
  //   )
  // }

  // const handleMPEGclick = (e) => {
  //   e.preventDefault()
  //   doTranscode
  // }

  // console.log(audio)
  // console.log(fileUrl)

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
          {/* <Box>
            <audio src="./audio.mp3" controls />
            <button onClick={handleMPEGclick}>Start</button>
            <p>{message}</p>
          </Box> */}
          <Box my="4">
            {files.length === 0 && (
              <Center
                w="100%"
                h="10vh"
                borderRadius="md"
                bg={colorMode === 'light' ? 'gray.100' : '#394353'}
              >
                <Text fontSize="3xl">Click to select music</Text>
              </Center>
            )}
          </Box>
        </div>
        <Box>
          {files &&
            files.map((file, index) => (
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
