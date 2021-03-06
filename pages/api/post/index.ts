import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '../../../lib/prisma'

// POST /api/post
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, artist, imageUrl, fileUrl } = req.body
  const session = await getSession({ req })
  if (session) {
    const result = await prisma.post.create({
      data: {
        title: title,
        content: artist,
        imageUrl: imageUrl,
        fileUrl: fileUrl,

        // @ts-ignore
        author: { connect: { email: session.user?.email } },
      },
    })
    res.status(200)
    res.json(result)
  } else {
    res.status(500)
    res.json({ error: 'Cannot post data' })
    res.end()
  }
}
