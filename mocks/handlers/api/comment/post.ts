import { rest } from 'msw'

type CommentBody = {
  id: number
  uid: number
  comment: string
  authorId: number
}

export const commentHandlers = [
  rest.post<CommentBody>('/api/post/comment', (req, res, ctx) => {
    if (req.body.comment.includes('error')) {
      return res(
        ctx.status(500),
        ctx.json({
          error: 'Unable to create post',
        })
      )
    }

    if (req.body.comment.length < 8) {
      return res(
        ctx.status(400),
        ctx.json({
          error: 'Too short message',
        })
      )
    }

    return res(ctx.status(200))
  }),
]
