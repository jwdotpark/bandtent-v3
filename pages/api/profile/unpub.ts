import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { getSession } from 'next-auth/react'

// GET /api/profile/unpub
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  const uid = session?.user.id
  try {
    const unPub = await prisma.post.count({
      where: { authorId: uid, published: false },
    })
    res.status(200)
    res.json(unPub)
  } catch (e) {
    res.status(500)
    res.json({ error: e })
  } finally {
    await prisma.$disconnect()
  }
}
