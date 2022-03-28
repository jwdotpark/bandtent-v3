import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '../../../lib/prisma'
import { withSentry } from '@sentry/nextjs'

// POST /api/post
export async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { title, content, imageUrl, fileUrl } = req.body

  const session = await getSession({ req })
  if (session) {
    const result = await prisma.post.create({
      data: {
        title: title,
        content: content,
        imageUrl: imageUrl,
        fileUrl: fileUrl,
        author: { connect: { email: session?.user?.email } },
      },
    })
    res.status(200)
    res.json(result)
  } else {
    res.status(500)
    res.json({ error: 'No Authorization' })
  }
}

export default withSentry(handle)
