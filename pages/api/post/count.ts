import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// GET /api/post/count
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const numOfPost = await prisma.post.count()
    res.status(200)
    res.json(numOfPost)
  } catch (e) {
    res.status(500)
    res.json({ error: e })
  } finally {
    await prisma.$disconnect()
  }
}
