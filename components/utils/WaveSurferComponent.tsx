// @ts-nocheck

import { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import { Box, Button, useColorMode } from '@chakra-ui/react'
import WaveSurfer from 'wavesurfer.js'
// import Wavesurfer from 'react-wavesurfer.js'

const WaveSurferComponent = (props) => {
  const { colorMode } = useColorMode()

  const containerRef = useRef()
  const waveSurferRef = useRef({
    isPlaying: () => false,
  })
  const [isPlaying, toggleIsPlaying] = useState(false)

  // console.log(props.url)
  const audio = props.url
  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      responsive: true,
      barWidth: 2,
      barHeight: 5,
      cursorWidth: 0,
      barGap: 0.01,
      height: 40,
      barRadius: 0.5,
      waveColor: '#000',
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
    <Box>
      <div ref={containerRef} />
      <Box w="100%" m="2">
        <Button
          size="sm"
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
