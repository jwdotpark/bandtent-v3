import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '../../../../lib/prisma'

// POST /api/post/comment/get-all
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await prisma.comment.findMany({
    orderBy: {
      id: 'desc',
    },
    take: 10,
    include: {
      User: true,
    },
  })

  res.status(200).json(result)
}
