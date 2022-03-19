import { Box, Image } from '@chakra-ui/react'

const ImageComponent = (post: {
  props: { imageUrl: string; content: string }
}) => {
  return (
    <Box my="2" boxShadow="sm" borderRadius="md" overflow="hidden">
      <Image
        src={post.props.imageUrl}
        alt={post.props.content}
        w="100%"
        objectFit="cover"
      />
    </Box>
  )
}

export default ImageComponent
