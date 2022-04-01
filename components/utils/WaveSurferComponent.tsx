// @ts-nocheck

import { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import { Box, Button, useColorMode } from '@chakra-ui/react'
// import WaveSurfer from 'wavesurfer.js'
import Wavesurfer from 'react-wavesurfer.js'

const WaveSurferComponent = (props) => {
  const { colorMode } = useColorMode()
  const [playing, setPlaying] = useState(false)
  const [position, setPosition] = useState(0)
  const [muted, setMuted] = useState(false)

  const handlePositionChange = (position) => {
    // console.log(position)
  }
  const onReadyHandler = () => console.log('done loading!')

  const handlePlay = () => {
    setPlaying(!playing)
  }

  return (
    <Box border="1px solid green">
      <Wavesurfer
        // src="./audio.mp3"
        src={props.url}
        position={position}
        onPositionChange={handlePositionChange}
        onReady={onReadyHandler}
        playing={playing}
        muted={muted}
        // responsive={true}
        waveColor={colorMode === 'light' ? 'red.100' : 'red.300'}
        progressColor={colorMode === 'light' ? 'red.100' : 'red.300'}
        cursorColor={colorMode === 'light' ? 'red.100' : 'red.300'}
      />
      <Button onClick={handlePlay}>{playing ? 'Pause' : 'Play'}</Button>
    </Box>
  )
}

export default WaveSurferComponent
