import Link from 'next/link'
import {
  Stack,
  Flex,
  Spacer,
  Box,
  Text,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  InputLeftElement,
  InputGroup,
} from '@chakra-ui/react'
import {
  ChevronDownIcon,
  AddIcon,
  PlusSquareIcon,
  EditIcon,
  ChatIcon,
  WarningIcon,
  TimeIcon,
  LockIcon,
  UnlockIcon,
  HamburgerIcon,
  SearchIcon,
} from '@chakra-ui/icons'

const Search = () => {
  return (
    <Link href="/">
      <Box className="bold">
        <InputGroup size="sm">
          <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
          <Input
            variant="filled"
            type="text"
            size="sm"
            boxShadow="md"
            placeholder="Search"
            borderRadius="md"
            border="2px solid gray"
          />
        </InputGroup>
      </Box>
    </Link>
  )
}

export default Search
