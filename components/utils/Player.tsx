/* eslint-disable no-unused-vars */
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

  const currentBpmButton = () => {
    return (
      <Button size="xs" borderRadius="full" colorScheme="blue">
        <Text sx={{ fontSize: '10px' }}>{(100 * (bpm - 1)).toFixed(1)}</Text>
      </Button>
    )
  }

  const currentVolumeButton = () => {
    return (
      <Button size="xs" borderRadius="full" colorScheme="blue">
        <Text sx={{ fontSize: '10px' }}>{(volume * 100).toFixed(0)}</Text>
      </Button>
    )
  }

  const handlePositionChange = (position) => {
    // console.log('pos changed: ', position)
  }
  const onReadyHandler = () => {
    // console.log('done loading!')
  }

  useEffect(() => {
    setBpm(1)
  }, [music])

  console.log(music)

  return (
    <HStack
      w="calc(100vw)"
      position="fixed"
      bottom="0"
      left="0"
      p="1"
      bg={colorMode === 'light' ? 'gray.400' : '#383a59'}
      zIndex="tooltip"
      sx={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)' }}
    >
      <Button size="sm" variant="ghost" onClick={handlePlayButtonClick}>
        {playing ? <BsFillPauseFill size={30} /> : <BsFillPlayFill size={30} />}
      </Button>

      <Popover placement="top-end">
        <PopoverTrigger>
          <Button size="sm" variant="ghost">
            <GiSettingsKnobs size={20} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          px="2"
          borderRadius="xl"
          sx={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)' }}
          bg={colorMode === 'light' ? 'gray.400' : 'gray.700'}
          border={colorMode === 'light' ? 'gray.400' : 'gray.700'}
        >
          <PopoverArrow bg={colorMode === 'light' ? 'gray.400' : 'gray.700'} />
          <PopoverCloseButton />
          <PopoverBody p="4" my="2">
            Pitch
            <Slider
              my="2"
              aria-label="slider-ex-1"
              defaultValue={1}
              value={bpm}
              onChange={(value) => setBpm(value)}
              step={0.0001}
              min={0.92}
              max={1.08}
              onDoubleClick={() => setBpm(1)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb>
                <SliderThumb>
                  <Box color="tomato" as={currentBpmButton} />
                </SliderThumb>
              </SliderThumb>
            </Slider>
            Volume
            <Slider
              mt="2"
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
              <SliderThumb>
                <Box color="tomato" as={currentVolumeButton} />
              </SliderThumb>
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
        <Center h="auto" fontSize="sm">
          <Text sx={{ whiteSpace: 'nowrap' }}>
            <b>{music.content}</b>
          </Text>
        </Center>
      </HStack>
      <Box w="100%" h="20px" m="1" pr="6">
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
          waveColor={colorMode === 'light' ? '#ff5555' : '#50fa7b'}
          volume={volume}
          audioRate={bpm}
          progressColor={colorMode === 'light' ? '#8a2d2d' : '#2f9747'}
          onFinish={() => {
            setPlaying(false)
          }}
        />
      </Box>
    </HStack>
  )
})

export default Player
