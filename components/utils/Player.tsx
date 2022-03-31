import { useState, useEffect } from 'react'
import { Box, Text, Center, useColorMode, Button } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const Player = () => {
  const { colorMode } = useColorMode()
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
      }}
      transition={{ ease: 'easeInOut', duration: 0.25 }}
      whileFocus={{ scale: 1.05 }}
    >
      <Button size="sm" py="2" color={colorMode === 'light' ? null : '#f1fa8c'}>
        Bufo Alvarius (Deafblind Remix) - Hypho, Xakra, Deafblind
      </Button>
    </motion.div>
  )
}

export default Player
