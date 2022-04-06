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
      console.log('feteched more post: ', morePost)
    }
  } catch (e) {
    res.status(500)
    res.json({ error: e.message })
    console.log(e)
  } finally {
    await prisma.$disconnect()
  }
}
