//  @ts-nocheck FIXME

import Layout from '../../components/Layout'
// import { Media } from '../../utils/media'
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
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
  // const { data } = useSession()
  const { colorMode } = useColorMode()

  const [, setNumOfPost] = useState(0)

  const pull_number = (data: number) => {
    setNumOfPost(data)
  }

  const uid = props.user?.id

  return (
    <Layout>
      {props ? (
        <>
          {/* desktop */}
          <Stack direction={['column', 'row']} m="2">
            {/* left */}
            <Box w="45vw">
              <Box
                position="sticky"
                top="2"
                p="2"
                bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
                borderRadius="xl"
                boxShadow="md"
                overflow="clip"
              >
                <Box
                  boxShadow="md"
                  pt="4"
                  borderRadius="xl"
                  m="2"
                  bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
                  overflow="clip"
                  py="4"
                >
                  <Center>
                    <Box
                      borderRadius="full"
                      overflow="clip"
                      boxSize="15rem"
                      alignContent="center"
                      boxShadow="xl"
                    >
                      <AspectRatio
                        maxW="500px"
                        ratio={1}
                        borderRadius="full"
                        overflow="clip"
                      >
                        <Image
                          src={props.user?.image}
                          fallbackSrc="https://picsum.photos/400"
                          alt={props.content}
                          w="100%"
                          objectFit="cover"
                        />
                      </AspectRatio>
                    </Box>
                  </Center>
                  <Box p="2">
                    <Box mt="2">
                      <Text fontSize="3xl" as="b" data-testid="user-name">
                        <Center>{props.user?.name}</Center>
                      </Text>
                    </Box>
                    <Box textAlign="left">
                      <Text fontSize="xl">
                        <Center>
                          <a href={'mailto:' + props.user?.email}>
                            <Text>{props.user?.email} </Text>
                          </a>
                        </Center>
                      </Text>
                      <Text fontSize="xl">
                        <Center>
                          <Link
                            isExternal
                            href={
                              'https://www.google.com/maps/search/' +
                              props.user?.location
                            }
                          >
                            <Text>{props.user?.location} </Text>
                          </Link>
                        </Center>
                      </Text>
                      <Text fontSize="md">
                        <Center>
                          <Link href={props.user?.website} isExternal>
                            <Text data-testid="website">
                              {props.user?.website}{' '}
                              <ExternalLinkIcon mx="2px" />
                            </Text>
                          </Link>
                        </Center>
                      </Text>
                    </Box>
                    <Box
                      m="4"
                      mt="2"
                      p="4"
                      borderRadius="xl"
                      bg={colorMode === 'light' ? 'gray.400' : 'gray.600'}
                    >
                      <Text fontSize="md">{props.user?.description}</Text>
                    </Box>
                  </Box>
                  <Box mx="2" my="-2">
                    <MeEdit props={props} />
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* right */}
            <Box
              // p="2"
              pt="2"
              bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
              boxShadow="md"
              w="60vw"
              borderRadius="xl"
              data-testid="my-post"
            >
              <MyPost func={pull_number} uid={uid} />
            </Box>
          </Stack>
        </>
      ) : (
        'You are not logged in!'
      )}
    </Layout>
  )
}

export default Me
