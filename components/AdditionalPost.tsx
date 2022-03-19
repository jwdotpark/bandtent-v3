import {
  Box,
  Button,
  Text,
  HStack,
  Divider,
  Stack,
  Image,
  Center,
  AspectRatio,
} from '@chakra-ui/react'
import Router from 'next/router'

const AdditionalPost = ({ myPost }) => {
  // console.log(myPost)
  // random integer generator
  const rndNum = (max) => {
    return Math.floor(Math.random() * Math.floor(max))
  }

  return (
    <Box
      p="2"
      w="100%"
      mx="auto"
      sx={{ columnCount: [1, 2, 3], columnGap: '8px' }}
    >
      {myPost
        .slice(0)
        .reverse()
        .map((post) => (
          <Box
            boxShadow="md"
            mb="4"
            w="100%"
            display="inline-block"
            onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}
          >
            <Box key={post.id} border="2px solid gray" borderRadius="md" p="2">
              <Text fontSize="xl">{post.title}</Text>
              {post.imageUrl && (
                <AspectRatio ratio={1} borderRadius="md" overflow="clip">
                  <Image
                    boxSize="50%"
                    src={post.imageUrl}
                    borderRadius="md"
                    overflow="clip"
                  />
                </AspectRatio>
              )}
              <Text noOfLines={1}>{post.content}</Text>
            </Box>
          </Box>
        ))}
    </Box>
  )
}

export default AdditionalPost
