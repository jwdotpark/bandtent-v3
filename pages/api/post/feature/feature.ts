import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'

// POST /api/post/feature/feature
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await prisma.post.findMany({
    take: 3,
    orderBy: {
      comments: {
        _count: 'desc',
      },
    },
    include: {
      comments: true,
    },
  })

  res.status(200).json(result)
}
