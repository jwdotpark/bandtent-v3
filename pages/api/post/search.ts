import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const word = 'okgu | test'
  try {
    const result = await prisma.post.findMany({
      where: {
        title: {
          search: word,
        },
        content: {
          search: word,
        },
      },
    })
    res.status(200)
    res.json(result)
  } catch (e) {
    res.status(500)
    res.json({ error: 'Unable to search' })
  } finally {
    await prisma.$disconnect()
  }
}
