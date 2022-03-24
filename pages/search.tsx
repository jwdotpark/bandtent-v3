import { Media } from '../utils/media'
import Router from 'next/router'
import Layout from '../components/Layout'
import { GetServerSideProps } from 'next'
import prisma from '../lib/prisma'

export const getServerSideProps: GetServerSideProps = async () => {
  const word = 'okgu | test'
  const result = await prisma.post.findMany({
    where: {
      title: {
        search: word,
      },
      content: {
        search: word,
      },
    },
  })
  return {
    props: {
      feed: JSON.parse(JSON.stringify(result)),
    },
  }
}
const SearchPage = (result) => {
  console.log(result)
  return <Layout>{result && JSON.stringify(result)}</Layout>
}

export default SearchPage
