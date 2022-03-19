import {
  Box,
  Button,
  Text,
  HStack,
  Divider,
  Stack,
  Image,
  Center,
} from '@chakra-ui/react'
import Router from 'next/router'

const AdditionalPost = ({ myPost }) => {
  console.log(myPost)
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
            my="2"
            display="inline-block"
            onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}
          >
            <Box key={post.id} border="2px solid gray" borderRadius="md" p="2">
              <Text>{post.title}</Text>
              <Center borderRadius="md" overflow="clip">
                <Image w="50%" src={post.imageUrl} overflow="clip" />
              </Center>
              <Text noOfLines={1}>{post.content}</Text>
            </Box>
          </Box>
        ))}
    </Box>
  )
}

export default AdditionalPost
