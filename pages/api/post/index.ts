import { getSession } from 'next-auth/react'
import prisma from '../../../lib/prisma'

// POST /api/post
export default async function handle(req, res) {
  const { title, content, imageUrl } = req.body
  const session = await getSession({ req })
  // console.log(title, content, imageUrl)
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      imageUrl: imageUrl,
      author: { connect: { email: session?.user?.email } },
    },
  })
  res.json(result)
}
