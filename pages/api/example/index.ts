import { NextApiRequest, NextApiResponse } from 'next'
// import { getSession } from 'next-auth/react'
// import prisma from '../../../lib/prisma'

// POST /api/post
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = {
    ADA: {
      name: 'Ada',
      website: 'https://www.ada.org/',
    },
    DOT: {
      name: 'Dot',
      website: 'https://www.dot.gov/',
    },
  }
  res.status(200)
  res.json(result)
}
