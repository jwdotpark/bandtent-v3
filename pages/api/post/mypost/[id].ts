import { getSession } from 'next-auth/react'
import prisma from '../../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

// GET /api/post/mypost/:uid
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await prisma.user.findUnique({
      where: {
        id: Number(req.query.id),
      },
      include: {
        posts: true,
      },
    })
    res.status(200)
    res.json(result)
  } catch (e) {
    res.status(500)
    res.json({ error: 'Unable to fetch user' })
  } finally {
    await prisma.$disconnect()
  }
}
