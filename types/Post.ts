// FIXME
// nested type declarations is fucked up

import { NumberResults } from 'aws-sdk/clients/clouddirectory'

type PostProps = {
  id: number
  title: string
  author: {
    uid: number
    name: string
    email: string
    description: string
    location: string
    website: string
    image: string
  } | null
  content: string
  published: boolean
  createdAt: Date
  imageUrl: string
  fileUrl: string
  authorId: number
  post: {
    id: number
    title: string
    author: {
      uid: number
      name: string
      email: string
      description: string
      location: string
      website: string
      image: string
    } | null
    content: string
    published: boolean
    createdAt: Date
    imageUrl: string
    fileUrl: string
    authorId: number
  }
  comments: {
    content: string
    createdAt: Date
    id: number
    postId: number
    userId: number
    length: number
  }
}

type CommentProps = {
  id: number
  comment: string
  createdAt: Date
}
export default PostProps
