import Router from 'next/router'
import Layout from '../../components/Layout'
import { GetServerSideProps } from 'next'
import prisma from '../../lib/prisma'
import ImageComponent from '../../components/utils/ImageComponent'
import {
  Box,
  Text,
  Divider,
  Center,
  Image,
  useColorMode,
} from '@chakra-ui/react'
import moment from 'moment'
import { motion } from 'framer-motion'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const result = await prisma.post.findMany({
    where: {
      title: {
        search: String(params.result),
      },
      content: {
        search: String(params.result),
      },
    },
    include: {
      author: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return {
    props: {
      result: JSON.parse(JSON.stringify(result)),
    },
  }
}

const SearchPage = (props: { result: any[] }) => {
  const { colorMode } = useColorMode()

  return (
    <Layout>
      <Box
        bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
        // border="1px solid red"
        borderRadius="xl"
        p="2"
        m="2"
        // mt="2"
        boxShadow="md"
        overflow="clip"
      >
        <Box
          p="2"
          // mt="2"
          w="100%"
          mx="auto"
          sx={{ columnCount: [1, 2, 3, 4], columnGap: '4' }}
        >
          {props.result.length !== 0 &&
            props.result.map((post) => (
              <Box
                overflow="clip"
                borderRadius="xl"
                boxShadow="md"
                mb="4"
                w="100%"
                display="inline-block"
              >
                <Box
                  overflow="clip"
                  key={post.id}
                  // border="2px solid gray"
                  bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
                  borderRadius="xl"
                  p="4"
                >
                  <Box
                    _hover={{ cursor: 'pointer' }}
                    onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}
                  >
                    <Text fontSize="xl" noOfLines={3}>
                      {post.title}
                    </Text>
                    <Divider mb="2" />
                    {post.imageUrl && <ImageComponent props={post} />}
                    <Text noOfLines={3}>{post.content}</Text>
                  </Box>
                  {/* info */}
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                    }}
                    transition={{ ease: 'easeInOut', duration: 0.2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Box
                      _hover={{ cursor: 'pointer' }}
                      onClick={() =>
                        Router.push(
                          '/auth/[authorId]',
                          `/auth/${post.authorId}`
                        )
                      }
                      mt="4"
                      p="1"
                      boxShadow="md"
                      // border="2px solid gray"
                      bg={colorMode === 'light' ? 'gray.400' : 'gray.600'}
                      borderRadius="xl"
                    >
                      <Text
                        fontSize="sm"
                        sx={{ transform: 'translateX(-8px)' }}
                      >
                        <Center justifyContent="left" mx="2">
                          <Image
                            mr="2"
                            display="inline"
                            border="2px inset  gray"
                            src={post.author.image}
                            fallbackSrc="https://picsum.photos/200"
                            boxSize="1.5rem"
                            borderRadius="full"
                            // alt={post.author.name}
                          />
                          <b>{post.author.name}</b>,{' '}
                          {moment(post.createdAt).fromNow()}
                        </Center>
                      </Text>
                    </Box>
                  </motion.div>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
    </Layout>
  )
}

export default SearchPage
