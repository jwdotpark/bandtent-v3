import React, { useState, useEffect, useRef } from 'react'
import {
  Box,
  Text,
  Center,
  useColorMode,
  Button,
  ButtonGroup,
  VStack,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import ReactPlayer from 'react-player'
import { useAtom } from 'jotai'
import musicAtom from '../../store/store'

const Player = React.memo(function PlayerComponent() {
  const { colorMode } = useColorMode()
  const [music] = useAtom(musicAtom)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    setPlaying(true)
  }, [music])

  const handlePlayButtonClick = () => {
    setPlaying(!playing)
  }

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      zIndex="tooltip"
      w="100%"
      bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
    >
      <Box display="none">
        <ReactPlayer playing={playing} url={music.fileUrl} />
        {/* <audio id="audio" src={music.fileUrl} controls /> */}
      </Box>
      <ButtonGroup isAttached>
        <Button
          variant="solid"
          size="sm"
          colorScheme="purple"
          onClick={handlePlayButtonClick}
        >
          {playing ? 'Pause' : 'Play'}
        </Button>
        <Center border="1px solid red">
          {music.title} - {music.content}
        </Center>
      </ButtonGroup>
    </Box>
  )
})

export default Player
