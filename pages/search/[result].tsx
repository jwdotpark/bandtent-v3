import Router from 'next/router'
import Layout from '../../components/Layout'
import { GetServerSideProps } from 'next'
import prisma from '../../lib/prisma'
import ImageComponent from '../../components/utils/ImageComponent'
import { Box, Text, Center, Image, useColorMode, Flex } from '@chakra-ui/react'
import moment from 'moment'
import { motion } from 'framer-motion'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const queries = JSON.stringify(params?.result)
  const result = await prisma.post.findMany({
    where: {
      title: {
        search: queries.split(' ').join(' | '),
      },
      content: {
        search: queries.split(' ').join(' | '),
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
          sx={{ columnCount: [1, 2, 3, 4, 5], columnGap: '4' }}
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
                key={post.id}
              >
                <Box
                  overflow="clip"
                  bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
                  borderRadius="xl"
                  p="4"
                >
                  <Box
                    _hover={{ cursor: 'pointer' }}
                    onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}
                  >
                    <Box
                      p="2"
                      pl="4"
                      mb="4"
                      boxShadow="md"
                      bg={colorMode === 'light' ? 'gray.400' : 'gray.600'}
                      borderRadius="xl"
                    >
                      <Text fontSize="xl" noOfLines={3}>
                        {post.title}
                        <Text noOfLines={3} fontSize="md">
                          {post.content}
                        </Text>
                      </Text>
                    </Box>
                    {/* <Divider my="2" /> */}
                    {post.imageUrl && <ImageComponent props={post} />}
                  </Box>
                  {/* info */}
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                    }}
                    transition={{ ease: 'circInOut', duration: 0.2 }}
                  >
                    <Flex
                      p="2"
                      direction="row"
                      _hover={{ cursor: 'pointer' }}
                      onClick={() =>
                        Router.push(
                          '/auth/[authorId]',
                          `/auth/${post.authorId}`
                        )
                      }
                      mt="4"
                      boxShadow="md"
                      bg={colorMode === 'light' ? 'gray.400' : 'gray.600'}
                      borderRadius="xl"
                    >
                      <Center>
                        <Image
                          mr="2"
                          display="inline"
                          src={post.author.image}
                          fallbackSrc="https://picsum.photos/200"
                          boxSize="2.25rem"
                          borderRadius="full"
                          alt={post.author.name}
                        />
                      </Center>
                      <Box>
                        <Text
                          sx={{ whiteSpace: 'nowrap' }}
                          noOfLines={1}
                          fontSize="sm"
                        >
                          <b>{post.author.name}</b>
                        </Text>
                        <Text fontSize="sm" sx={{ whiteSpace: 'nowrap' }}>
                          {moment(post.createdAt).fromNow()}
                        </Text>
                      </Box>
                    </Flex>
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
