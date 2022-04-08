/* eslint-disable no-unused-vars */
import React from 'react'
import Head from 'next/head'
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
// import Player from '../utils/Player'
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
import { motion } from 'framer-motion'
import useSWR from 'swr'

const Header: React.FC = (props) => {
  const { colorMode, toggleColorMode } = useColorMode()

  const router = useRouter()

  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname

  const { data: session, status } = useSession()

  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data: unPubNum, error } = useSWR('/api/profile/unpub', fetcher, {
    // NOTE interval 1hr for now
    refreshInterval: 1000 * 60,
  })

  return (
    <nav>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Bandtent</title>
      </Head>
      {/* desktop */}
      <Media greaterThanOrEqual="md">
        <Flex
          as="header"
          position="fixed"
          ml="2"
          w="calc(100% - 1rem)"
          zIndex="tooltip"
          borderRadius="xl"
          bg={colorMode === 'light' ? '#cbd5e0' : '#383a59'}
          // border={colorMode === 'light' ? null : '2px solid #8969b4'}
          sx={{
            boxShadow:
              'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
            // boxShadow: clay.boxShadow,
          }}
        >
          {/* left */}
          <Stack direction="row" p="2">
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              transition={{ ease: 'easeInOut', duration: 0.25 }}
            >
              <Link href="/" passHref>
                <Box className="bold" data-active={isActive('/')}>
                  <Button
                    leftIcon={
                      <HamburgerIcon
                        color={colorMode === 'light' ? null : '#50fa7b'}
                      />
                    }
                    size="sm"
                    boxShadow="md"
                  >
                    <Text color={colorMode === 'light' ? null : '#50fa7b'}>
                      Feed
                    </Text>
                  </Button>
                </Box>
              </Link>
            </motion.div>
            {session && (
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                transition={{ ease: 'easeInOut', duration: 0.25 }}
              >
                <Link href={'/auth/' + session.user.id} passHref>
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
                    <Text color={colorMode === 'light' ? null : '#8be9fd'}>
                      {session.user.name
                        ? session.user.name
                        : session.user.email}
                    </Text>
                  </Button>
                </Link>
              </motion.div>
            )}
            {/* search */}
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              transition={{ ease: 'easeInOut', duration: 0.25 }}
              whileFocus={{ scale: 1.05 }}
            >
              <SearchButton />
            </motion.div>
            {/* <Player /> */}
          </Stack>
          <Spacer />
          {/* right */}
          {/* no login */}
          {!session && (
            <>
              <Stack direction="row" p="2">
                <Link href="/api/auth/signin" passHref>
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
                <motion.div
                  whileHover={{
                    scale: 1.05,
                  }}
                  transition={{ ease: 'easeInOut', duration: 0.25 }}
                  // whileTap={{ scale: 0.95 }}
                >
                  <Link href="/create" passHref>
                    <Button
                      boxShadow="md"
                      size="sm"
                      leftIcon={
                        <PlusSquareIcon
                          color={colorMode === 'light' ? null : '#bd93f9'}
                        />
                      }
                    >
                      <Text color={colorMode === 'light' ? null : '#bd93f9'}>
                        Add
                      </Text>
                    </Button>
                  </Link>
                </motion.div>
                {unPubNum !== 0 && (
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                    }}
                    transition={{ ease: 'easeInOut', duration: 0.25 }}
                    // whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      boxShadow="md"
                      size="sm"
                      leftIcon={
                        <TimeIcon
                          color={colorMode === 'light' ? null : '#ffc587'}
                        />
                      }
                    >
                      <Link href="/drafts" passHref>
                        <Text color={colorMode === 'light' ? null : '#ffc587'}>
                          {unPubNum > 0 ? unPubNum + ' available' : null}
                        </Text>
                      </Link>
                    </Button>
                  </motion.div>
                )}
                <motion.div
                  whileHover={{
                    scale: 1.05,
                  }}
                  transition={{ ease: 'easeInOut', duration: 0.25 }}
                  // whileTap={{ scale: 0.95 }}
                >
                  <Button
                    boxShadow="md"
                    leftIcon={
                      <LockIcon
                        color={colorMode === 'light' ? null : '#ff5555'}
                      />
                    }
                    size="sm"
                    onClick={() => {
                      signOut()
                      router.push('/')
                    }}
                  >
                    <Text color={colorMode === 'light' ? null : '#ff5555'}>
                      Log out
                    </Text>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                  }}
                  transition={{ ease: 'easeInOut', duration: 0.25 }}
                  // whileTap={{ scale: 0.95 }}
                >
                  <Box boxShadow="md">
                    <ColorButton />
                  </Box>
                </motion.div>
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
            <Link href="/" passHref>
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
                <Link href="/api/auth/signin" passHref>
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
                    <Link href={'/auth/' + session.user.id} passHref>
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
                    <Link href="/create" passHref>
                      <MenuItem
                        icon={
                          <AddIcon
                            color={colorMode === 'light' ? null : '#6272a4'}
                          />
                        }
                      >
                        <Text color={colorMode === 'light' ? null : '#6272a4'}>
                          Add
                        </Text>
                      </MenuItem>
                    </Link>
                    <Link href="/drafts" passHref>
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

export default React.memo(Header)
