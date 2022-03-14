import { getSession } from 'next-auth/react'
import prisma from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req, res) {
  // const { title, content } = req.body
  // const session = await getSession({ req })
  try {
    const result = await prisma.user.findUnique({
      where: {
        id: 1,
      },
      include: {
        posts: true,
      },
      // orderBy: { id: 'asc' },
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
