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
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
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
        <Slider moveThreshold={0.5}>
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
                    bottom="1rem"
                    left="1rem"
                    onClick={() => Router.push('/p/[id]', `/p/${slide.id}`)}
                    zIndex="tooltip"
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
                      <Box
                        right="0"
                        m="2"
                        p="4"
                        bg={colorMode === 'light' ? 'gray.800' : 'gray.900'}
                        borderRadius="xl"
                        boxShadow="md"
                      >
                        <Text fontSize="md" color="#fff">
                          <b>{slide.title}</b>
                        </Text>
                        <Text fontSize="md" color="#fff" noOnLines="1">
                          <b>{slide.content}</b>
                        </Text>
                        <Text fontSize="sm" color="#fff">
                          {slide.comments.length} reviews available!
                        </Text>
                      </Box>
                    </motion.div>
                  </Box>
                </Box>
                {/* <Box position="relative" border="1px solid red"> */}
                <Flex
                  position="absolute"
                  top="calc(50%)"
                  // border="1px solid red"
                  w="100%"
                >
                  <Box ml="4rem">
                    <ButtonBack>
                      <Button size="xl" variant="outline" borderRadius="full">
                        <ArrowBackIcon boxSize={10} color="#fff" />
                      </Button>
                    </ButtonBack>
                  </Box>
                  <Spacer />
                  <Box mr="4rem">
                    <ButtonNext>
                      <Button size="xl" variant="outline" borderRadius="full">
                        <ArrowForwardIcon boxSize={10} color="#fff" />
                      </Button>
                    </ButtonNext>
                  </Box>
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
