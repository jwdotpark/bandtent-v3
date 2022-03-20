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
import {
  ChevronDownIcon,
  AddIcon,
  PlusSquareIcon,
  EditIcon,
  ChatIcon,
  WarningIcon,
} from '@chakra-ui/icons'

const Header: React.FC = () => {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname

  const { data: session, status } = useSession()

  return (
    <nav>
      {/* desktop */}
      <Media greaterThanOrEqual="md">
        <Flex borderBottom="1px solid gray" mx="2">
          {/* left */}
          <Stack direction="row" p="2">
            <Link href="/">
              <Box className="bold" data-active={isActive('/')}>
                <Button size="sm">Feed</Button>
              </Box>
            </Link>
            {session && (
              <Link href="/auth/me">
                <Button size="sm">
                  {session.user.name ? session.user.name : session.user.email}
                </Button>
              </Link>
            )}
          </Stack>
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
                {/* <Link href="/auth/me">
                  <Button size="sm">
                    {session.user.name ? session.user.name : session.user.email}
                  </Button>
                </Link> */}

                {/* <Button size="sm" data-active={isActive('/drafts')}> */}

                <Link href="/create">
                  <Button size="sm">
                    <Text>Add</Text>
                  </Button>
                </Link>
                <Button size="sm">
                  <Link href="/drafts">My Drafts</Link>
                </Button>
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
                <Menu matchWidth={true}>
                  <MenuButton
                    as={Button}
                    size="sm"
                    rightIcon={<ChevronDownIcon />}
                  >
                    <Text>{session.user.name}</Text>
                  </MenuButton>
                  <MenuList>
                    <Link href="/auth/me">
                      <MenuItem
                        icon={
                          <Image
                            sx={{ transform: 'translateX(-3px)' }}
                            border="1px solid gray"
                            src={session.user.image}
                            boxSize="20px"
                            borderRadius="md"
                            alt={session.user.name}
                          />
                        }
                      >
                        <Text>Profile</Text>
                      </MenuItem>
                    </Link>
                    <Link href="/create">
                      <MenuItem icon={<AddIcon mr="2" />}>
                        <Text>Add</Text>
                      </MenuItem>
                    </Link>
                    <Link href="/drafts">
                      <MenuItem icon={<PlusSquareIcon mr="2" />}>
                        My Drafts
                      </MenuItem>
                    </Link>
                    <MenuItem
                      onClick={() => {
                        signOut()
                        router.push('/')
                      }}
                      icon={<WarningIcon mr="2" />}
                    >
                      <Text>Log out</Text>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>

              <Stack direction="row" p="2">
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
