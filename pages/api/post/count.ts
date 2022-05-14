import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// GET /api/post/count
export default async function handle(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const numOfPost = await prisma.post.count()
    res.status(200).json(numOfPost)
  } catch (e) {
    res.status(500).json({ error: e })
  } finally {
    await prisma.$disconnect()
  }
}
