// @ts-nocheck
import { Button, Box, Text, Flex, Spacer, useColorMode } from '@chakra-ui/react'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
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
        naturalSlideHeight={102}
        totalSlides={slides.length}
        isPlaying={true}
        interval={3000}
        infinite={true}
      >
        <Slider>
          <Box>
            {slides.map((slide, index) => (
              <Slide key={slide.id} index={index}>
                <Box
                  bg={colorMode === 'light' ? 'gray.200' : 'gray.800'}
                  p="4"
                  m="2"
                  borderRadius="xl"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                    }}
                    transition={{
                      ease: 'easeInOut',
                      duration: 0.2,
                    }}
                  >
                    <Box p="2" zIndex="toast">
                      <ImageComponent props={slide} />
                    </Box>
                  </motion.div>

                  <Box
                    m="2"
                    p="2"
                    _hover={{ cursor: 'pointer' }}
                    position="absolute"
                    top="2rem"
                    left="2rem"
                    onClick={() => Router.push('/p/[id]', `/p/${slide.id}`)}
                    zIndex="tooltip"
                    textShadow="1px 2px 3px black"
                  >
                    <motion.div
                      whileHover={{
                        scale: 1.02,
                      }}
                      transition={{
                        ease: 'easeInOut',
                        duration: 0.2,
                      }}
                    >
                      <Text fontSize="4xl" color="#fff">
                        {slide.title}
                      </Text>
                      <Text color="#fff" fontSize="3xl">
                        {slide.content}
                      </Text>
                      <Text fontSize="2xl" color="#fff">
                        {slide.comments.length} reviews available
                      </Text>
                    </motion.div>
                  </Box>
                </Box>
                {/* <Box position="relative" border="1px solid red"> */}
                <Flex
                  position="absolute"
                  mx="2"
                  // top="-200px"
                  // top="-2rem"
                  left="2rem"
                  sx={{ transform: 'translateY(-80px)' }}
                >
                  <ButtonBack>
                    <Button variant="ghost" size="sm" borderRadius="full">
                      <ArrowLeftIcon />
                    </Button>
                  </ButtonBack>
                  <Spacer />
                  <ButtonNext>
                    <Button variant="ghost" size="sm" borderRadius="full">
                      <ArrowRightIcon />
                    </Button>
                  </ButtonNext>
                </Flex>
                {/* </Box> */}
              </Slide>
            ))}
          </Box>
        </Slider>
      </CarouselProvider>
    </Box>
  )
}

export default EmblaCarousel
