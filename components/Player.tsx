import { useState, useEffect } from 'react'
import { Box, Text, Center, useColorMode } from '@chakra-ui/react'
import { Rnd } from 'react-rnd'

const Player = () => {
  const { colorMode } = useColorMode()

  const rndNum = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max))
  }

  const [position, setPosition] = useState({
    x: rndNum(window.innerWidth / 2),
    y: rndNum(window.innerHeight / 2),
  })

  const panel = {
    w: 400,
    h: 200,
    z: 99999999,
  }

  return (
    <Rnd
      enableResizing={false}
      zIndex={panel.z}
      default={{
        x: position.x,
        y: position.y,
        width: panel.w,
        height: panel.h,
      }}
      updatePosition={{ x: position.x, y: position.y }}
      onDrag={(e: MouseEvent) => {
        console.log(e.x, e.y)
        setPosition({ x: e.x, y: e.y })
      }}
    >
      <Center
        boxShadow="xl"
        bg={colorMode === 'dark' ? '#323e56' : '#f5f5f5'}
        border="4px solid gray"
        borderRadius="xl"
        w={panel.w}
        h={panel.h}
        zIndex={panel.z}
      >
        <Center>
          <Text>x: {position.x}</Text>
          <Text>y: {position.y}</Text>
        </Center>
      </Center>
    </Rnd>
  )
}

export default Player
