//  @ts-nocheck FIXME

import Layout from '../../components/Layout'
import { useSession } from 'next-auth/react'
import { Media } from '../../utils/media'
import MyPost from '../../components/auth/MyPost'
import MeEdit from '../../components/auth/MeEdit'
import {
  Box,
  Text,
  Image,
  Stack,
  Center,
  Link,
  AspectRatio,
  useColorMode,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { GetServerSideProps } from 'next'
import prisma from '../../lib/prisma'
import ImageComponent from '../../components/utils/ImageComponent'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // console.log('ssr: ', params)
  const user = await prisma.user.findUnique({
    where: {
      id: Number(params.authorId),
    },
  })
  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  }
}

const Me: React.FC = (props) => {
  const user = props
  // console.log(props.user.name)

  const { data } = useSession()
  const { colorMode } = useColorMode()

  const [numOfPost, setNumOfPost] = useState(0)
  const pull_number = (data: number) => {
    setNumOfPost(data)
  }

  return (
    <Layout>
      {props ? (
        <>
          {/* desktop */}
          <Media greaterThanOrEqual="md">
            <Stack direction={['column', 'row']} m="2">
              {/* left */}
              <Box w="40vw">
                <Box
                  p="2"
                  // border="2px solid gray"
                  bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
                  borderRadius="xl"
                  boxShadow="md"
                  overflow="clip"
                >
                  <Box
                    boxShadow="md"
                    pt="4"
                    borderRadius="xl"
                    // border="2px solid gray"
                    m="2"
                    bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
                    overflow="clip"
                  >
                    <Center py="4">
                      <Box
                        borderRadius="full"
                        overflow="clip"
                        boxSize="200px"
                        alignContent="center"
                        boxShadow="xl"
                      >
                        <Box
                          my="2"
                          boxShadow="sm"
                          borderRadius="md"
                          overflow="hidden"
                        >
                          <AspectRatio
                            maxW="1000px"
                            ratio={1}
                            borderRadius="full"
                            overflow="clip"
                          >
                            <Image
                              src={props.user.image}
                              fallbackSrc="https://picsum.photos/400"
                              alt={props.content}
                              w="100%"
                              objectFit="cover"
                            />
                          </AspectRatio>
                        </Box>
                      </Box>
                    </Center>
                    <Box p="2">
                      <Box mt="2">
                        <Text fontSize="3xl" as="b">
                          <Center>{props.user.name}</Center>
                        </Text>
                      </Box>
                      <Text fontSize="md">
                        <Center>
                          <a href={'mailto:' + props.user.email}>
                            <Text color="blue.400">{props.user.email}</Text>
                          </a>
                        </Center>
                      </Text>
                      <Text fontSize="md">
                        <Center>
                          <Link
                            isExternal
                            href={
                              'https://www.google.com/maps/search/' +
                              props.user.location
                            }
                          >
                            <Text color="blue.400">{props.user.location}</Text>
                          </Link>
                        </Center>
                      </Text>
                      <Text fontSize="md">
                        <Center>
                          <Link href={props.user.website} isExternal>
                            <Text color="blue.400">
                              {props.user.website} <ExternalLinkIcon mx="2px" />
                            </Text>
                          </Link>
                        </Center>
                      </Text>
                      <Box
                        m="4"
                        mt="2"
                        p="4"
                        borderRadius="xl"
                        bg={colorMode === 'light' ? 'gray.400' : 'gray.600'}
                      >
                        <Text fontSize="md">{props.user.description}</Text>
                      </Box>
                    </Box>
                  </Box>
                  <Box mt="2" mx="2">
                    {/* <MeEdit props={props} /> */}
                  </Box>
                </Box>
              </Box>
              {/* right */}
              <Box
                p="2"
                bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
                boxShadow="md"
                w="60vw"
                borderRadius="xl"
              >
                <MyPost func={pull_number} />
              </Box>
            </Stack>
          </Media>

          {/* mobile */}
          <Media lessThan="md">
            <Stack direction={['column', 'row']} m="2">
              {/* left */}
              <Box boxShadow="md">
                <Box
                  p="2"
                  border="2px solid gray"
                  // w="40vw"
                  borderRadius="xl"
                  overflow="clip"
                >
                  <Box
                    boxShadow="md"
                    pt="4"
                    borderRadius="xl"
                    border="2px solid gray"
                    overflow="clip"
                  >
                    <Center>
                      <Image
                        boxShadow="xl"
                        border="2px solid gray"
                        borderRadius="full"
                        boxSize="50%"
                        alt={props.user.name}
                        src={props.user.image}
                      />
                    </Center>
                    <Box p="2">
                      <Box mt="2">
                        <Text fontSize="3xl" as="b">
                          <Center>{props.user.name}</Center>
                        </Text>
                      </Box>
                      <Text fontSize="md">
                        <Center>
                          <a href={'mailto:' + props.user.email}>
                            <Text color="blue.400">{props.user.email}</Text>
                          </a>
                        </Center>
                      </Text>
                      <Text fontSize="md">
                        <Center>
                          <Link
                            isExternal
                            href={
                              'https://www.google.com/maps/search/' +
                              props.user.location
                            }
                          >
                            <Text color="blue.400">{props.user.location}</Text>
                          </Link>
                        </Center>
                      </Text>
                      <Text fontSize="md">
                        <Center>
                          <Link href={props.user.website} isExternal>
                            <Text color="blue.400">
                              {props.user.website} <ExternalLinkIcon mx="2px" />
                            </Text>
                          </Link>
                        </Center>
                      </Text>
                      <Box mt="2" p="4">
                        <Text fontSize="md">{props.user.description}</Text>
                      </Box>
                    </Box>
                  </Box>
                  <Box mt="2">{/* <MeEdit /> */}</Box>
                </Box>
              </Box>
              {/* right */}
              <Box p="2" border="2px solid gray" borderRadius="xl">
                <MyPost />
              </Box>
            </Stack>
          </Media>
        </>
      ) : (
        'You are not logged in!'
      )}
    </Layout>
  )
}

export default Me
