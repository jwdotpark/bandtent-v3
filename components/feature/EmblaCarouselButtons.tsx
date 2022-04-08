import { Button } from '@chakra-ui/react'
import React from 'react'

export const PrevButton = ({ enabled, onClick }) => (
  <Button
    // className="embla__button embla__button--prev"
    onClick={onClick}
    disabled={!enabled}
  >
    Prev
  </Button>
)

export const NextButton = ({ enabled, onClick }) => (
  <Button
    // className="embla__button embla__button--next"
    onClick={onClick}
    disabled={!enabled}
  >
    Next
  </Button>
)
