import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// GET /apo/serverside/get-post
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const feed = await prisma.post.findMany({
      where: { published: true },
      include: {
        author: {
          select: { name: true, image: true, id: true },
        },
        comments: true,
      },
      take: 7,
      orderBy: { id: 'desc' },
    })
    res.status(200)
    res.json(feed)
    console.log('feed: ', feed)
  } catch (error) {
    res.status(500)
    res.json({ error: error })
  } finally {
    await prisma.$disconnect()
  }
}
