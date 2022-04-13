import { Button, useColorMode } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

const ColorButton = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Button size="sm" onClick={toggleColorMode} data-testid="colorButton">
      {colorMode === 'light' ? (
        <MoonIcon w={3} h={3} />
      ) : (
        <SunIcon w={3} h={3} />
      )}
    </Button>
  )
}

export default ColorButton
