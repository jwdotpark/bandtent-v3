import { Box, Text, useColorMode } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Router from 'next/router'
import ImageComponent from './utils/ImageComponent'

const AdditionalPost = ({ myPost }: any) => {
  const { colorMode } = useColorMode()

  return (
    <Box
      p="2"
      w="100%"
      mx="auto"
      sx={{ columnCount: [1, 2, 3], columnGap: '4' }}
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
            <motion.div
              whileHover={{
                scale: 1.02,
              }}
              transition={{ ease: 'easeInOut', duration: 0.2 }}
              key={post.id}
            >
              <Box
                // key={post.id}
                mb="4"
                w="100%"
                display="inline-block"
                onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}
              >
                <Box
                  bg={colorMode === 'light' ? 'gray.400' : 'gray.700'}
                  boxShadow="md"
                  borderRadius="xl"
                  p="4"
                >
                  <Box
                    p="2"
                    mb="4"
                    borderRadius="xl"
                    boxShadow="md"
                    bg={colorMode === 'light' ? 'gray.300' : 'gray.600'}
                  >
                    <Text fontSize="xl">{post.title}</Text>
                    <Text noOfLines={1}>{post.content}</Text>
                  </Box>
                  <Box mt="2">
                    {post.imageUrl && <ImageComponent props={post} />}
                  </Box>
                </Box>
              </Box>
            </motion.div>
          )
        )}
    </Box>
  )
}

export default AdditionalPost
