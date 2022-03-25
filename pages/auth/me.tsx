import Layout from '../../components/Layout'
import { useSession } from 'next-auth/react'
import { Media } from '../../utils/media'
import MyPost from '../../components/auth/MyPost'
import MeEdit from '../../components/auth/MeEdit'
import { Box, Text, Image, Stack, HStack, Center, Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

const Me: React.FC = () => {
  const { data } = useSession()

  return (
    <Layout>
      {data ? (
        <>
          {/* desktop */}
          <Media greaterThanOrEqual="md">
            <Stack direction={['column', 'row']} m="2">
              {/* left */}
              <Box w="40vw" boxShadow="md">
                <Box
                  p="2"
                  border="2px solid gray"
                  w="40vw"
                  borderRadius="md"
                  overflow="clip"
                >
                  <Box
                    boxShadow="md"
                    py="4"
                    borderRadius="md"
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
                      {/* https://www.google.com/maps/search/berlin,+de/ */}
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
                        mt="2"
                        // border="2px solid gray"
                        // borderRadius="md"
                        // boxShadow="md"
                        p="4"
                      >
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
              <Box p="2" border="2px solid gray" w="60vw" borderRadius="md">
                <MyPost />
              </Box>
            </Stack>
          </Media>

          {/* mobile */}
          <Media lessThan="md">
            <Stack direction={['column', 'row']} m="2">
              {/* left */}
              <Box>
                <Box p="2" border="2px solid gray" h="200px" borderRadius="md">
                  <MeEdit />

                  <HStack h="100%" mx="2">
                    <Box mx="2">
                      <Image
                        borderRadius="full"
                        boxSize="64px"
                        alt={data.user.name}
                        src={data.user.image}
                      />
                    </Box>
                    <Box mx="2">
                      <Text fontSize="xl">{data.user.name}</Text>
                      <Text fontSize="lg">{data.user.email}</Text>
                      <Text fontSize="md">some description</Text>
                    </Box>
                  </HStack>
                </Box>
              </Box>
              {/* right */}
              <Box p="2" border="2px solid gray" borderRadius="md">
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
