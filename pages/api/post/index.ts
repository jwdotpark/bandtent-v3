import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { fileURLToPath } from 'url'
import prisma from '../../../lib/prisma'

// POST /api/post
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, content, imageUrl, fileUrl } = req.body
  const session = await getSession({ req })
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      imageUrl: imageUrl,
      fileUrl: fileUrl,
      author: { connect: { email: session?.user?.email } },
    },
  })
  res.json(result)
}
