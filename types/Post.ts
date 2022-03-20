type PostProps = {
  id: number
  title: string
  author: {
    name: string
    email: string
    description: string
    location: string
    website: string
  } | null
  content: string
  published: boolean
  createdAt: Date
  imageUrl: string
  fileUrl: string
}

export default PostProps
