import React, { useState, useEffect, useRef } from 'react'
import {
  Box,
  Text,
  Center,
  useColorMode,
  Button,
  ButtonGroup,
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
    <motion.div
      whileHover={{
        scale: 1.02,
      }}
      transition={{ ease: 'easeInOut', duration: 0.2 }}
    >
      <Box display="none">
        <ReactPlayer playing={playing} url={music.fileUrl} />
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
        <Button
          size="sm"
          py="2"
          color={colorMode === 'light' ? null : '#f1fa8c'}
        >
          {music.title} - {music.content}
        </Button>
      </ButtonGroup>
    </motion.div>
  )
})

export default Player
