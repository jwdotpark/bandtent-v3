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
}

export default PostProps
