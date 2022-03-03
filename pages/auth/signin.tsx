import { getProviders, signIn, getCsrfToken, useSession } from 'next-auth/react'
// import styles from '../../styles/Auth.module.scss'
import { InferGetServerSidePropsType } from 'next'
// import { FaGithub, FaTwitter, FaGoogle } from 'react-icons/fa'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { CtxOrReq } from 'next-auth/client/_utils'
import { Box, Center, Button, Stack } from '@chakra-ui/react'

const SignIn = ({
  providers,
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession()
  const router = useRouter()
  console.log(providers)

  useEffect(() => {
    if (session) {
      router.push('/')
    }
  }, [session])
  return (
    <>
      <Center border="1px solid red" h="100vh">
        <Box>Sign In With</Box>
        <Stack>
          {providers
            ? Object.values(providers).map((provider, i) => {
                if (provider.id !== 'email') {
                  return (
                    <Box key={provider.name}>
                      <Box>
                        <Button onClick={() => signIn(provider.id)}>
                          {provider.name}
                        </Button>
                      </Box>
                    </Box>
                  )
                }
              })
            : ''}
        </Stack>
      </Center>
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
