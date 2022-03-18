import React from 'react'
import Link from 'next/link'
import { Router, useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'
import ColorButton from '../components/misc/ColorButton'
import {
  Stack,
  Flex,
  Spacer,
  Box,
  Text,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { Media } from '../utils/media'
import { ChevronDownIcon } from '@chakra-ui/icons'

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
        <Button left="0" data-active={isActive('/signup')}>
          <Link href="/api/auth/signin">Log in </Link>
        </Button>
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
        <button
          onClick={() => {
            signOut()
            router.push('/')
          }}
        >
          <a>Log out</a>
        </button>
      </div>
    )
  }

  return (
    <nav>
      {/* desktop */}
      <Media greaterThanOrEqual="md">
        <Flex borderBottom="1px solid gray" mx="2">
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
              <Stack direction="row" p="2">
                <Link href="/api/auth/signin">
                  <Button size="sm">
                    {status === 'loading' ? 'Validating Session..' : 'Log In'}
                  </Button>
                </Link>
                <ColorButton />
              </Stack>
            </>
          )}
          {/* yes login */}
          {session && (
            <>
              <Stack direction="row" p="2">
                <Link href="/auth/me">
                  <Button size="sm">
                    {session.user.name ? session.user.name : session.user.email}
                  </Button>
                </Link>

                {/* <Button size="sm" data-active={isActive('/drafts')}> */}
                <Button size="sm">
                  <Link href="/drafts">My Drafts</Link>
                </Button>

                <Link href="/create">
                  <Button size="sm">
                    <Text>Add</Text>
                  </Button>
                </Link>
                <Button
                  size="sm"
                  onClick={() => {
                    signOut()
                    router.push('/')
                  }}
                >
                  <Text>Log out</Text>
                </Button>
                <ColorButton />
              </Stack>
            </>
          )}
        </Flex>
      </Media>

      {/* mobile */}
      <Media lessThan="md">
        <Flex borderBottom="1px solid gray" mx="2">
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
              <Stack direction="row" p="2">
                <Link href="/api/auth/signin">
                  <Button size="sm">
                    {status === 'loading' ? 'Validating Session..' : 'Log In'}
                  </Button>
                </Link>
                <ColorButton />
              </Stack>
            </>
          )}
          {/* yes login */}
          {session && (
            <>
              <Box m="2" mx="auto">
                <Menu>
                  <MenuButton
                    as={Button}
                    size="sm"
                    rightIcon={<ChevronDownIcon />}
                  >
                    <Text>{session.user.name}</Text>
                  </MenuButton>
                  <MenuList>
                    <Link href="/auth/me">
                      <MenuItem>Me</MenuItem>
                    </Link>
                    <Link href="/drafts">
                      <MenuItem>My Drafts</MenuItem>
                    </Link>
                    <Link href="/create">
                      <MenuItem>
                        <Text>Add</Text>
                      </MenuItem>
                    </Link>
                  </MenuList>
                </Menu>
              </Box>

              <Stack direction="row" p="2">
                <Button
                  size="sm"
                  onClick={() => {
                    signOut()
                    router.push('/')
                  }}
                >
                  <Text>Log out</Text>
                </Button>
                <ColorButton />
              </Stack>
            </>
          )}
        </Flex>
      </Media>
    </nav>
  )
}

export default Header
