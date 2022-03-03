import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'
import ColorButton from '../components/misc/ColorButton'
import { Stack, Flex, Spacer, Box, Text, Button } from '@chakra-ui/react'

const Header: React.FC = () => {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname

  const { data: session, status } = useSession()

  let left = (
    <Box>
      <Link href="/">
        <Box className="bold" data-active={isActive('/')}>
          <Button fontSize="2xl">Feed</Button>
        </Box>
      </Link>
    </Box>
  )

  let right = null

  if (status === 'loading') {
    right = (
      <Box mr="auto">
        <Text>Validating session ...</Text>
      </Box>
    )
  }

  if (!session) {
    right = (
      <Box>
        <Link href="/api/auth/signin">
          <Button left="0" data-active={isActive('/signup')}>
            Log in
          </Button>
        </Link>
      </Box>
    )
  }

  if (session) {
    left = (
      <div className="left">
        <Link href="/">
          <a className="bold" data-active={isActive('/')}>
            Feed
          </a>
        </Link>
        <Link href="/drafts">
          <a data-active={isActive('/drafts')}>My drafts</a>
        </Link>
      </div>
    )
    right = (
      <div className="right">
        <p>
          {session.user.name} ({session.user.email})
        </p>
        <Link href="/create">
          <button>
            <a>New post</a>
          </button>
        </Link>
        <button onClick={() => signOut()}>
          <a>Log out</a>
        </button>
      </div>
    )
  }

  return (
    <nav>
      {/* <Box
        display="flex"
        p="2rem"
        alignItems="center"
        border="3px solid yellow"
      >
        {left}
        {right}
      </Box> */}

      <Flex>
        {/* left */}
        <Box p="2">
          <Link href="/">
            <Box className="bold" data-active={isActive('/')}>
              <Button size="sm">Feed</Button>
            </Box>
          </Link>
        </Box>
        <Spacer />
        {/* right */}
        {/* no login */}
        {!session && (
          <>
            <Box p="2">
              <Link href="/api/auth/signin">
                <Button size="sm" data-active={isActive('/signup')}>
                  {status === 'loading' ? 'Validating Session..' : 'Log In'}
                </Button>
              </Link>
            </Box>
          </>
        )}
        {/* yes login */}
        {session && (
          <>
            <Stack direction="row" p="2">
              <Button size="sm">
                {session.user.name} {/*({session.user.email}) */}
              </Button>
              <Link href="/create">
                <Button size="sm">
                  <Text>Add</Text>
                </Button>
              </Link>
              <Button size="sm" onClick={() => signOut()}>
                <Text>Log out</Text>
              </Button>
              <ColorButton />
            </Stack>
          </>
        )}
      </Flex>
    </nav>
  )
}

export default Header
