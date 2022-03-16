import { getSession } from 'next-auth/react'
import prisma from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

// GET /api/post/mypost/:uid
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  // @ts-ignore id type not exist on next-auth session
  const uid: number = session.user.id

  try {
    const result = await prisma.user.findUnique({
      where: {
        id: Number(uid),
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
    console.log('Error')
  } finally {
    await prisma.$disconnect()
  }
}
