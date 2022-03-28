import prisma from '../../../lib/prisma'
import { withSentry } from '@sentry/nextjs'

// DELETE /api/post/:id
export async function handle(req, res) {
  const postId = req.query.id
  if (req.method === 'DELETE') {
    const post = await prisma.post.delete({
      where: { id: Number(postId) },
    })
    res.json(post)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

export default withSentry(handle)
