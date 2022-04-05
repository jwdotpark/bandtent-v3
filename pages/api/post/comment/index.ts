import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '../../../../lib/prisma'

// POST /api/post/comment
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { comment, authorId, uid, id } = req.body
  const session = await getSession({ req })

  if (session && req.method === 'POST') {
    // FIXME case sensitive error?
    const result = await prisma.Comment.create({
      data: {
        userId: uid,
        content: comment,
        postId: id,
      },
    })
    res.status(200).json(result)
  } else if (req.method === 'PUT') {
    const result = await prisma.post.findUnique({
      where: { id: id },
      include: {
        comments: {
          include: {
            User: true,
          },
          orderBy: {
            id: 'desc',
          },
        },
      },
    })

    res.status(200).json(result)
  } else if (req.method === 'DELETE') {
    const result = await prisma.comment.delete({
      where: { id: id },
    })
    res.status(200).json(result)
  } else {
    res.status(500)
    res.json({ error: 'Unable to fetch comment' })
  }
}
