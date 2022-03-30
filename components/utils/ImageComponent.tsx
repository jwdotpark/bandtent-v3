import { Box, Image, AspectRatio, Center, useColorMode } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const ImageComponent = (post: {
  props: { imageUrl: string; content: string }
}) => {
  const { colorMode } = useColorMode()
  return (
    // <motion.div
    //   whileHover={{
    //     scale: 1.02,
    //   }}
    //   transition={{ ease: 'easeInOut', duration: 0.2 }}
    //   // whileTap={{ scale: 0.98 }}
    // >
    <Box
      my="2"
      // boxShadow="md"
      sx={{
        boxShadow:
          'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
      }}
      borderRadius="xl"
      overflow="clip"
      // border="1rem ridge"
      // borderBottom="1rem i"
      borderColor={colorMode === 'light' ? 'gray.100' : 'gray.300'}
    >
      <AspectRatio
        maxW="1080px"
        ratio={1}
        // borderRadius="xl"
        overflow="clip"
        // m="-1"
      >
        <Image
          // borderRadius="xl"
          loading="lazy"
          src={
            post.props.imageUrl
              ? post.props.imageUrl
              : 'https://picsum.photos/400'
          }
          // src={post.props.imageUrl}
          // fallbackSrc="https://via.placeholder.com/300x300"
          alt={post.props.content}
          // w="100%"
          objectFit="cover"
        />
      </AspectRatio>
    </Box>
    // </motion.div>
  )
}

export default ImageComponent
