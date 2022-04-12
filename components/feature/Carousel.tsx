// @ts-nocheck
import { Button, Box, Text, Flex, Spacer, useColorMode } from '@chakra-ui/react'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import ImageComponent from '../utils/ImageComponent'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'
import Router from 'next/router'

const EmblaCarousel = ({ props }) => {
  const { colorMode } = useColorMode()

  const slides = props

  return (
    <Box
      // w="100%"
      p="2"
      pb="4"
      borderRadius="xl"
      bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
    >
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={150}
        totalSlides={slides.length}
        isPlaying={true}
        interval={3000}
        infinite={true}
      >
        <Slider>
          <Box
          // w="100%"
          >
            {slides.map((slide, index) => (
              <Slide key={slide.id} index={index}>
                <motion.div
                  whileHover={{
                    scale: 1.02,
                  }}
                  transition={{
                    ease: 'circInOut',
                    duration: 0.2,
                  }}
                >
                  <Box p="4" pb="0">
                    <ImageComponent props={slide} />
                  </Box>
                </motion.div>
                <motion.div
                  whileHover={{
                    scale: 1.02,
                  }}
                  transition={{
                    ease: 'circInOut',
                    duration: 0.2,
                  }}
                >
                  <Box
                    m="2"
                    p="4"
                    _hover={{ cursor: 'pointer' }}
                    onClick={() => Router.push('/p/[id]', `/p/${slide.id}`)}
                  >
                    <Text fontSize="3xl">{slide.title}</Text>
                    <Text fontSize="2xl">{slide.content}</Text>
                    <Text fontSize="2xl">
                      {slide.comments.length} reviews available
                    </Text>
                  </Box>
                </motion.div>
              </Slide>
            ))}
          </Box>
        </Slider>
        <DotGroup />
        <Flex mx="2">
          <ButtonBack>
            <motion.div
              whileHover={{
                scale: 1.02,
              }}
              transition={{
                ease: 'circInOut',
                duration: 0.2,
              }}
            >
              <Button variant="outline" size="sm" borderRadius="full">
                <ArrowLeftIcon />
              </Button>
            </motion.div>
          </ButtonBack>

          <Spacer />
          <ButtonNext>
            <Button variant="outline" size="sm" borderRadius="full">
              <ArrowRightIcon />
            </Button>
          </ButtonNext>
        </Flex>
      </CarouselProvider>
    </Box>
  )
}

export default EmblaCarousel
