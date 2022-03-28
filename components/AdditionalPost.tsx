import { Box, Text, Divider, useColorMode } from '@chakra-ui/react'
import Router from 'next/router'
import ImageComponent from './utils/ImageComponent'

const AdditionalPost = ({ myPost }) => {
  const { colorMode } = useColorMode()

  return (
    <Box
      p="2"
      w="100%"
      mx="auto"
      sx={{ columnCount: [1, 2, 3, 4, 5], columnGap: '4' }}
    >
      {myPost
        .slice(0)
        .reverse()
        .map(
          (post: {
            id?: number
            title?: string
            imageUrl: string
            content: string
          }) => (
            <Box
              mb="4"
              w="100%"
              display="inline-block"
              onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}
            >
              <Box
                key={post.id}
                bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
                boxShadow="md"
                borderRadius="xl"
                p="4"
              >
                <Text fontSize="xl">{post.title}</Text>
                <Divider mb="2" />
                {post.imageUrl && <ImageComponent props={post} />}
                <Text noOfLines={1}>{post.content}</Text>
              </Box>
            </Box>
          )
        )}
    </Box>
  )
}

export default AdditionalPost
