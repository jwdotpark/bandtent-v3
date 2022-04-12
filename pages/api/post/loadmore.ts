import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// POST /api/post/loadmore
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const morePost = await prisma.post.findMany({
        where: { published: true },
        include: {
          author: {
            select: { name: true, image: true },
          },
          comments: true,
        },
        cursor: {
          id: req.body - 1,
        },
        take: 10,
        orderBy: { id: 'desc' },
      })
      res.status(200)
      res.json(morePost)
    }
  } catch (error) {
    res.status(500)
    res.json({ error: error })
  } finally {
    await prisma.$disconnect()
  }
}
