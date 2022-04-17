import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'

// POST /api/post/comment/get
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await prisma.comment.findMany({
    orderBy: {
      id: 'desc',
    },
    take: 10,
    include: {
      User: true,
      Post: {
        select: {
          title: true,
          content: true,
        },
      },
    },
  })

  res.status(200).json(result)
}
