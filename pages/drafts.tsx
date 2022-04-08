import React from 'react'
import { GetServerSideProps } from 'next'
import { useSession, getSession } from 'next-auth/react'
import Layout from '../components/Layout'
import PostProps from '../types/Post'
import prisma from '../lib/prisma'
import { Box, Text, Image, useColorMode, Stack } from '@chakra-ui/react'
import Router from 'next/router'
import { motion } from 'framer-motion'
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })
  if (!session) {
    res.statusCode = 403
    return { props: { drafts: [] } }
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session.user.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  })
  return {
    props: {
      drafts: JSON.parse(JSON.stringify(drafts)),
    },
  }
}

type Props = {
  drafts: PostProps[]
}

const Drafts: React.FC<Props> = (props) => {
  const { colorMode } = useColorMode()
  const { data: session } = useSession()

  if (!session) {
    return (
      <Layout>
        <Text fontSize="lg">
          You need to be authenticated to view this page.
        </Text>
      </Layout>
    )
  }

  return (
    <Layout>
      <Box
        m="2"
        bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
        borderRadius="xl"
        boxShadow="md"
        px="1"
        py="1"
        pr="6"
      >
        <Box
          p="2"
          w="100%"
          mx="auto"
          sx={{ columnCount: [1, 2], columnGap: '4' }}
        >
          {props.drafts.map((post) => (
            <motion.div
              whileHover={{
                scale: 1.02,
              }}
              transition={{ ease: 'easeInOut', duration: 0.2 }}
              key={post.id}
            >
              <Box
                display="inline-block"
                bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
                borderRadius="xl"
                my="2"
                mx="2"
                boxShadow="md"
                w="100%"
              >
                <Box _hover={{ cursor: 'pointer' }}>
                  <Stack direction="row" p="4">
                    <Box
                      position="relative"
                      // border="1px solid red"
                      sx={{ aspectRatio: 1 }}
                      boxSize="150px"
                      h="75px"
                    >
                      <Box>
                        <motion.div
                          whileHover={{
                            scale: 1.02,
                          }}
                          whileTap={{
                            scale: 0.98,
                          }}
                          transition={{
                            ease: 'easeInOut',
                            duration: 0.2,
                          }}
                          key={post.id}
                        >
                          <Image
                            boxShadow="md"
                            borderRadius="xl"
                            loading="lazy"
                            src={
                              post.imageUrl
                                ? post.imageUrl
                                : 'https://picsum.photos/400'
                            }
                            alt={post.content}
                            objectFit="cover"
                            boxSize="100px"
                          />
                        </motion.div>
                      </Box>
                    </Box>
                    <Box
                      borderRadius="xl"
                      bg={colorMode === 'light' ? 'gray.400' : 'gray.600'}
                      p="2"
                      h="100px"
                      w="100%"
                      onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}
                    >
                      <Box p="2">
                        <Text fontSize="3xl" noOfLines={1}>
                          {post.title}
                        </Text>
                        <Text fontSize="md" noOfLines={1}>
                          {post.content}
                        </Text>
                      </Box>
                    </Box>
                  </Stack>
                  {/* info */}
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                    }}
                    transition={{
                      ease: 'easeInOut',
                      duration: 0.2,
                    }}
                  >
                    <Box
                      alignContent="right"
                      borderRadius="xl"
                      p="1"
                      mb="4"
                      // mt="1"
                      mx="4"
                      bg={colorMode === 'light' ? 'gray.400' : 'gray.600'}
                    >
                      <Text size="xs" mx="2" p="1">
                        Uploaded on{' '}
                        {new Date(post.createdAt).toLocaleDateString('en-DE', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Text>
                    </Box>
                  </motion.div>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Box>
    </Layout>
  )
}

export default Drafts
