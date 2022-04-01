import { useState, useEffect } from 'react'
import {
  Box,
  Text,
  Center,
  useColorMode,
  Button,
  ButtonGroup,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

const Player = () => {
  const { colorMode } = useColorMode()
  return (
    <ButtonGroup isAttached>
      <Button variant="solid" size="sm" colorScheme="purple">
        ⫸
      </Button>
      <Button size="sm" py="2" color={colorMode === 'light' ? null : '#f1fa8c'}>
        Bufo Alvarius (Deafblind Remix) - Hypho, Xakra, Deafblind
      </Button>
    </ButtonGroup>
  )
}

export default Player
