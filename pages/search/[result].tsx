import Router from 'next/router'
import Layout from '../../components/Layout'
import { GetServerSideProps } from 'next'
import prisma from '../../lib/prisma'
import ImageComponent from '../../components/utils/ImageComponent'
import { Box, Text, Divider, Center, Image } from '@chakra-ui/react'
import moment from 'moment'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const result = await prisma.post.findMany({
    where: {
      title: {
        search: String(params.result),
      },
      content: {
        search: String(params.result),
      },
    },
    include: {
      author: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return {
    props: {
      result: JSON.parse(JSON.stringify(result)),
    },
  }
}

const SearchPage = (props: { result: any[] }) => {
  return (
    <Layout>
      <Box
        border="2px solid gray"
        borderRadius="md"
        p="2"
        m="2"
        mt="2"
        boxShadow="md"
      >
        <Text>
          {props.result.length !== 0
            ? props.result.length + ' results'
            : 'None!'}
        </Text>
      </Box>
      <Box
        p="2"
        w="100%"
        mx="auto"
        sx={{ columnCount: [1, 2, 3], columnGap: '8px' }}
      >
        {props.result.length !== 0 &&
          props.result.map((post) => (
            <Box
              boxShadow="md"
              mb="4"
              w="100%"
              // h="`${randomInt(50, 90)}`%"
              display="inline-block"
              onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}
            >
              <Box
                key={post.id}
                border="2px solid gray"
                borderRadius="md"
                p="2"
              >
                <Text fontSize="xl" noOfLines={3}>
                  {post.title}
                </Text>
                <Divider mb="2" />
                {post.imageUrl && <ImageComponent props={post} />}
                <Text noOfLines={3}>{post.content}</Text>
                {/* info */}
                <Box
                  mt="4"
                  p="1"
                  boxShadow="md"
                  border="2px solid gray"
                  borderRadius="md"
                >
                  <Text fontSize="sm" sx={{ transform: 'translateX(-8px)' }}>
                    <Center justifyContent="left" mx="2">
                      <Image
                        mr="2"
                        display="inline"
                        border="2px inset  gray"
                        src={post.author.image}
                        fallbackSrc="https://picsum.photos/200"
                        boxSize="1.5rem"
                        borderRadius="full"
                        // alt={post.author.name}
                      />
                      <b>{post.author.name}</b>,{' '}
                      {moment(post.createdAt).fromNow()}
                    </Center>
                  </Text>
                </Box>
              </Box>
            </Box>
          ))}
      </Box>
    </Layout>
  )
}

export default SearchPage
