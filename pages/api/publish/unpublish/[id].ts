import prisma from '../../../../lib/prisma'
import { getSession } from 'next-auth/react'
import { NextApiRequest, NextApiResponse } from 'next'

// PUT /api/publish/unpub
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postId = req.query.id
  const session = await getSession({ req })
  if (session) {
    const post = await prisma.post.update({
      where: { id: Number(postId) },
      data: { published: false },
    })
    res.json(post)
  }
}
