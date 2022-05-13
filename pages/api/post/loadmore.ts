import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// POST /api/post/loadmore
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'PUT') {
      const cursor = req.body
      const morePost = await prisma.post.findMany({
        where: { published: true },
        include: {
          author: {
            select: { name: true, image: true, id: true },
          },
          comments: true,
        },
        skip: 1,
        cursor: {
          id: cursor,
        },
        take: 15,
        orderBy: { id: 'desc' },
      })
      res.status(200)
      res.json(morePost)
    }
  } catch (error) {
    res.status(500)
    res.json({ error: "Can't fetch more post" })
  } finally {
    await prisma.$disconnect()
  }
}
