// @ts-nocheck

import { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import { Center, Box, Button, useColorMode } from '@chakra-ui/react'
import WaveSurfer from 'wavesurfer.js'
// import Wavesurfer from 'react-wavesurfer.js'

const WaveSurferComponent = (props) => {
  const { colorMode } = useColorMode()

  const containerRef = useRef()
  const waveSurferRef = useRef({
    isPlaying: () => false,
  })
  const [isPlaying, toggleIsPlaying] = useState(false)

  const audio = props.url
  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      backend: 'MediaElement',
      responsive: true,
      barWidth: 1,
      barHeight: 5,
      cursorWidth: 0,
      barGap: 1,
      height: 25,
      barRadius: 1,
      waveColor: '#555ab6',
      normalize: false,
    })
    waveSurfer.load(audio)
    waveSurfer.on('ready', () => {
      waveSurferRef.current = waveSurfer
    })

    return () => {
      waveSurfer.destroy()
    }
  }, [audio])

  return (
    <Box w="100%" mx="4">
      <Box w="100%" my="2" ref={containerRef} />
      <Box w="100vw">
        <Button
          display="none"
          size="xs"
          w="100%"
          onClick={() => {
            waveSurferRef.current.playPause()
            toggleIsPlaying(waveSurferRef.current.isPlaying())
          }}
          type="button"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
      </Box>
    </Box>
  )
}

export default WaveSurferComponent
