import Link from 'next/link'
import {
  Box,
  Button,
  Input,
  InputLeftElement,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react'
import { SearchIcon, ChevronRightIcon } from '@chakra-ui/icons'
import useSWR from 'swr'

const Search = () => {
  const fetcher = async (query: string) => {
    const res = await fetch(`/api/search?q=${query}`)
    return await res.json()
  }

  const result = useSWR('/api/search', fetcher)
  console.log(result)

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
          <InputRightElement
            sx={{ borderLeftRadius: 'none' }}
            _hover={{ cursor: 'pointer' }}
            pointerEvents="stroke"
            children={
              <Button size="sm" variant="solid" borderLeftRadius="none">
                <ChevronRightIcon />
              </Button>
            }
          />
        </InputGroup>
      </Box>
    </Link>
  )
}

export default Search
