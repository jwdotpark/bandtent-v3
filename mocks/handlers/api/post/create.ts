import { rest } from 'msw'

type PostBody = {
  title: string
  content: string
  imageUrl: string
  fileUrl: string
}

export const postHandlers = [
  rest.post<PostBody>('/api/post', (req, res, ctx) => {
    if (req.body.fileUrl.includes('something')) {
      return res(
        ctx.status(500),
        ctx.json({
          error: 'Unable to create post',
        })
      )
    }

    return res(ctx.status(200))
  }),
]
