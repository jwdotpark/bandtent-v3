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
import { motion } from 'framer-motion'

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
              'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
          }}
        >
          {/* left */}
          <Stack direction="row" p="2">
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              transition={{ ease: 'easeInOut', duration: 0.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/">
                <Box className="bold" data-active={isActive('/')}>
                  <Button leftIcon={<HamburgerIcon />} size="sm" boxShadow="md">
                    Feed
                  </Button>
                </Box>
              </Link>
            </motion.div>
            {session && (
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                transition={{ ease: 'easeInOut', duration: 0.1 }}
                whileTap={{ scale: 0.95 }}
              >
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
              </motion.div>
            )}
            {/* search */}
            <motion.div
              whileHover={{
                scale: 1.1,
              }}
              transition={{ ease: 'easeInOut', duration: 0.1 }}
              whileFocus={{ scale: 1.1 }}
            >
              <SearchButton />
            </motion.div>
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
                <motion.div
                  whileHover={{
                    scale: 1.05,
                  }}
                  transition={{ ease: 'easeInOut', duration: 0.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/create">
                    <Button
                      boxShadow="md"
                      size="sm"
                      leftIcon={<PlusSquareIcon />}
                    >
                      <Text>Add</Text>
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                  }}
                  transition={{ ease: 'easeInOut', duration: 0.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button boxShadow="md" size="sm" leftIcon={<TimeIcon />}>
                    <Link href="/drafts">My Drafts</Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                  }}
                  transition={{ ease: 'easeInOut', duration: 0.1 }}
                  whileTap={{ scale: 0.95 }}
                >
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
                </motion.div>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                  }}
                  transition={{ ease: 'easeInOut', duration: 0.1 }}
                  whileTap={{ scale: 0.95 }}
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
