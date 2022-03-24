import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'
import ColorButton from '../misc/ColorButton'
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
import { Media } from '../../utils/media'
import SearchButton from './SearchButton'
import {
  ChevronDownIcon,
  AddIcon,
  PlusSquareIcon,
  TimeIcon,
  LockIcon,
  UnlockIcon,
  HamburgerIcon,
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
                <Button leftIcon={<HamburgerIcon />} size="sm" boxShadow="md">
                  Feed
                </Button>
              </Box>
            </Link>
            {/* search */}
            <SearchButton />
            {session && (
              <Link href="/auth/me">
                <Button
                  boxShadow="md"
                  size="sm"
                  leftIcon={
                    <Image
                      boxSize="25px"
                      display="inline"
                      border="1px inset  gray"
                      src={session.user.image}
                      fallbackSrc="https://picsum.photos/200"
                      borderRadius="full"
                      alt={session.user.name}
                    />
                  }
                >
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
                  <Button size="sm" leftIcon={<UnlockIcon />}>
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
                <Link href="/create">
                  <Button
                    boxShadow="md"
                    size="sm"
                    leftIcon={<PlusSquareIcon />}
                  >
                    <Text>Add</Text>
                  </Button>
                </Link>
                <Button boxShadow="md" size="sm" leftIcon={<TimeIcon />}>
                  <Link href="/drafts">My Drafts</Link>
                </Button>
                <Button
                  boxShadow="md"
                  leftIcon={<LockIcon />}
                  size="sm"
                  onClick={() => {
                    signOut()
                    router.push('/')
                  }}
                >
                  <Text>Log out</Text>
                </Button>
                <Box boxShadow="md">
                  <ColorButton />
                </Box>
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
                <Button leftIcon={<HamburgerIcon />} size="sm">
                  Feed
                </Button>
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
                      icon={<LockIcon mr="2" />}
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
