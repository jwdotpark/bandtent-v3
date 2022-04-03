import React, { useState, useEffect, useRef } from 'react'
import {
  Box,
  Text,
  Center,
  useColorMode,
  Button,
  ButtonGroup,
  VStack,
  Stack,
  HStack,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import musicAtom from '../../store/store'
import Wavesurfer from 'react-wavesurfer.js'
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import { GiSettingsKnobs } from 'react-icons/gi'

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

  // wavesurfer
  const [position, setPosition] = useState(0)
  // const [muted, setMuted] = useState(false)

  const handlePositionChange = (position) => {
    // console.log('pos changed: ', position)
  }
  const onReadyHandler = () => console.log('done loading!')

  return (
    <HStack
      w="calc(100vw)"
      // borderRadius="xl"
      // border="2px solid green"
      position="fixed"
      bottom="0"
      left="0"
      p="2"
      // h="30px"
      bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
      zIndex="tooltip"
      // pl="10"
      sx={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)' }}
    >
      <Button mx="1" size="xl" onClick={handlePlayButtonClick}>
        {playing ? <BsFillPauseFill /> : <BsFillPlayFill />}
      </Button>
      <Button mx="1" size="xl">
        <GiSettingsKnobs />
      </Button>
      <HStack h="auto">
        <Center h="auto" fontSize="sm">
          <Text sx={{ whiteSpace: 'nowrap' }}>
            <b>{music.title}</b>
          </Text>
        </Center>
        <Center h="auto" mr="2" fontSize="sm">
          <Text sx={{ whiteSpace: 'nowrap' }}>
            <b>{music.content}</b>
          </Text>
        </Center>
      </HStack>
      <Box w="100%" h="20px" m="2">
        <Wavesurfer
          src={music.fileUrl}
          position={position}
          onPositionChange={handlePositionChange}
          onReady={onReadyHandler}
          playing={playing}
          responsive={true}
          autoCenter={true}
          barHeight={2}
          audioRate={1}
          height={20}
          cursorWidth={0}
          waveColor={colorMode === 'light' ? '#bd93f9' : '#50fa7b'}
        />
      </Box>
      <Box></Box>
    </HStack>
  )
})

export default Player
