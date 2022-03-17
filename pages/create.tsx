import React, { useState } from 'react'
import Layout from '../components/Layout'
import Router from 'next/router'
import { Box, Text, Input, Textarea, Button, Stack } from '@chakra-ui/react'
import ImageUpload from '../components/ImageUpload'

const Draft: React.FC = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { title, content }
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await Router.push('/drafts')
    } catch (error) {
      console.error(error)
    }
  }

  const [imageUrl, setImageUrl] = useState<string>('')
  const image = (data: string) => {
    setImageUrl(data)
  }

  console.log('url: ' + imageUrl)

  return (
    <Layout>
      <Box m="2">
        <form onSubmit={submitData}>
          <Text>New Draft</Text>
          <Box my="4">
            <Input
              variant="filled"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              type="text"
              value={title}
            />
          </Box>
          <Box my="4">
            <Textarea
              variant="filled"
              cols={50}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              rows={8}
              value={content}
            />
          </Box>
          <ImageUpload img={image} />
          <Box>
            <Button
              mr="2"
              disabled={!content || !title}
              type="submit"
              value="Create"
            >
              Create
            </Button>
            <Button
              mr="2"
              // className="back"
              // href="#"
              onClick={() => Router.push('/')}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Layout>
  )
}

export default Draft
