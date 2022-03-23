import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// GET /api/post/loadmore
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const morePost = await prisma.post.findMany({
        where: { published: true },
        include: {
          author: {
            select: { name: true, image: true },
          },
        },
        skip: 6,
        take: 6,
        orderBy: { id: 'desc' },
      })
      res.status(200)
      res.json(morePost)
    }
  } catch (e) {
    res.status(500)
    res.json({ error: 'Unable to fetch post' })
  } finally {
    await prisma.$disconnect()
  }
}
