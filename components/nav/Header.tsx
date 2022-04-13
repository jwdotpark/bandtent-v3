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
  useColorMode,
} from '@chakra-ui/react'
// import { Media } from '../../utils/media'
// import Player from '../utils/Player'
import SearchButton from './SearchButton'
import {
  PlusSquareIcon,
  TimeIcon,
  LockIcon,
  UnlockIcon,
  HamburgerIcon,
} from '@chakra-ui/icons'
import { motion } from 'framer-motion'
import useSWR from 'swr'

const Header: React.FC = (props) => {
  const { colorMode, toggleColorMode } = useColorMode()

  const router = useRouter()

  // const isActive: (pathname: string) => boolean = (pathname) =>
  //   router.pathname === pathname

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
            transition={{ ease: 'circInOut', duration: 0.25 }}
          >
            <Link href="/" passHref>
              <Box className="bold">
                <Button
                  leftIcon={
                    <HamburgerIcon
                      color={colorMode === 'light' ? 'current' : '#50fa7b'}
                    />
                  }
                  size="sm"
                  boxShadow="md"
                >
                  <Text color={colorMode === 'light' ? 'current' : '#50fa7b'}>
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
              transition={{ ease: 'circInOut', duration: 0.25 }}
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
                      // @ts-ignore
                      src={session.user.image}
                      fallbackSrc="https://picsum.photos/200"
                      borderRadius="full"
                      // @ts-ignore
                      alt={session.user.name}
                    />
                  }
                >
                  <Text color={colorMode === 'light' ? 'current' : '#8be9fd'}>
                    {session.user.name ? session.user.name : session.user.email}
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
            transition={{ ease: 'circInOut', duration: 0.25 }}
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
                transition={{ ease: 'circInOut', duration: 0.25 }}
                // whileTap={{ scale: 0.95 }}
              >
                <Link href="/create" passHref>
                  <Button
                    boxShadow="md"
                    size="sm"
                    leftIcon={
                      <PlusSquareIcon
                        color={colorMode === 'light' ? 'current' : '#bd93f9'}
                      />
                    }
                  >
                    <Text color={colorMode === 'light' ? 'current' : '#bd93f9'}>
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
                  transition={{ ease: 'circInOut', duration: 0.25 }}
                  // whileTap={{ scale: 0.95 }}
                >
                  <Button
                    boxShadow="md"
                    size="sm"
                    leftIcon={
                      <TimeIcon
                        color={colorMode === 'light' ? 'current' : '#ffc587'}
                      />
                    }
                  >
                    <Link href="/drafts" passHref>
                      <Text
                        color={colorMode === 'light' ? 'current' : '#ffc587'}
                      >
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
                transition={{ ease: 'circInOut', duration: 0.25 }}
                // whileTap={{ scale: 0.95 }}
              >
                <Button
                  boxShadow="md"
                  leftIcon={
                    <LockIcon
                      color={colorMode === 'light' ? 'current' : '#ff5555'}
                    />
                  }
                  size="sm"
                  onClick={() => {
                    signOut()
                    router.push('/')
                  }}
                >
                  <Text color={colorMode === 'light' ? 'current' : '#ff5555'}>
                    Log out
                  </Text>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                transition={{ ease: 'circInOut', duration: 0.25 }}
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
    </nav>
  )
}

export default React.memo(Header)
