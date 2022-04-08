import prisma from '../../../../../lib/prisma'

// DELETE /api/post/comment/delete/:id
export default async function handle(req, res) {
  const commentId = req.query.id
  // console.log(commentId)
  if (req.method === 'DELETE') {
    const post = await prisma.comment.delete({
      where: { id: Number(commentId) },
    })
    res.json(post)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}
