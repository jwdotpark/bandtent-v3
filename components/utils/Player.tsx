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
    <motion.div
      whileHover={{
        scale: 1.02,
      }}
      transition={{ ease: 'easeInOut', duration: 0.2 }}
    >
      <ButtonGroup isAttached>
        <Button variant="solid" size="sm" colorScheme="purple">
          ⫸
        </Button>
        <Button
          size="sm"
          py="2"
          color={colorMode === 'light' ? null : '#f1fa8c'}
        >
          Bufo Alvarius (Deafblind Remix) - Hypho, Xakra, Deafblind
        </Button>
      </ButtonGroup>
    </motion.div>
  )
}

export default Player
