/* eslint-disable react/no-children-prop */
import { useState } from 'react'
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
  const [keyword, setKeyword] = useState('')

  const handleSearch = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    if (keyword) {
      Router.push('/search/' + keyword)
    }
  }
  return (
    <Box className="bold">
      <form>
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
            data-testid="searchButton"
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
                // data-testid="searchButton"
                type="submit"
                size="sm"
                variant="linked"
                borderLeftRadius="none"
                onClick={handleSearch}
              >
                <ChevronRightIcon />
              </Button>
            }
          />
        </InputGroup>
      </form>
    </Box>
  )
}

export default SearchButton
