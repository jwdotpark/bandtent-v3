import { Box, Image, AspectRatio, Center, useColorMode } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const ImageComponent = (post: {
  props: { imageUrl: string; content: string }
}) => {
  const { colorMode } = useColorMode()
  return (
    <Box
      my="2"
      sx={{
        boxShadow:
          'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
      }}
      borderRadius="xl"
      overflow="clip"
      borderColor={colorMode === 'light' ? 'gray.100' : 'gray.300'}
    >
      <AspectRatio maxW="1080px" ratio={1} overflow="clip">
        <Image
          loading="lazy"
          src={
            post.props.imageUrl
              ? post.props.imageUrl
              : 'https://picsum.photos/400'
          }
          alt={post.props.content}
          objectFit="cover"
          // boxSize="150px"
        />
      </AspectRatio>
    </Box>
  )
}

export default ImageComponent
