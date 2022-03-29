import prisma from '../../../../lib/prisma'

// PUT /api/publish/unpub
export default async function handle(req, res) {
  const postId = req.query.id
  console.log('post id: ', postId)
  const post = await prisma.post.update({
    where: { id: Number(postId) },
    data: { published: false },
  })
  res.json(post)
}
