import Layout from '../../components/Layout'
import { useSession } from 'next-auth/react'
import { Media } from '../../utils/media'
import MyPost from '../../components/MyPost'
import { Box, Text, Image, Stack, HStack } from '@chakra-ui/react'

const Me: React.FC = () => {
  const { data } = useSession()

  return (
    <Layout>
      <Text ml="4" my="2" fontSize="3xl">
        ME
      </Text>
      {data ? (
        <>
          {/* desktop */}
          <Media greaterThanOrEqual="md">
            <Stack direction={['column', 'row']} m="2">
              {/* left */}
              <Box w="40vw">
                <Box
                  p="2"
                  border="1px solid gray"
                  h="200px"
                  w="40vw"
                  borderRadius="md"
                >
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
              <Box p="2" border="1px solid gray" w="60vw" borderRadius="md">
                <MyPost />
              </Box>
            </Stack>
          </Media>

          {/* mobile */}
          <Media lessThan="md">
            <Stack direction={['column', 'row']} m="2">
              {/* left */}
              <Box>
                <Box p="2" border="1px solid gray" h="200px" borderRadius="md">
                  <HStack h="100%" mx="2">
                    <Box mx="2">
                      <Image
                        borderRadius="full"
                        boxSize="128px"
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
              <Box p="2" border="1px solid gray" borderRadius="md">
                <MyPost />
              </Box>
            </Stack>
          </Media>
        </>
      ) : (
        'Log In'
      )}
    </Layout>
  )
}

export default Me
