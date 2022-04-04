import React, { useState, useEffect } from 'react'
import {
  Box,
  Text,
  Center,
  useColorMode,
  Button,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react'
import { useAtom } from 'jotai'
import musicAtom from '../../store/store'
import Wavesurfer from 'react-wavesurfer.js'
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import { GiSettingsKnobs } from 'react-icons/gi'
import Router from 'next/router'

const Player = React.memo(function PlayerComponent() {
  const { colorMode } = useColorMode()
  const [music] = useAtom(musicAtom)

  useEffect(() => {
    setPlaying(true)
  }, [music])

  const handlePlayButtonClick = () => {
    setPlaying(!playing)
  }

  // wavesurfer options
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [position, setPosition] = useState(0)
  const [muted, setMuted] = useState(false)
  const [bpm, setBpm] = useState(1)

  const handlePositionChange = (position) => {
    // console.log('pos changed: ', position)
  }
  const onReadyHandler = () => console.log('done loading!')

  // set bpm when new music loaded
  useEffect(() => {
    setBpm(1)
  }, [music])

  return (
    <HStack
      w="calc(100vw - 28px)"
      position="fixed"
      bottom="6px"
      left="8px"
      p="2"
      borderRadius="xl"
      bg={colorMode === 'light' ? 'gray.300' : '#383a59'}
      zIndex="tooltip"
      sx={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)' }}
    >
      <Button mx="1" size="sm" variant="ghost" onClick={handlePlayButtonClick}>
        {playing ? <BsFillPauseFill /> : <BsFillPlayFill />}
      </Button>

      <Popover placement="top-end">
        <PopoverTrigger>
          <Button mx="1" size="sm" variant="ghost">
            <GiSettingsKnobs />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          borderRadius="xl"
          sx={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)' }}
          bg={colorMode === 'light' ? 'gray.200' : 'gray.800'}
        >
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody p="4">
            bpm
            <Slider
              aria-label="slider-ex-1"
              defaultValue={1}
              value={bpm}
              onChange={(value) => setBpm(value)}
              step={0.01}
              min={0.5}
              max={1.5}
              onDoubleClick={() => setBpm(1)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            volume
            <Slider
              aria-label="slider-ex-1"
              defaultValue={100}
              value={volume}
              onChange={(value) => setVolume(value)}
              step={0.01}
              min={0}
              max={1}
              onDoubleClick={() => setVolume(1)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <HStack
        h="auto"
        onClick={() => Router.push('/p/[id]', `/p/${music.id}`)}
        _hover={{ cursor: 'pointer' }}
      >
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
          pos={position}
          onPositionChange={handlePositionChange}
          onReady={onReadyHandler}
          playing={playing}
          responsive={true}
          autoCenter={true}
          barHeight={2}
          height={20}
          cursorWidth={0}
          waveColor={colorMode === 'light' ? '#bd93f9' : '#50fa7b'}
          volume={volume}
          audioRate={bpm}
          progressColor={colorMode === 'light' ? '#7a5f9f' : '#2f9747'}
          onFinish={() => {
            setPlaying(false)
          }}
        />
      </Box>
    </HStack>
  )
})

export default Player
