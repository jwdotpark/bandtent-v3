import { useEffect, useState } from 'react'
import { getProviders, signIn, getCsrfToken, useSession } from 'next-auth/react'
import { InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { CtxOrReq } from 'next-auth/client/_utils'
import {
  Box,
  Button,
  VStack,
  Text,
  Input,
  useDisclosure,
  Center,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react'

const SignIn = ({
  providers,
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/')
    }
  }, [router, session])

  const { onToggle } = useDisclosure()

  const [height, setHeight] = useState<number>()

  useEffect(() => {
    if (window) {
      setHeight(window.innerHeight)
    }
  }, [])

  return (
    <>
      <Layout>
        <VStack h="calc(100vh - 70px)" mt="2">
          {/* @ts-ignore */}
          <Box mt={height / 2.75}>Sign In With..</Box>
          <Box>
            <VStack spacing={2}>
              <Box>
                <Popover>
                  <PopoverTrigger>
                    <Center>
                      <Button size="lg" onClick={onToggle} w="150px">
                        <Text fontSize="3xl">Email</Text>
                      </Button>
                    </Center>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>
                      We will send you a magic link!
                    </PopoverHeader>
                    <PopoverBody>
                      <Box>
                        <form method="post" action="/api/auth/signin/email">
                          <Input
                            name="csrfToken"
                            type="hidden"
                            defaultValue={csrfToken}
                          />
                          <Box mb="2">
                            <Input
                              type="email"
                              id="email"
                              name="email"
                              placeholder="email@address.com"
                            />
                          </Box>
                          <Button width="100%" type="submit">
                            Send
                          </Button>
                        </form>
                      </Box>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Box>
              {/* social providers */}
              {providers
                ? Object.values(providers).map((provider, i) => {
                    if (provider.id !== 'email') {
                      return (
                        <Box key={i}>
                          <Box>
                            <Button
                              w="150px"
                              size="lg"
                              onClick={() => signIn(provider.id)}
                            >
                              <Text fontSize="3xl">{provider.name}</Text>
                            </Button>
                          </Box>
                        </Box>
                      )
                    }
                  })
                : 'No Providers deteced'}
            </VStack>
          </Box>
        </VStack>
      </Layout>
    </>
  )
}

export const getServerSideProps = async (context: CtxOrReq | undefined) => {
  const providers = await getProviders()
  const csrfToken = await getCsrfToken(context)
  return {
    props: { providers, csrfToken },
  }
}

export default SignIn
