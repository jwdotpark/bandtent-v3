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
  useColorMode,
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
  SettingsIcon,
  SunIcon,
  MoonIcon,
} from '@chakra-ui/icons'
import { invertScale } from 'framer-motion/types/value/use-inverted-scale'

const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname

  const { data: session, status } = useSession()

  // console.log(session.user.id)
  return (
    <nav>
      {/* desktop */}
      <Media greaterThanOrEqual="md">
        <Flex
          as="header"
          position="fixed"
          ml="2"
          w="calc(100% - 1rem)"
          zIndex="tooltip"
          // border="2px solid gray"
          borderRadius="xl"
          bg={colorMode === 'light' ? '#cbd5e0' : '#2d3748'}
          // sx={{ backdropFilter: 'blur(10px) saturate(50%) ' }}
          // boxShadow="xl"
          sx={{
            boxShadow:
              'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
          }}
        >
          {/* left */}
          <Stack direction="row" p="2">
            <Link href="/">
              <Box className="bold" data-active={isActive('/')}>
                <Button leftIcon={<HamburgerIcon />} size="sm" boxShadow="md">
                  Feed
                </Button>
              </Box>
            </Link>
            {session && (
              <Link href={'/auth/' + session.user.id}>
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
            {/* search */}
            <SearchButton />
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
      {/* ------------------------------------------------------------------------------- */}
      {/* mobile */}
      <Media lessThan="md">
        <Flex mx="2">
          {/* left */}
          <Box pt="2" pr="1">
            <Link href="/">
              <Box className="bold" data-active={isActive('/')}>
                <Button leftIcon={<HamburgerIcon />} size="sm">
                  Feed
                </Button>
              </Box>
            </Link>
          </Box>
          {/* search */}
          <Box p="2">
            <SearchButton />
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
                    {/* <Text>{session.user.name}</Text> */}
                    <SettingsIcon />
                  </MenuButton>
                  <MenuList>
                    <Link href={'/auth/' + session.user.id}>
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
                        <Text ml="-2">{session.user.name}</Text>
                      </MenuItem>
                    </Link>
                    <Link href="/create">
                      <MenuItem icon={<AddIcon />}>
                        <Text>Add</Text>
                      </MenuItem>
                    </Link>
                    <Link href="/drafts">
                      <MenuItem icon={<PlusSquareIcon />}>My Drafts</MenuItem>
                    </Link>
                    <MenuItem
                      icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
                      onClick={toggleColorMode}
                    >
                      <Text>
                        {colorMode === 'light' ? 'Go Light' : 'Go Dark'}
                      </Text>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        signOut()
                        router.push('/')
                      }}
                      icon={<LockIcon />}
                    >
                      <Text>Log out</Text>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </>
          )}
        </Flex>
      </Media>
    </nav>
  )
}

export default Header
