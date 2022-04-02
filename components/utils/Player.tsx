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
import { useAtom } from 'jotai'
import musicAtom from '../../store/store'

const Player = () => {
  const { colorMode } = useColorMode()
  const [music] = useAtom(musicAtom)
  
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
          {music.title} - {music.content}
        </Button>
      </ButtonGroup>
    </motion.div>
  )
}

export default Player
