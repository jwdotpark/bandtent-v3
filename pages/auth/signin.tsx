import { getProviders, signIn, getCsrfToken, useSession } from 'next-auth/react'
// import styles from '../../styles/Auth.module.scss'
import { InferGetServerSidePropsType } from 'next'
// import { FaGithub, FaTwitter, FaGoogle } from 'react-icons/fa'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { CtxOrReq } from 'next-auth/client/_utils'
import { Button } from '@chakra-ui/react'

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
      <section>
        <h1>SignIn to Continue</h1>

        <div>
          {/* <form method="post" action="/api/auth/signin/email">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <input type="email" id="email" name="email" placeholder="Email" />
            <button type="submit">Sign in with Email</button>
          </form>
          <h1>OR</h1> */}

          <div>
            {providers
              ? Object.values(providers).map((provider, i) => {
                  if (provider.id !== 'email') {
                    return (
                      <div key={provider.name}>
                        <div>
                          <Button onClick={() => signIn(provider.id)}>
                            Github
                          </Button>
                        </div>
                      </div>
                    )
                  }
                })
              : ''}

            {/* <div>
              <span>twitter</span>
            </div>
            <div>
              <span>google</span>
            </div> */}
          </div>
        </div>
      </section>
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
