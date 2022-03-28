import { Box, Image, AspectRatio, Center, useColorMode } from '@chakra-ui/react'

const ImageComponent = (post: {
  props: { imageUrl: string; content: string }
}) => {
  const { colorMode } = useColorMode()
  return (
    <Box
      my="2"
      // boxShadow="md"
      sx={{
        boxShadow:
          'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
      }}
      borderRadius="xl"
      overflow="clip"
      border="1rem solid"
      borderBottom="4rem solid"
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
  )
}

export default ImageComponent
