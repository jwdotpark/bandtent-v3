import { Box, Image } from '@chakra-ui/react'

const ImageComponent = (post: {
  props: { imageUrl: string; content: string }
}) => {
  console.log(post.props)
  return (
    <Box my="2">
      <Image
        borderRadius="xl"
        src={post.props.imageUrl}
        alt={post.props.content}
        w="100%"
        objectFit="cover"
      />
    </Box>
  )
}

export default ImageComponent
