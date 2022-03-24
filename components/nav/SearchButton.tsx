import { useState } from 'react'
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
import Router from 'next/router'

const SearchButton = () => {
  const [searchResult, setSearchResult] = useState()
  const [keyword, setKeyword] = useState('')
  const handleSearch = () => {
    // fetch('/api/post/search')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data)
    //     setSearchResult(searchResult)
    //   })
    Router.push('/search/' + keyword)
  }

  return (
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
          onChange={(e) => {
            setKeyword(e.target.value)
          }}
        />
        <InputRightElement
          sx={{ borderLeftRadius: 'none' }}
          _hover={{ cursor: 'pointer' }}
          pointerEvents="stroke"
          children={
            <Button
              size="sm"
              variant="solid"
              borderLeftRadius="none"
              onClick={handleSearch}
            >
              <ChevronRightIcon />
            </Button>
          }
        />
      </InputGroup>
    </Box>
  )
}

export default SearchButton
