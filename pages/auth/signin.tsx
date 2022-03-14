import { getProviders, signIn, getCsrfToken, useSession } from 'next-auth/react'
// import styles from '../../styles/Auth.module.scss'
import { InferGetServerSidePropsType } from 'next'
// import { FaGithub, FaTwitter, FaGoogle } from 'react-icons/fa'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { CtxOrReq } from 'next-auth/client/_utils'
import { Box, Button, VStack, Text } from '@chakra-ui/react'

const SignIn = ({
  providers,
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession()
  const router = useRouter()
  // console.log(providers)

  useEffect(() => {
    if (session) {
      router.push('/')
    }
  }, [session])
  return (
    <>
      <Layout>
        <VStack h="calc(100vh - 50px)">
          <Box mt="40vh">Sign In With..</Box>
          <Box>
            <VStack spacing={2}>
              {providers
                ? Object.values(providers).map((provider, i) => {
                    if (provider.id !== 'email') {
                      return (
                        <Box key={provider.name}>
                          <Box>
                            <Button
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
                : ''}
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
