import Layout from '../../components/Layout'
import { useSession } from 'next-auth/react'

import { Box, Text, Image, Stack } from '@chakra-ui/react'

const Me: React.FC = () => {
  const { data } = useSession()

  return (
    <Layout>
      {data ? (
        <>
          <Text ml="2" my="2" fontSize="3xl">
            ME
          </Text>
          <Stack direction={['column', 'row']} m="2">
            {/* left */}
            <Box>
              <Box p="2" border="1px solid gray" w="40vw" borderRadius="md">
                <Text ml="2" my="2" fontSize="3xl">
                  {data.user.name}
                </Text>
                <Text>{data.user.email}</Text>
                <Box boxSize="sm">
                  <Image
                    borderRadius="full"
                    boxSize="150px"
                    alt={data.user.name}
                    src={data.user.image}
                  />
                </Box>
              </Box>
            </Box>
            {/* right */}
            <Box p="2" border="1px solid gray" w="60vw" borderRadius="md">
              my post
            </Box>
          </Stack>
        </>
      ) : (
        'Log In'
      )}
    </Layout>
  )
}

export default Me
