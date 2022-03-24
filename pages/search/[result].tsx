import { Media } from '../../utils/media'
import Router from 'next/router'
import Layout from '../../components/Layout'
import { GetServerSideProps } from 'next'
import prisma from '../../lib/prisma'
import ImageComponent from '../../components/utils/ImageComponent'
import { Box, Button, Text, HStack, Divider, Stack } from '@chakra-ui/react'

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
  })
  return {
    props: {
      result: JSON.parse(JSON.stringify(result)),
    },
  }
}

const SearchPage = (props: { result: any[] }) => {
  console.log(props.result)
  return (
    <Layout>
      <Box border="2px solid gray" borderRadius="md" p="2" m="2" mt="2">
        <Text>{props.result.length} result</Text>
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
              </Box>
            </Box>
          ))}
      </Box>
    </Layout>
  )
}

export default SearchPage
