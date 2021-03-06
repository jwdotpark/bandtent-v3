import { Box, Button, Center, Stack, useColorMode } from '@chakra-ui/react'

const FooterPlayer = () => {
  const { colorMode } = useColorMode()
  // const url = './audio.mp3'
  // console.log(url)
  return (
    <Box
      position="fixed"
      bottom="0"
      right="0"
      // height="auto"
      w="100%"
      bg={colorMode === 'light' ? '#cbd5e0' : '#383a59'}
      zIndex="tooltip"
    >
      <Stack direction={['column', 'row']}>
        <Center mx="2">
          <Button size="xs">Play</Button>
        </Center>
        {/* <WaveSurferComponent url={url} /> */}
      </Stack>
    </Box>
  )
}

export default FooterPlayer
