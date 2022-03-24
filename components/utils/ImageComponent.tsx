import { Box, Image, AspectRatio } from '@chakra-ui/react'

const ImageComponent = (post: {
  props: { imageUrl: string; content: string }
}) => {
  return (
    <Box my="2" boxShadow="sm" borderRadius="md" overflow="hidden">
      <AspectRatio maxW="1080px" ratio={1} borderRadius="xl" overflow="clip">
        <Image
          loading="lazy"
          src={
            post.props.imageUrl
              ? post.props.imageUrl
              : 'https://picsum.photos/400'
          }
          // src={post.props.imageUrl}
          fallbackSrc="https://via.placeholder.com/300x300"
          alt={post.props.content}
          w="100%"
          objectFit="cover"
        />
      </AspectRatio>
    </Box>
  )
}

export default ImageComponent
