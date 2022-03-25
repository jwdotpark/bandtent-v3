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
  useColorMode,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useState } from 'react'

const Me: React.FC = () => {
  const { data } = useSession()
  const { colorMode } = useColorMode()

  const [numOfPost, setNumOfPost] = useState(0)
  const pull_number = (data: number) => {
    setNumOfPost(data)
  }

  return (
    <Layout>
      {data ? (
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
                    <Center>
                      <Image
                        boxShadow="xl"
                        border="2px solid gray"
                        borderRadius="full"
                        boxSize="50%"
                        alt={data.user.name}
                        src={data.user.image}
                      />
                    </Center>
                    <Box p="2">
                      <Box mt="2">
                        <Text fontSize="3xl" as="b">
                          <Center>{data.user.name}</Center>
                        </Text>
                      </Box>
                      <Text fontSize="md">
                        <Center>
                          <a href={'mailto:' + data.user.email}>
                            <Text color="blue.400">{data.user.email}</Text>
                          </a>
                        </Center>
                      </Text>
                      <Text fontSize="md">
                        <Center>
                          <Link
                            isExternal
                            href={
                              'https://www.google.com/maps/search/' +
                              data.user.location
                            }
                          >
                            <Text color="blue.400">{data.user.location}</Text>
                          </Link>
                        </Center>
                      </Text>
                      <Text fontSize="md">
                        <Center>
                          <Link href={data.user.website} isExternal>
                            <Text color="blue.400">
                              {data.user.website} <ExternalLinkIcon mx="2px" />
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
                        <Text fontSize="md">{data.user.description}</Text>
                      </Box>
                    </Box>
                  </Box>
                  <Box mt="2" mx="2">
                    <MeEdit />
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
                        alt={data.user.name}
                        src={data.user.image}
                      />
                    </Center>
                    <Box p="2">
                      <Box mt="2">
                        <Text fontSize="3xl" as="b">
                          <Center>{data.user.name}</Center>
                        </Text>
                      </Box>
                      <Text fontSize="md">
                        <Center>
                          <a href={'mailto:' + data.user.email}>
                            <Text color="blue.400">{data.user.email}</Text>
                          </a>
                        </Center>
                      </Text>
                      <Text fontSize="md">
                        <Center>
                          <Link
                            isExternal
                            href={
                              'https://www.google.com/maps/search/' +
                              data.user.location
                            }
                          >
                            <Text color="blue.400">{data.user.location}</Text>
                          </Link>
                        </Center>
                      </Text>
                      <Text fontSize="md">
                        <Center>
                          <Link href={data.user.website} isExternal>
                            <Text color="blue.400">
                              {data.user.website} <ExternalLinkIcon mx="2px" />
                            </Text>
                          </Link>
                        </Center>
                      </Text>
                      <Box mt="2" p="4">
                        <Text fontSize="md">{data.user.description}</Text>
                      </Box>
                    </Box>
                  </Box>
                  <Box mt="2">
                    <MeEdit />
                  </Box>
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
